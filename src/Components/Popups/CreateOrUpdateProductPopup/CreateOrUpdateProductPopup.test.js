import React from 'react'
import {
    act, fireEvent, render, screen, useDispatchMock, useModuleMock, userEvent
} from '../../../Utilities/test-utils'
import { CreateOrUpdateProductPopup } from './index'

describe('<CreateOrUpdateProductPopup />', () => {
    jest.setTimeout(10000)

    const closePopupMock = useModuleMock('Redux/Popups/actions', 'closePopup')
    const submitProductMock = useModuleMock('Redux/Products/actions', 'requestCreateProduct')
    // const submitUpdateProductMock = useModuleMock('Redux/Products/actions', 'requestUpdateProduct')
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

    // const returnedFoundProduct = {
    //     id: 4,
    //     name: 'Midas Product',
    //     visionStatement: 'New Product',
    //     projectIds: [4],
    //     isArchived: false,
    //     portfolioId: 2,
    //     tagIds: [4, 13],
    //     productManagerId: 1,
    //     tags: [returnedTags[0], returnedTags[2]],
    //     projects: [returnedProjects[0]]
    // }

    beforeEach(() => {
        useDispatchMock().mockResolvedValue({ payload: [{ id: 1, username: 'pm' }] })
        selectAllTagsMock.mockReturnValue(returnedTags)
        selectNoAppIdProjectsMock.mockReturnValue(returnedProjects)
    })

    test('should render properly', () => {
        render(<CreateOrUpdateProductPopup />)

        expect(screen.getByText('Create Product')).toBeInTheDocument()
    })

    test('should call onSubmit', async() => {
        render(<CreateOrUpdateProductPopup />)

        fireEvent.click(screen.getByText('Submit'))

        expect(submitProductMock).toHaveBeenCalledWith({
            name: '',
            visionStatement: '',
            problemStatement: '',
            tags: [],
            tagIds: [],
            projects: [],
            projectIds: [],
            productManagerId: null
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
                    'Project with error 1',
                    'Project with error 2',
                    'Tag error'
                ]
            }
        }
        render(<CreateOrUpdateProductPopup />, { initialState: state })

        expect(screen.getByText('product name')).toBeInTheDocument()
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

    // Hitting the timeout for jest during test:all --- TODO: look into
    // test('should call onSubmit for updateProduct', async() => {
    //     const selectProductByIdMock = useModuleMock('Redux/Products/selectors', 'selectProductById')
    //     selectProductByIdMock.mockReturnValue(returnedFoundProduct)

    //     const { rerender } = render(<CreateOrUpdateProductPopup id = {4} />)

    //     const name = 'My Edited Product'
    //     const visionStatement = 'New visionStatement'
    //     const problemStatement = 'To update all outdated software'

    //     const nameInput = screen.getByTestId('CreateOrUpdateProductPopup__input-name')
    //     const visionStatementInput = screen.getByTestId('CreateOrUpdateProductPopup__input-vision')
    //     const problemStatementInput = screen.getByTestId('CreateOrUpdateProductPopup__input-problem-statement')

    //     userEvent.clear(visionStatementInput)
    //     userEvent.clear(nameInput)
    //     userEvent.clear(problemStatementInput)

    //     userEvent.type(visionStatementInput, visionStatement)
    //     userEvent.type(nameInput, name)
    //     userEvent.type(problemStatementInput, problemStatement)

    //     rerender(<CreateOrUpdateProductPopup id = {4} />)

    //     fireEvent.click(screen.queryAllByTitle('Open')[1])
    //     fireEvent.click(await screen.findByText('project 2'))

    //     fireEvent.click(screen.getByText('Submit'))

    //     expect(submitUpdateProductMock).toHaveBeenCalledWith({
    //         ...returnedFoundProduct,
    //         problemStatement,
    //         name, visionStatement,
    //         projectIds: [20, 21],
    //         productManagerId: 1
    //     })
    // })
})