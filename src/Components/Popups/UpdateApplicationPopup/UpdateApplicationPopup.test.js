import React from 'react'
import {
    act, fireEvent, render, screen, useDispatchMock, useModuleMock, userEvent, within
} from '../../../Utilities/test-utils'
import { UpdateApplicationPopup } from './index'

describe('<UpdateApplicationPopup />', () => {

    const closePopupMock = useModuleMock('Redux/Popups/actions', 'closePopup')
    const submitApplicationMock = useModuleMock('Redux/Applications/actions', 'requestUpdateApplication')
    const selectApplicationByIdMock = useModuleMock('Redux/Applications/selectors', 'selectApplicationById')
    const selectAllTagsMock = useModuleMock('Redux/Tags/selectors', 'selectAllTags')
    const selectNoAppIdProjectsMock = useModuleMock('Redux/Projects/selectors', 'selectNoAppIdProjects')

    const returnedTags = [
        { id: 4, label: 'Tag 1', description: '', color: '#000000' },
        { id: 2, label: 'Tag 2', description: '', color: '#000000' },
        { id: 13, label: 'scoped::label 1', description: '', color: '#000000' },
        { id: 14, label: 'scoped::label 2', description: '', color: '#000000' }
    ]

    const returnedProjects = [
        { id: 4, name: 'My New Project' },
        { id: 21, name: 'project 2' },
    ]

    const returnedApplication = {
        id: 4,
        name: 'Midas Application',
        description: 'New Application',
        projectIds: [4],
        isArchived: false,
        portfolioId: 2,
        tagIds: [4, 13],
        productManagerId: 1,
        tags: [returnedTags[0], returnedTags[2]],
        projects: [returnedProjects[0]]
    }

    beforeEach(() => {
        useDispatchMock().mockReturnValue({})
        selectApplicationByIdMock.mockReturnValue(returnedApplication)
        selectAllTagsMock.mockReturnValue(returnedTags)
        selectNoAppIdProjectsMock.mockReturnValue(returnedProjects)
    })

    test('should render properly', () => {
        render(<UpdateApplicationPopup id = {4}/>)

        expect(screen.getByText('Update Application')).toBeInTheDocument()
        expect(within(screen.getByTestId('UpdateApplicationPopup__input-name'))
            .getByRole('textbox')).toHaveValue(returnedApplication.name)
        expect(screen.getByText(returnedApplication.description)).toBeInTheDocument()
        expect(screen.getByText('My New Project')).toBeInTheDocument()
        expect(screen.getByText('Tag 1')).toBeInTheDocument()
    })

    test('should call onSubmit', async() => {
        render(<UpdateApplicationPopup id = {4} />)

        const name = 'My Edited Application'
        const description = 'New Description'

        const nameInput = within(screen.getByTestId('UpdateApplicationPopup__input-name'))
            .getByRole('textbox')
        const descriptionInput = within(screen.getByTestId('UpdateApplicationPopup__input-description'))
            .getByRole('textbox')

        userEvent.clear(descriptionInput)
        userEvent.clear(nameInput)

        userEvent.type(descriptionInput, description)
        userEvent.type(nameInput, name)

        fireEvent.click(await screen.queryAllByTitle('Open')[1])
        fireEvent.click(screen.getByText('project 2'))

        fireEvent.click(screen.getByText('Submit'))

        expect(submitApplicationMock).toHaveBeenCalledTimes(1)
        expect(submitApplicationMock.mock.calls[0][0]).toEqual(
            { ...returnedApplication, name, description, projectIds: [4, 21] })
    })

    test('should handle tag changes', async() => {
        render(<UpdateApplicationPopup id = {4}/>)
        fireEvent.click(await screen.queryAllByTitle('Open')[0])

        const option = screen.getByText('Tag 2')
        expect(option).toBeInTheDocument()
        fireEvent.click(option)

        expect(await screen.getByText('Tag 2')).toBeInTheDocument()
    })

    test('should handle remove all tags', async() => {
        render(<UpdateApplicationPopup id = {4}/>)

        fireEvent.click(await screen.queryAllByTitle('Clear')[0])

        expect(await screen.queryByText('Tag 1')).not.toBeInTheDocument()
        expect(await screen.queryByText('label 1')).not.toBeInTheDocument()
    })

    test('should allow only one scoped tag', async() => {
        render(<UpdateApplicationPopup id = {4}/>)
        expect(await screen.findByText('label 1')).toBeInTheDocument()
        fireEvent.click(await screen.queryAllByTitle('Open')[0])

        const option = screen.getByText('scoped::label 2')
        expect(option).toBeInTheDocument()
        fireEvent.click(option)

        expect(await screen.findByText('label 2')).toBeInTheDocument()
        expect(await screen.queryByText('label 1')).not.toBeInTheDocument()
    })

    test('should close popup', () => {
        render(<UpdateApplicationPopup id = {4}/>)

        fireEvent.click(screen.getByTestId('Popup__button-close'))

        expect(closePopupMock).toHaveBeenCalled()
    })

    test('should display error message', () => {
        const state = {
            errors: {
                'applications/updateOne': [
                    'name error'
                ]
            }
        }
        render(<UpdateApplicationPopup id = {4} />, { initialState: state })

        expect(screen.getByText('name error')).toBeInTheDocument()
    })

    test('should delete tag', async() => {
        render(<UpdateApplicationPopup id = {4}/>)

        fireEvent.click(await screen.queryAllByTitle('delete')[0])

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
        const { rerender } = render(<UpdateApplicationPopup id = {4}/>)

        userEvent.type(screen.getByTestId('UpdateApplicationPopup__input-projects'), newProject.name)
        expect(await screen.findByText(`Add "${newProject.name}"`)).toBeInTheDocument()
        const option = screen.getByText(`Add "${newProject.name}"`)

        act(() => {
            fireEvent.click(option)
            rerender(<UpdateApplicationPopup id = {4} />)
        })

        expect(await screen.findByText(newProject.name)).toBeInTheDocument()
    })
})