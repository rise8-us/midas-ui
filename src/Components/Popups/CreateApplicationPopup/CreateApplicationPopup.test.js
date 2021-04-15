import React from 'react'
import {
    act, fireEvent, render, screen, useDispatchMock, useModuleMock, userEvent, within
} from '../../../Utilities/test-utils'
import { CreateApplicationPopup } from './index'

describe('<CreateApplicationPopup />', () => {

    const closePopupMock = useModuleMock('Redux/Popups/actions', 'closePopup')
    const submitApplicationMock = useModuleMock('Redux/Applications/actions', 'requestCreateApplication')
    const selectAllTagsMock = useModuleMock('Redux/Tags/selectors', 'selectAllTags')
    const selectNoAppIdProjectsMock = useModuleMock('Redux/Projects/selectors', 'selectNoAppIdProjects')

    const returnedTags = [
        { id: 1, label: 'Tag 1', description: '', color: '#000000' },
        { id: 2, label: 'Tag 2', description: '', color: '#000000' },
        { id: 13, label: 'scoped::label 1', description: '', color: '#000000' },
        { id: 14, label: 'scoped::label 2', description: '', color: '#000000' }
    ]
    const returnedProjects = [
        { id: 20, name: 'project 1' },
        { id: 21, name: 'project 2' },
    ]

    beforeEach(() => {
        useDispatchMock().mockReturnValue({})
        selectAllTagsMock.mockReturnValue(returnedTags)
        selectNoAppIdProjectsMock.mockReturnValue(returnedProjects)
    })

    test('should render properly', () => {
        render(<CreateApplicationPopup />)

        expect(screen.getByText('Create New Application')).toBeInTheDocument()
        expect(screen.getByTestId('CreateApplicationPopup__input-name')).toBeInTheDocument()
        expect(screen.getByTestId('CreateApplicationPopup__input-description')).toBeInTheDocument()
    })

    test('should execute onSubmit', async() => {
        render(<CreateApplicationPopup />)

        const name = 'My New Application'
        const description = 'Test Description'

        const nameInput = within(screen.getByTestId('CreateApplicationPopup__input-name'))
            .getByRole('textbox')
        const descriptionInput = within(screen.getByTestId('CreateApplicationPopup__input-description'))
            .getByRole('textbox')

        userEvent.type(nameInput, name)
        userEvent.type(descriptionInput, description)

        fireEvent.click(await screen.queryAllByTitle('Open')[0])
        const option = screen.getByText('Tag 2')
        expect(option).toBeInTheDocument()
        fireEvent.click(option)

        fireEvent.click(await screen.queryAllByTitle('Open')[1])
        fireEvent.click(screen.getByText('project 1'))

        fireEvent.click(screen.getByText('Submit'))

        expect(submitApplicationMock).toHaveBeenCalledTimes(1)
        expect(submitApplicationMock.mock.calls[0][0]).toEqual(
            { name, description, tagIds: [2], productManagerId: 1, projectIds: [20] }
        )
    })

    test('should add & remove tag', async() => {
        render(<CreateApplicationPopup />)
        fireEvent.click(await screen.queryAllByTitle('Open')[0])

        // Add tag
        const option = screen.getByText('Tag 2')
        expect(option).toBeInTheDocument()
        fireEvent.click(option)

        expect(await screen.getByText('Tag 2')).toBeInTheDocument()

        // Remove tag
        fireEvent.click(await screen.queryAllByTitle('Clear')[0])
        expect(await screen.queryByText('Tag 2')).not.toBeInTheDocument()
    })

    test('should allow only one scoped tag', async() => {
        render(<CreateApplicationPopup />)

        // add first scoped label
        fireEvent.click(await screen.queryAllByTitle('Open')[0])
        const option = screen.getByText('scoped::label 1')
        expect(option).toBeInTheDocument()
        fireEvent.click(option)

        expect(await screen.findByText('label 1')).toBeInTheDocument()

        // add second scoped label
        fireEvent.click(await screen.queryAllByTitle('Open')[0])
        const option2 = screen.getByText('scoped::label 2')
        expect(option2).toBeInTheDocument()
        fireEvent.click(option2)

        expect(await screen.queryByText('label 1')).not.toBeInTheDocument()
        expect(await screen.findByText('label 2')).toBeInTheDocument()
    })

    test('should close popup', () => {
        render(<CreateApplicationPopup />)

        fireEvent.click(screen.getByTestId('Popup__button-close'))

        expect(closePopupMock).toHaveBeenCalled()
    })

    test('should display error messages', () => {
        const state = {
            errors: {
                'applications/createOne': [
                    'name error',
                    'Gitlab error',
                    'Tag error'
                ]
            }
        }
        render(<CreateApplicationPopup />, { initialState: state })

        expect(screen.getByText('name error')).toBeInTheDocument()
        expect(screen.getByText('Tag error')).toBeInTheDocument()
    })

    test('should delete tag', async() => {
        render(<CreateApplicationPopup />)

        fireEvent.click(await screen.queryAllByTitle('Open')[0])
        const option = screen.getByText('scoped::label 1')
        expect(option).toBeInTheDocument()
        fireEvent.click(option)

        expect(await screen.findByText('label 1')).toBeInTheDocument()
        fireEvent.click(await screen.findByTitle('delete'))

        expect(screen.queryByText('label 1')).not.toBeInTheDocument()
    })

    test('should create new Project', async() => {
        const newProject = {
            id: 42,
            name: 'new-Project42'
        }

        act(() => {
            useDispatchMock().mockResolvedValue({ payload: newProject })
        })
        const { rerender } = render(<CreateApplicationPopup />)

        userEvent.type(screen.getByTestId('CreateApplicationPopup__input-projects'), newProject.name)
        expect(await screen.findByText(`Add "${newProject.name}"`)).toBeInTheDocument()
        const option = screen.getByText(`Add "${newProject.name}"`)

        act(() => {
            fireEvent.click(option)
            rerender(<CreateApplicationPopup />)
        })

        expect(await screen.findByText(newProject.name)).toBeInTheDocument()
    })
})