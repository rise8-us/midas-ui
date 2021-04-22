import React from 'react'
import {
    act, fireEvent, render, screen, useDispatchMock, useModuleMock, userEvent, within
} from '../../../Utilities/test-utils'
import { CreateOrUpdateProductPopup } from './index'

describe('<CreateOrUpdateProductPopup />', () => {

    const closePopupMock = useModuleMock('Redux/Popups/actions', 'closePopup')
    const submitProductMock = useModuleMock('Redux/Products/actions', 'requestCreateProduct')
    const submitUpdateProductMock = useModuleMock('Redux/Products/actions', 'requestUpdateProduct')
    const selectAllTagsMock = useModuleMock('Redux/Tags/selectors', 'selectAllTags')
    const selectNoAppIdProjectsMock = useModuleMock('Redux/Projects/selectors', 'selectNoAppIdProjects')

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
        useDispatchMock().mockReturnValue({})
        selectAllTagsMock.mockReturnValue(returnedTags)
        selectNoAppIdProjectsMock.mockReturnValue(returnedProjects)
    })

    test('should render properly', () => {
        render(<CreateOrUpdateProductPopup />)

        expect(screen.getByText('Create Product')).toBeInTheDocument()
        expect(screen.getByTestId('CreateOrUpdateProductPopup__input-name')).toBeInTheDocument()
        expect(screen.getByTestId('CreateOrUpdateProductPopup__input-description')).toBeInTheDocument()
    })

    test('should execute onSubmit', async() => {
        render(<CreateOrUpdateProductPopup />)

        const name = 'My New Product'
        const description = 'Test Description'

        const nameInput = within(screen.getByTestId('CreateOrUpdateProductPopup__input-name'))
            .getByRole('textbox')
        const descriptionInput = within(screen.getByTestId('CreateOrUpdateProductPopup__input-description'))
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

        expect(submitProductMock).toHaveBeenCalledWith({
            name, description, tagIds: [2], projectIds: [20], projects: [], tags: []
        })
    })


    test('should close popup', () => {
        render(<CreateOrUpdateProductPopup />)

        fireEvent.click(screen.getByTestId('Popup__button-close'))

        expect(closePopupMock).toHaveBeenCalled()
    })

    test('should display error messages', () => {
        const state = {
            errors: {
                'products/createOne': [
                    'product name',
                    'Gitlab error',
                    'Tag error'
                ]
            }
        }
        render(<CreateOrUpdateProductPopup />, { initialState: state })

        expect(screen.getByText('product name')).toBeInTheDocument()
        expect(screen.getByText('Tag error')).toBeInTheDocument()
    })

    test('should create new Project', async() => {
        const newProject = {
            id: 42,
            name: 'new-Project42'
        }

        act(() => {
            useDispatchMock().mockResolvedValue({ payload: newProject })
        })
        const { rerender } = render(<CreateOrUpdateProductPopup />)

        userEvent.type(screen.getByTestId('CreateOrUpdateProductPopup__input-projects'), newProject.name)
        expect(await screen.findByText(`Add "${newProject.name}"`)).toBeInTheDocument()
        const option = screen.getByText(`Add "${newProject.name}"`)

        act(() => {
            fireEvent.click(option)
            rerender(<CreateOrUpdateProductPopup />)
        })

        expect(await screen.findByText(newProject.name)).toBeInTheDocument()
    })

    test('should call onSubmit for updateProduct', async() => {
        const selectProductByIdMock = useModuleMock('Redux/Products/selectors', 'selectProductById')
        selectProductByIdMock.mockReturnValue(returnedFoundProduct)
        render(<CreateOrUpdateProductPopup id = {4} />)

        const name = 'My Edited Product'
        const description = 'New Description'

        const nameInput = within(screen.getByTestId('CreateOrUpdateProductPopup__input-name'))
            .getByRole('textbox')
        const descriptionInput = within(screen.getByTestId('CreateOrUpdateProductPopup__input-description'))
            .getByRole('textbox')

        userEvent.clear(descriptionInput)
        userEvent.clear(nameInput)

        userEvent.type(descriptionInput, description)
        userEvent.type(nameInput, name)

        fireEvent.click(await screen.queryAllByTitle('Open')[1])
        fireEvent.click(screen.getByText('project 2'))

        fireEvent.click(screen.getByText('Submit'))

        expect(submitUpdateProductMock).toHaveBeenCalledWith({
            ...returnedFoundProduct, name, description, projectIds: [20, 21]
        })
    })
})