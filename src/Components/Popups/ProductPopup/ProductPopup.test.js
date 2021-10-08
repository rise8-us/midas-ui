import React from 'react'
import { act, fireEvent, render, screen, useDispatchMock, useModuleMock, userEvent } from 'Utilities/test-utils'
import { ProductPopup } from './index'

describe('<ProductPopup />', () => {
    jest.setTimeout(60000)

    const closePopupMock = useModuleMock('Redux/Popups/actions', 'closePopup')
    const submitProductMock = useModuleMock('Redux/Products/actions', 'requestCreateProduct')
    const submitUpdateProductMock = useModuleMock('Redux/Products/actions', 'requestUpdateProduct')
    const selectTagsByTypesMock = useModuleMock('Redux/Tags/selectors', 'selectTagsByTypes')
    const selectProjectsWithNoProductIdMock = useModuleMock('Redux/Projects/selectors', 'selectProjectsWithNoProductId')

    const returnedTags = [
        { id: 4, label: 'Tag 1', description: '', color: '#000000' },
        { id: 2, label: 'Tag 2', description: '', color: '#000000' },
        { id: 13, label: 'scoped::label 1', description: '', color: '#000000' },
        { id: 14, label: 'scoped::label 2', description: '', color: '#000000' }
    ]

    const returnedProjects = [
        { id: 20, name: 'project 1' },
        { id: 21, name: 'project 2' },
    ]

    const returnedSourceControl = [
        { id: 10, name: 'orig source control', description: '', baseUrl: 'orig_fake_url' },
        { id: 13, name: 'test source control', description: '', baseUrl: 'fake_url' }
    ]

    const returnedTeams = [
        { id: 1, name: 'team 1' },
        { id: 2, name: 'team 2' },
        { id: 3, name: 'team 3' },
        { id: 4, name: 'team 4' },
    ]

    const returnedFoundProduct = {
        id: 4,
        name: 'Midas Product',
        description: 'New Product',
        projectIds: [4],
        isArchived: false,
        portfolioId: 2,
        tagIds: [4, 13],
        ownerId: null,
        teamIds: [1],
        tags: [returnedTags[0], returnedTags[2]],
        projects: [returnedProjects[0]],
        gitlabGroupId: 1,
        sourceControlId: 10,
    }

    beforeEach(() => {
        useDispatchMock().mockResolvedValue({ payload: [{ id: 1, username: 'pm' }] })
        selectTagsByTypesMock.mockReturnValue(returnedTags)
        selectProjectsWithNoProductIdMock.mockReturnValue(returnedProjects)
    })

    test('should render properly', async() => {
        render(<ProductPopup />)

        expect(await screen.findByText('Create Product')).toBeInTheDocument()
    })

    test('should call onSubmit', async() => {
        useDispatchMock().mockResolvedValue({ payload: [] })

        render(<ProductPopup />)

        fireEvent.click(await screen.findByText('Submit'))

        expect(submitProductMock).toHaveBeenCalledWith({
            name: '',
            description: '',
            vision: undefined,
            mission: undefined,
            problemStatement: undefined,
            tags: [],
            tagIds: [],
            projects: [],
            projectIds: [],
            teamIds: [],
            type: 'PRODUCT',
            childIds: [],
            gitlabGroupId: undefined,
            sourceControlId: null,
            ownerId: null,
        })
    })

    test('should close popup', async() => {
        render(<ProductPopup />)

        fireEvent.click(await screen.findByTestId('Popup__button-close'))

        expect(closePopupMock).toHaveBeenCalled()
    })

    test('should display error messages', async() => {
        const state = {
            errors: {
                'products/createOne': [
                    'product name',
                    'Project with error 1',
                    'Project with error 2',
                    'Tag error'
                ]
            }
        }
        render(<ProductPopup />, { initialState: state })

        expect(await screen.findByText('product name')).toBeInTheDocument()
        expect(screen.getByText('Tag error')).toBeInTheDocument()
        expect(screen.getByText(/Project with error 1/i)).toBeInTheDocument()
        expect(screen.getByText(/Project with error 2/i)).toBeInTheDocument()
    })

    test('should create new Project', async() => {
        const newProject = {
            id: 42,
            name: 'new-Project42'
        }

        useDispatchMock().mockResolvedValue({ payload: newProject })

        render(<ProductPopup />)

        userEvent.type(screen.getByTestId('ProductPopup__input-projects'), newProject.name)
        expect(await screen.findByText(`Add "${newProject.name}"`)).toBeInTheDocument()
        const option = screen.getByText(`Add "${newProject.name}"`)

        act(() => {
            fireEvent.click(option)
        })

        expect(await screen.findByText(newProject.name)).toBeInTheDocument()
    })

    test('should call onSubmit for updateProduct', async() => {
        const selectProductByIdMock = useModuleMock('Redux/Products/selectors', 'selectProductById')
        selectProductByIdMock.mockReturnValue(returnedFoundProduct)
        const selectSourceControlsMock = useModuleMock('Redux/SourceControls/selectors', 'selectSourceControls')
        selectSourceControlsMock.mockReturnValue(returnedSourceControl)
        const selectSourceControlByIdMock = useModuleMock('Redux/SourceControls/selectors', 'selectSourceControlById')
        selectSourceControlByIdMock.mockReturnValue(returnedSourceControl[0])
        const selectAllTeamsMock = useModuleMock('Redux/Teams/selectors', 'selectAllTeams')
        selectAllTeamsMock.mockReturnValue(returnedTeams)

        useDispatchMock().mockResolvedValue({ payload: [{ id: 1, name: 'team 1' }] })

        render(<ProductPopup id = {4} />)

        const name = 'My Edited Product'
        const description = 'New description'
        const vision = 'vision'
        const mission = 'mission'
        const problem = 'problem'
        const gitlabGroupId = '2'

        const nameInput = screen.getByTestId('ProductPopup__input-name')
        const descriptionInput = screen.getByTestId('ProductPopup__input-description')
        const visionInput = screen.getByTestId('ProductPopup__input-vision')
        const missionInput = screen.getByTestId('ProductPopup__input-mission')
        const problemInput = screen.getByTestId('ProductPopup__input-problem')
        const gitlabGroupIdInput = screen.getByTestId('ProductPopup__input-gitlabGroupId')

        userEvent.clear(descriptionInput)
        userEvent.clear(nameInput)
        userEvent.clear(visionInput)
        userEvent.clear(missionInput)
        userEvent.clear(problemInput)
        userEvent.clear(gitlabGroupIdInput)

        userEvent.type(descriptionInput, description)
        userEvent.type(nameInput, name)
        userEvent.type(visionInput, vision)
        userEvent.type(missionInput, mission)
        userEvent.type(problemInput, problem)
        userEvent.type(gitlabGroupIdInput, gitlabGroupId)

        fireEvent.click(screen.getAllByTitle(/open/i)[0])
        fireEvent.click(await screen.findByText('team 2'))

        fireEvent.click(screen.getAllByTitle(/open/i)[1])
        fireEvent.click(await screen.getByText(/Tag 2/i))

        fireEvent.click(screen.getAllByTitle(/open/i)[2])
        fireEvent.click(await screen.findByText('test source control'))

        fireEvent.click(screen.getAllByTitle(/open/i)[3])
        fireEvent.click(await screen.findByText('project 2'))

        fireEvent.click(screen.getByText('Submit'))

        expect(submitUpdateProductMock).toHaveBeenCalledWith({
            ...returnedFoundProduct,
            name,
            description,
            vision,
            mission,
            problemStatement: problem,
            projectIds: [20, 21],
            ownerId: null,
            teamIds: [1, 2],
            type: 'PRODUCT',
            tagIds: [4, 13, 2],
            childIds: [],
            gitlabGroupId,
            sourceControlId: 13
        })
    })
})