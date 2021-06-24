import React from 'react'
import {
    act, fireEvent, render, screen, useDispatchMock, useModuleMock, userEvent
} from '../../../Utilities/test-utils'
import { CreateOrUpdateProductPopup } from './index'

describe('<CreateOrUpdateProductPopup />', () => {
    jest.setTimeout(15000)

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

    const returnedFoundProduct = {
        id: 4,
        name: 'Midas Product',
        description: 'New Product',
        projectIds: [4],
        isArchived: false,
        portfolioId: 2,
        tagIds: [4, 13],
        productManagerId: 1,
        tags: [returnedTags[0], returnedTags[2]],
        projects: [returnedProjects[0]]
    }

    beforeEach(() => {
        useDispatchMock().mockResolvedValue({ payload: [{ id: 1, username: 'pm' }] })
        selectTagsByTypesMock.mockReturnValue(returnedTags)
        selectProjectsWithNoProductIdMock.mockReturnValue(returnedProjects)
    })

    test('should render properly', async() => {
        render(<CreateOrUpdateProductPopup />)

        expect(await screen.findByText('Create Product')).toBeInTheDocument()
    })

    test('should call onSubmit', async() => {
        useDispatchMock().mockResolvedValue({ payload: [] })
        render(<CreateOrUpdateProductPopup />)

        fireEvent.click(await screen.findByText('Submit'))

        expect(submitProductMock).toHaveBeenCalledWith({
            name: '',
            description: '',
            tags: [],
            tagIds: [],
            projects: [],
            projectIds: [],
            productManagerId: null,
            type: 'PRODUCT',
            childIds: []
        })
    })

    test('should close popup', async() => {
        render(<CreateOrUpdateProductPopup />)

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
        render(<CreateOrUpdateProductPopup />, { initialState: state })

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

        render(<CreateOrUpdateProductPopup />)

        userEvent.type(screen.getByTestId('CreateOrUpdateProductPopup__input-projects'), newProject.name)
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

        render(<CreateOrUpdateProductPopup id = {4} />)

        const name = 'My Edited Product'
        const description = 'New description'

        const nameInput = screen.getByTestId('CreateOrUpdateProductPopup__input-name')
        const descriptionInput = screen.getByTestId('CreateOrUpdateProductPopup__input-description')

        userEvent.clear(descriptionInput)
        userEvent.clear(nameInput)

        userEvent.type(descriptionInput, description)
        userEvent.type(nameInput, name)

        fireEvent.click(screen.getAllByTitle(/open/i)[0])
        fireEvent.click(screen.getByText(/Tag 2/i))

        useDispatchMock().mockReturnValueOnce({ data: { payload: {} } })

        fireEvent.click(screen.getAllByTitle('Open')[1])
        fireEvent.click(await screen.findByText('project 2'))

        fireEvent.click(screen.getByText('Submit'))

        expect(submitUpdateProductMock).toHaveBeenCalledWith({
            ...returnedFoundProduct,
            name,
            description,
            projectIds: [20, 21],
            productManagerId: 1,
            type: 'PRODUCT',
            tagIds: [4, 13, 2],
            childIds: []
        })
    })
})