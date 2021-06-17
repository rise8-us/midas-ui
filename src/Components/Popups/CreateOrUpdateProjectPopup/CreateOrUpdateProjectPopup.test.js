import React from 'react'
import {
    fireEvent, render, screen, useDispatchMock, useModuleMock, userEvent, waitFor
} from '../../../Utilities/test-utils'
import { CreateOrUpdateProjectPopup } from './index'

describe('<CreateOrUpdateProjectPopup />', () => {

    const closePopupMock = useModuleMock('Redux/Popups/actions', 'closePopup')
    const submitCreateProjectMock = useModuleMock('Redux/Projects/actions', 'requestCreateProject')
    const submitUpdateProjectMock = useModuleMock('Redux/Projects/actions', 'requestUpdateProject')
    const selectProjectByIdMock = useModuleMock('Redux/Projects/selectors', 'selectProjectById')
    const selectTagsByTypesMock = useModuleMock('Redux/Tags/selectors', 'selectTagsByTypes')
    const requestSearchProductMock = useModuleMock('Redux/Products/actions', 'requestSearchProduct')
    const selectGitlabConfigByIdMock = useModuleMock('Redux/GitlabConfigs/selectors', 'selectGitlabConfigById')
    const selectGitlabConfigsMock = useModuleMock('Redux/GitlabConfigs/selectors', 'selectGitlabConfigs')

    const returnedTags = [
        { id: 1, label: 'Tag 1', description: '', color: '#000000' },
        { id: 13, label: 'Tag 2', description: '', color: '#000000' },
    ]

    const returnedGitlabConfigs = [
        { id: 11, name: 'conf1' },
        { id: 12, name: 'conf2' }
    ]

    const returnedFoundProject = {
        id: 4,
        isArchived: false,
        name: 'My Project',
        gitlabProjectId: 1234567,
        description: 'Test Description',
        tags: [returnedTags[0], returnedTags[1]]
    }

    const returnedNewProject = {
        name: '',
        description: '',
        gitlabProjectId: '',
        tags: []
    }

    beforeEach(() => {
        useDispatchMock().mockResolvedValue({ data: {} })
        selectTagsByTypesMock.mockReturnValue(returnedTags)
        selectGitlabConfigsMock.mockReturnValue(returnedGitlabConfigs)
        selectGitlabConfigByIdMock.mockReturnValue(returnedGitlabConfigs[0])
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
                ]
            }
        }
        render(<CreateOrUpdateProjectPopup />, { initialState: state })

        expect(screen.getByText('name error')).toBeInTheDocument()
        expect(screen.getByText('Gitlab error')).toBeInTheDocument()
    })

    test('should call onSubmit for createProject', () => {
        requestSearchProductMock.mockReturnValue({})
        selectGitlabConfigByIdMock.mockReturnValue({ name: '' })
        selectProjectByIdMock.mockReturnValue(returnedNewProject)
        render(<CreateOrUpdateProjectPopup />)

        fireEvent.click(screen.getByText('Submit'))

        expect(submitCreateProjectMock).toHaveBeenCalledWith({
            ...returnedNewProject, tagIds: [], gitlabConfigId: null
        })
    })

    test('should call onSubmit for updateProject', () => {
        selectProjectByIdMock.mockReturnValue(returnedFoundProject)
        render(<CreateOrUpdateProjectPopup id = {4} parentId = {1}/>)

        const name = 'My Edited Project'
        const gitlabProjectId = '15550'
        const description = 'New Description'

        const nameInput = screen.getByTestId('CreateOrUpdateProjectPopup__input-name')
        const descriptionInput = screen.getByTestId('CreateOrUpdateProjectPopup__input-description')
        const gitlabProjectIdInput = screen.getByTestId('CreateOrUpdateProjectPopup__input-gitlabProjectId')

        userEvent.clear(descriptionInput)
        userEvent.clear(gitlabProjectIdInput)
        userEvent.clear(nameInput)
        userEvent.type(descriptionInput, description)
        userEvent.type(gitlabProjectIdInput, gitlabProjectId)
        userEvent.type(nameInput, name)

        fireEvent.click(screen.getAllByTitle('Open')[0])
        fireEvent.click(screen.getByText('conf2'))

        fireEvent.click(screen.getAllByTitle('Open')[1])
        fireEvent.click(screen.getAllByText('Tag 1')[1])

        fireEvent.click(screen.getByText('Submit'))

        expect(submitUpdateProjectMock).toHaveBeenCalledWith({
            ...returnedFoundProject, name, description, gitlabProjectId, tagIds: [13], productId: 1,
            gitlabConfigId: 12
        })
        waitFor(() => { expect(requestSearchProductMock).toHaveBeenCalledTimes(1) })
    })

    test('should close popup', () => {
        selectProjectByIdMock.mockReturnValue(returnedNewProject)
        render(<CreateOrUpdateProjectPopup />)

        fireEvent.click(screen.getByTestId('Popup__button-close'))

        expect(closePopupMock).toHaveBeenCalled()
    })

})