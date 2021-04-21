import React from 'react'
import {
    fireEvent, render, screen, useDispatchMock, useModuleMock
} from '../../Utilities/test-utils'
import { TagDropdown } from './index'

describe('<TagDropdown />', () => {

    const selectAllTagsMock = useModuleMock('Redux/Tags/selectors', 'selectAllTags')

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
        selectAllTagsMock.mockReturnValue(allTags)
    })

    test('should handle tag changes', async() => {
        render(<TagDropdown defaultTags = {[allTags[0]]} error = {[]} onChange = {onTagsChange} />)

        fireEvent.click(await screen.findByTitle('Open'))

        const option = screen.getByText('Tag 2')
        expect(option).toBeInTheDocument()
        fireEvent.click(option)

        expect(screen.getByText('Tag 1')).toBeInTheDocument()
    })

    test('should allow only one scoped tag', async() => {
        render(<TagDropdown defaultTags = {[allTags[0], allTags[2]]} error = {[]} onChange = {onTagsChange} />)

        expect(await screen.findByText('label 1')).toBeInTheDocument()
        fireEvent.click(screen.getByTitle('Open'))

        const option = screen.getByText('scoped::label 2')
        expect(option).toBeInTheDocument()
        fireEvent.click(option)

        expect(await screen.findByText('label 2')).toBeInTheDocument()
        expect(screen.queryByText('label 1')).not.toBeInTheDocument()
    })

    test('should delete tag', async() => {
        render(<TagDropdown defaultTags = {[allTags[0], allTags[2]]} error = {[]} onChange = {onTagsChange} />)

        fireEvent.click(await screen.findByTitle('delete'))

        expect(screen.queryByText('label 1')).not.toBeInTheDocument()
    })

    test('should handle remove all tags', async() => {
        render(<TagDropdown defaultTags = {[allTags[0], allTags[2]]} error = {[]} onChange = {onTagsChange} />)

        fireEvent.click(await screen.findByTitle('Clear'))

        expect(screen.queryByText('Tag 1')).not.toBeInTheDocument()
        expect(screen.queryByText('label 1')).not.toBeInTheDocument()
    })

    test('should display error message', () => {
        render(<TagDropdown defaultTags = {[allTags[0], allTags[2]]} error = {tagsError} onChange = {onTagsChange} />)
        expect(screen.getByText('Tag error')).toBeInTheDocument()
    })

})