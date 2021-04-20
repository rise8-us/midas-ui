import React from 'react'
import {
    fireEvent, render, screen, useDispatchMock, useModuleMock, userEvent, within
} from '../../../Utilities/test-utils'
import { CreateOrUpdateProjectPopup } from './index'

describe('<CreateOrUpdateProjectPopup />', () => {

    const closePopupMock = useModuleMock('Redux/Popups/actions', 'closePopup')
    const submitCreateProjectMock = useModuleMock('Redux/Projects/actions', 'requestCreateProject')
    const submitUpdateProjectMock = useModuleMock('Redux/Projects/actions', 'requestUpdateProject')
    const selectProjectByIdMock = useModuleMock('Redux/Projects/selectors', 'selectProjectById')
    const selectAllTagsMock = useModuleMock('Redux/Tags/selectors', 'selectAllTags')

    const returnedTags = [
        { id: 1, label: 'Tag 1', description: '', color: '#000000' },
        { id: 2, label: 'Tag 2', description: '', color: '#000000' },
        { id: 13, label: 'scoped::label 1', description: '', color: '#000000' },
        { id: 14, label: 'scoped::label 2', description: '', color: '#000000' }
    ]

    const returnedFoundProject = {
        id: 4,
        isArchived: false,
        name: 'My Project',
        gitlabProjectId: 1234567,
        description: 'Test Description',
        tags: [returnedTags[0], returnedTags[2]]
    }

    const returnedNewProject = {
        name: '',
        description: '',
        gitlabProjectId: '',
        tags: []
    }

    beforeEach(() => {
        useDispatchMock().mockReturnValue({})
        selectAllTagsMock.mockReturnValue(returnedTags)
    })

    test('should render found project', () => {
        selectProjectByIdMock.mockReturnValue(returnedFoundProject)
        render(<CreateOrUpdateProjectPopup id = {4}/>)

        expect(screen.getByText('Update Project')).toBeInTheDocument()
    })

    test('should render new project', () => {
        selectProjectByIdMock.mockReturnValue(returnedNewProject)
        render(<CreateOrUpdateProjectPopup />)

        expect(screen.getByText('Create Project')).toBeInTheDocument()
    })

    test('should display error message', () => {
        selectProjectByIdMock.mockReturnValue(returnedNewProject)
        const state = {
            errors: {
                'projects/createOne': [
                    'name error',
                    'Gitlab error',
                    'Tag error'
                ]
            }
        }
        render(<CreateOrUpdateProjectPopup />, { initialState: state })

        expect(screen.getByText('name error')).toBeInTheDocument()
        expect(screen.getByText('Gitlab error')).toBeInTheDocument()
        expect(screen.getByText('Tag error')).toBeInTheDocument()
    })

    test('should handle tag changes', async() => {
        selectProjectByIdMock.mockReturnValue(returnedFoundProject)
        render(<CreateOrUpdateProjectPopup id = {4}/>)

        fireEvent.click(await screen.findByTitle('Open'))

        const option = screen.getByText('Tag 2')
        expect(option).toBeInTheDocument()
        fireEvent.click(option)

        expect(screen.getByText('Tag 2')).toBeInTheDocument()
    })

    test('should allow only one scoped tag', async() => {
        selectProjectByIdMock.mockReturnValue(returnedFoundProject)
        render(<CreateOrUpdateProjectPopup id = {4}/>)

        expect(await screen.findByText('label 1')).toBeInTheDocument()
        fireEvent.click(screen.getByTitle('Open'))

        const option = screen.getByText('scoped::label 2')
        expect(option).toBeInTheDocument()
        fireEvent.click(option)

        expect(await screen.findByText('label 2')).toBeInTheDocument()
        expect(screen.queryByText('label 1')).not.toBeInTheDocument()
    })

    test('should delete tag', async() => {
        selectProjectByIdMock.mockReturnValue(returnedFoundProject)
        render(<CreateOrUpdateProjectPopup id = {4}/>)

        fireEvent.click(await screen.findByTitle('delete'))

        expect(screen.queryByText('label 1')).not.toBeInTheDocument()
    })

    test('should handle remove all tags', async() => {
        selectProjectByIdMock.mockReturnValue(returnedFoundProject)
        render(<CreateOrUpdateProjectPopup id = {4}/>)

        fireEvent.click(await screen.findByTitle('Clear'))

        expect(screen.queryByText('Tag 1')).not.toBeInTheDocument()
        expect(screen.queryByText('label 1')).not.toBeInTheDocument()
    })

    test('should call onSubmit for createProject', () => {
        selectProjectByIdMock.mockReturnValue(returnedNewProject)
        render(<CreateOrUpdateProjectPopup />)

        fireEvent.click(screen.getByText('Submit'))

        expect(submitCreateProjectMock).toHaveBeenCalledWith({
            ...returnedNewProject, tagIds: []
        })
    })

    test('should call onSubmit for updateProject', () => {
        selectProjectByIdMock.mockReturnValue(returnedFoundProject)
        render(<CreateOrUpdateProjectPopup id = {4} />)

        const name = 'My Edited Project'
        const gitlabProjectId = '15550'
        const description = 'New Description'

        const nameInput = within(screen.getByTestId('CreateOrUpdateProjectPopup__input-name'))
            .getByRole('textbox')
        const descriptionInput = within(screen.getByTestId('CreateOrUpdateProjectPopup__input-description'))
            .getByRole('textbox')
        const gitlabProjectIdInput = within(screen.getByTestId('CreateOrUpdateProjectPopup__input-gitlabProjectId'))
            .getByRole('spinbutton')

        userEvent.clear(descriptionInput)
        userEvent.clear(gitlabProjectIdInput)
        userEvent.clear(nameInput)
        userEvent.type(descriptionInput, description)
        userEvent.type(gitlabProjectIdInput, gitlabProjectId)
        userEvent.type(nameInput, name)
        fireEvent.click(screen.getByText('Submit'))

        expect(submitUpdateProjectMock).toHaveBeenCalledWith({
            ...returnedFoundProject, name, description, gitlabProjectId, tagIds: [1, 13]
        })
    })

    test('should close popup', () => {
        selectProjectByIdMock.mockReturnValue(returnedNewProject)
        render(<CreateOrUpdateProjectPopup />)

        fireEvent.click(screen.getByTestId('Popup__button-close'))

        expect(closePopupMock).toHaveBeenCalled()
    })

})