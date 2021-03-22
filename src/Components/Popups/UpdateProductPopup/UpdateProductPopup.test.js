import userEvent from '@testing-library/user-event'
import React from 'react'
import { fireEvent, render, screen, useDispatchMock, useModuleMock, within } from '../../../Utilities/test-utils'
import { UpdateProductPopup } from './index'

const closePopupMock = useModuleMock('Redux/Popups/actions', 'closePopup')
const submitProductMock = useModuleMock('Redux/Products/actions', 'requestUpdateProduct')
const getProductByIdMock = useModuleMock('Redux/Products/selectors', 'getProductById')

const returnedProduct = {
    id: 4,
    isArchived: false,
    name: 'My New Product',
    gitlabProjectId: 1234567,
    description: 'Test Description'
}

test('<UpdateProductPopup /> - test component renders properly', () => {
    getProductByIdMock.mockReturnValue(returnedProduct)
    render(<UpdateProductPopup id = {4}/>)

    expect(screen.getByText('Update Product')).toBeInTheDocument()
    expect(within(screen.getByTestId('UpdateProductPopup__input-name'))
        .getByRole('textbox')).toHaveValue(returnedProduct.name)
    expect(within(screen.getByTestId('UpdateProductPopup__input-description'))
        .getByRole('textbox')).toHaveValue(returnedProduct.description)
    expect(within(screen.getByTestId('UpdateProductPopup__input-gitlabProjectId'))
        .getByRole('spinbutton')).toHaveValue(returnedProduct.gitlabProjectId)
})

test('<UpdateProductPopup /> - test edit product', () => {
    useDispatchMock().mockReturnValue({})
    getProductByIdMock.mockReturnValue(returnedProduct)

    render(<UpdateProductPopup id = {4} />)

    const name = 'My Edited Product'
    const gitlabProjectId = '15550'
    const description = 'New Description'

    const nameInput =  within(screen.getByTestId('UpdateProductPopup__input-name'))
        .getByRole('textbox')
    const descriptionInput =  within(screen.getByTestId('UpdateProductPopup__input-description'))
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
    expect(submitProductMock.mock.calls[0][0]).toEqual({ ...returnedProduct, name, description, gitlabProjectId })
})

test('<UpdateProductPopup /> - test close popup', () => {
    useDispatchMock().mockReturnValue({})
    getProductByIdMock.mockReturnValue(returnedProduct)
    render(<UpdateProductPopup id = {4}/>)

    fireEvent.click(screen.getByTestId('Popup__button-close'))

    expect(closePopupMock).toHaveBeenCalled()
})

test('<UpdateProductPopup /> -test error messaging product already exist', () => {
    useDispatchMock().mockReturnValue({})
    getProductByIdMock.mockReturnValue(returnedProduct)
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
