import React from 'react'
import {
    fireEvent, render, screen, useDispatchMock, useModuleMock, userEvent, within
} from '../../../Utilities/test-utils'
import { UpdateProductPopup } from './index'

describe('<UpdateProductPopup />', () => {

    const closePopupMock = useModuleMock('Redux/Popups/actions', 'closePopup')
    const submitProductMock = useModuleMock('Redux/Products/actions', 'requestUpdateProduct')
    const getProductByIdMock = useModuleMock('Redux/Products/selectors', 'getProductById')
    const selectAllTagsMock = useModuleMock('Redux/Tags/selectors', 'selectAllTags')

    const returnedTags = [
        { id: 1, label: 'Tag 1', description: '', color: '#000000' },
        { id: 2, label: 'Tag 2', description: '', color: '#000000' },
        { id: 13, label: 'scoped::label 1', description: '', color: '#000000' },
        { id: 14, label: 'scoped::label 2', description: '', color: '#000000' }
    ]

    const returnedProduct = {
        id: 4,
        isArchived: false,
        name: 'My New Product',
        gitlabProjectId: 1234567,
        description: 'Test Description',
        tags: [returnedTags[0], returnedTags[2]]
    }

    beforeEach(() => {
        useDispatchMock().mockReturnValue({})
        getProductByIdMock.mockReturnValue(returnedProduct)
        selectAllTagsMock.mockReturnValue(returnedTags)
    })

    test('should render properly', () => {
        render(<UpdateProductPopup id = {4}/>)

        expect(screen.getByText('Update Product')).toBeInTheDocument()
        expect(within(screen.getByTestId('UpdateProductPopup__input-name'))
            .getByRole('textbox')).toHaveValue(returnedProduct.name)
        expect(within(screen.getByTestId('UpdateProductPopup__input-description'))
            .getByRole('textbox')).toHaveValue(returnedProduct.description)
        expect(within(screen.getByTestId('UpdateProductPopup__input-gitlabProjectId'))
            .getByRole('spinbutton')).toHaveValue(returnedProduct.gitlabProjectId)
    })

    test('should call onSubmit', () => {
        render(<UpdateProductPopup id = {4} />)

        const name = 'My Edited Product'
        const gitlabProjectId = '15550'
        const description = 'New Description'

        const nameInput = within(screen.getByTestId('UpdateProductPopup__input-name'))
            .getByRole('textbox')
        const descriptionInput = within(screen.getByTestId('UpdateProductPopup__input-description'))
            .getByRole('textbox')
        const gitlabProjectIdInput = within(screen.getByTestId('UpdateProductPopup__input-gitlabProjectId'))
            .getByRole('spinbutton')

        userEvent.clear(descriptionInput)
        userEvent.clear(gitlabProjectIdInput)
        userEvent.clear(nameInput)
        userEvent.type(descriptionInput, description)
        userEvent.type(gitlabProjectIdInput, gitlabProjectId)
        userEvent.type(nameInput, name)
        fireEvent.click(screen.getByText('Submit'))

        expect(submitProductMock).toHaveBeenCalledTimes(1)
        expect(submitProductMock.mock.calls[0][0]).toEqual(
            { ...returnedProduct, name, description, gitlabProjectId, tagIds: [1, 13] })
    })

    test('should handle tag changes', async() => {
        render(<UpdateProductPopup id = {4}/>)
        fireEvent.click(await screen.findByTitle('Open'))

        const option = screen.getByText('Tag 2')
        expect(option).toBeInTheDocument()
        fireEvent.click(option)

        expect(await screen.getByText('Tag 2')).toBeInTheDocument()
    })

    test('should allow only one scoped tag', async() => {
        render(<UpdateProductPopup id = {4}/>)
        expect(await screen.findByText('label 1')).toBeInTheDocument()
        fireEvent.click(await screen.findByTitle('Open'))

        const option = screen.getByText('scoped::label 2')
        expect(option).toBeInTheDocument()
        fireEvent.click(option)

        expect(await screen.findByText('label 2')).toBeInTheDocument()
        expect(await screen.queryByText('label 1')).not.toBeInTheDocument()
    })

    test('should close popup', () => {
        render(<UpdateProductPopup id = {4}/>)

        fireEvent.click(screen.getByTestId('Popup__button-close'))

        expect(closePopupMock).toHaveBeenCalled()
    })

    test('should display error message', () => {
        const state = {
            errors: {
                'products/updateOne': [
                    'name error',
                    'Gitlab error'
                ]
            }
        }
        render(<UpdateProductPopup id = {4} />, { initialState: state })

        expect(screen.getByText('name error')).toBeInTheDocument()
        expect(screen.getByText('Gitlab error')).toBeInTheDocument()
    })
})