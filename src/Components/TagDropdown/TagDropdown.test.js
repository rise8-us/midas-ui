import {
    fireEvent, render, screen, useDispatchMock, useModuleMock, userEvent
} from 'Utilities/test-utils'
import { TagDropdown } from './index'

describe('<TagDropdown />', () => {
    jest.setTimeout(15000)

    const selectTagsByTypesMock = useModuleMock('Redux/Tags/selectors', 'selectTagsByTypes')

    const allTags = [
        { id: 1, label: 'Tag 1', description: '', color: '#000000' },
        { id: 2, label: 'Tag 2', description: '', color: '#000000' },
        { id: 13, label: 'scoped::label 1', description: '', color: '#000000' },
        { id: 14, label: 'scoped::label 2', description: '', color: '#000000' }
    ]

    const tagsError = ['Tag error']
    const onTagsChange = jest.fn()

    beforeEach(() => {
        useDispatchMock().mockReturnValue({})
        selectTagsByTypesMock.mockReturnValue(allTags)
    })

    test('should handle tag changes', async() => {
        render(<TagDropdown
            defaultTags = {[allTags[0]]}
            forcePopupIcon = {true}
            onChange = {onTagsChange}
        />)

        fireEvent.click(screen.getByTitle('Open'))
        fireEvent.click(screen.getByText('Tag 2'))

        expect(screen.getByText('Tag 1')).toBeInTheDocument()
    })

    test('should allow only one scoped tag', async() => {
        render(<TagDropdown
            defaultTags = {[allTags[0], allTags[2]]}
            forcePopupIcon = {true}
            onChange = {onTagsChange}
        />)

        expect(await screen.findByText('scoped | label 1')).toBeInTheDocument()
        fireEvent.click(screen.getByTitle('Open'))

        const option = screen.getByText('scoped::label 2')
        expect(option).toBeInTheDocument()
        fireEvent.click(option)

        expect(await screen.findByText('scoped | label 2')).toBeInTheDocument()
        expect(screen.queryByText('scoped | label 1')).not.toBeInTheDocument()
    })

    test('should delete tag', async() => {
        render(<TagDropdown
            defaultTags = {[allTags[0], allTags[2]]}
            deletable
            error = {[]}
            onChange = {onTagsChange} />
        )

        fireEvent.click(screen.getByTitle('Remove Tag 1'))

        expect(screen.queryByText('Tag 1')).not.toBeInTheDocument()
    })

    test('should not delete tag', () => {
        render(<TagDropdown
            defaultTags = {[allTags[0], allTags[2]]}
            error = {[]}
            onChange = {onTagsChange}
        />)

        expect(screen.queryByText('delete')).not.toBeInTheDocument()
    })

    test('should handle remove all tags', () => {
        render(<TagDropdown defaultTags = {[allTags[0], allTags[2]]} error = {[]} onChange = {onTagsChange} />)

        fireEvent.click(screen.getByTitle('Clear'))

        expect(screen.queryByText('Tag 1')).not.toBeInTheDocument()
        expect(screen.queryByText('label 1')).not.toBeInTheDocument()
    })

    test('should display error message', () => {
        render(<TagDropdown defaultTags = {[allTags[0], allTags[2]]} error = {tagsError} onChange = {onTagsChange} />)

        expect(screen.getByText('Tag error')).toBeInTheDocument()
    })

    test('should call createTag action on creatable', async() => {
        useDispatchMock().mockResolvedValue({ payload: {
            label: 'Tag 142',
            color: '#c2c2c2',
        } })
        render(<TagDropdown defaultTags = {[allTags[0]]} creatable />)

        userEvent.type(screen.getByRole('textbox'), 'Tag 1')
        expect(screen.getAllByText('Tag 1')).toHaveLength(2)

        userEvent.type(screen.getByRole('textbox'), '42')
        expect(screen.getByText('Add "Tag 142"')).toBeInTheDocument()

        fireEvent.click(screen.getByText('Add "Tag 142"'))
        expect(await screen.findByText('Tag 142')).toBeInTheDocument()
    })

    test('should handle scoped tag creation', async() => {
        useDispatchMock().mockResolvedValue({ payload: {
            label: 'scoped::label 3',
            color: '#123456',
        } })
        render(<TagDropdown defaultTags = {[allTags[2]]} creatable />)
        expect(screen.getByText('scoped | label 1')).toBeInTheDocument()

        userEvent.type(screen.getByRole('textbox'), 'scoped::label 3')
        fireEvent.click(screen.getByText('Add "scoped::label 3"'))

        expect(await screen.findByText('scoped | label 3')).toBeInTheDocument()
        expect(screen.queryByText('scoped | label 1')).not.toBeInTheDocument()
    })

})