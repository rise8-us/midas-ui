import React from 'react'
import {
    fireEvent, render, screen, useDispatchMock, useModuleMock, userEvent, within
} from '../../../Utilities/test-utils'
import { UpdateProjectPopup } from './index'

describe('<UpdateProjectPopup />', () => {

    const closePopupMock = useModuleMock('Redux/Popups/actions', 'closePopup')
    const submitProjectMock = useModuleMock('Redux/Projects/actions', 'requestUpdateProject')
    const selectProjectByIdMock = useModuleMock('Redux/Projects/selectors', 'selectProjectById')
    const selectAllTagsMock = useModuleMock('Redux/Tags/selectors', 'selectAllTags')

    const returnedTags = [
        { id: 1, label: 'Tag 1', description: '', color: '#000000' },
        { id: 2, label: 'Tag 2', description: '', color: '#000000' },
        { id: 13, label: 'scoped::label 1', description: '', color: '#000000' },
        { id: 14, label: 'scoped::label 2', description: '', color: '#000000' }
    ]

    const returnedProject = {
        id: 4,
        isArchived: false,
        name: 'My New Project',
        gitlabProjectId: 1234567,
        description: 'Test Description',
        tags: [returnedTags[0], returnedTags[2]]
    }

    beforeEach(() => {
        useDispatchMock().mockReturnValue({})
        selectProjectByIdMock.mockReturnValue(returnedProject)
        selectAllTagsMock.mockReturnValue(returnedTags)
    })

    test('should render properly', () => {
        render(<UpdateProjectPopup id = {4}/>)

        expect(screen.getByText('Update Project')).toBeInTheDocument()
        expect(within(screen.getByTestId('UpdateProjectPopup__input-name'))
            .getByRole('textbox')).toHaveValue(returnedProject.name)
        expect(within(screen.getByTestId('UpdateProjectPopup__input-description'))
            .getByRole('textbox')).toHaveValue(returnedProject.description)
        expect(within(screen.getByTestId('UpdateProjectPopup__input-gitlabProjectId'))
            .getByRole('spinbutton')).toHaveValue(returnedProject.gitlabProjectId)
    })

    test('should call onSubmit', () => {
        render(<UpdateProjectPopup id = {4} />)

        const name = 'My Edited Project'
        const gitlabProjectId = '15550'
        const description = 'New Description'

        const nameInput = within(screen.getByTestId('UpdateProjectPopup__input-name'))
            .getByRole('textbox')
        const descriptionInput = within(screen.getByTestId('UpdateProjectPopup__input-description'))
            .getByRole('textbox')
        const gitlabProjectIdInput = within(screen.getByTestId('UpdateProjectPopup__input-gitlabProjectId'))
            .getByRole('spinbutton')

        userEvent.clear(descriptionInput)
        userEvent.clear(gitlabProjectIdInput)
        userEvent.clear(nameInput)
        userEvent.type(descriptionInput, description)
        userEvent.type(gitlabProjectIdInput, gitlabProjectId)
        userEvent.type(nameInput, name)
        fireEvent.click(screen.getByText('Submit'))

        expect(submitProjectMock).toHaveBeenCalledTimes(1)
        expect(submitProjectMock.mock.calls[0][0]).toEqual(
            { ...returnedProject, name, description, gitlabProjectId, tagIds: [1, 13] })
    })

    test('should handle tag changes', async() => {
        render(<UpdateProjectPopup id = {4}/>)
        fireEvent.click(await screen.findByTitle('Open'))

        const option = screen.getByText('Tag 2')
        expect(option).toBeInTheDocument()
        fireEvent.click(option)

        expect(await screen.getByText('Tag 2')).toBeInTheDocument()
    })

    test('should handle remove all tags', async() => {
        render(<UpdateProjectPopup id = {4}/>)

        fireEvent.click(await screen.findByTitle('Clear'))

        expect(await screen.queryByText('Tag 1')).not.toBeInTheDocument()
        expect(await screen.queryByText('label 1')).not.toBeInTheDocument()
    })

    test('should allow only one scoped tag', async() => {
        render(<UpdateProjectPopup id = {4}/>)
        expect(await screen.findByText('label 1')).toBeInTheDocument()
        fireEvent.click(await screen.findByTitle('Open'))

        const option = screen.getByText('scoped::label 2')
        expect(option).toBeInTheDocument()
        fireEvent.click(option)

        expect(await screen.findByText('label 2')).toBeInTheDocument()
        expect(await screen.queryByText('label 1')).not.toBeInTheDocument()
    })

    test('should close popup', () => {
        render(<UpdateProjectPopup id = {4}/>)

        fireEvent.click(screen.getByTestId('Popup__button-close'))

        expect(closePopupMock).toHaveBeenCalled()
    })

    test('should display error message', () => {
        const state = {
            errors: {
                'projects/updateOne': [
                    'name error',
                    'Gitlab error'
                ]
            }
        }
        render(<UpdateProjectPopup id = {4} />, { initialState: state })

        expect(screen.getByText('name error')).toBeInTheDocument()
        expect(screen.getByText('Gitlab error')).toBeInTheDocument()
    })


    test('should delete tag', async() => {
        render(<UpdateProjectPopup id = {4}/>)

        fireEvent.click(await screen.findByTitle('delete'))

        expect(screen.queryByText('label 1')).not.toBeInTheDocument()
    })
})