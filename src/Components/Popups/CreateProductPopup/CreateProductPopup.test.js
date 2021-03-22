import userEvent from '@testing-library/user-event'
import React from 'react'
import { fireEvent, render, screen, useDispatchMock, useModuleMock, within } from '../../../Utilities/test-utils'
import { CreateProductPopup } from './index'

const closePopupMock = useModuleMock('Redux/Popups/actions', 'closePopup')
const submitProductMock = useModuleMock('Redux/Products/actions', 'requestCreateProduct')

test('<CreateProductPopup /> - test component renders properly', () => {
    render(<CreateProductPopup />)

    expect(screen.getByText('Create New Product')).toBeInTheDocument()
    expect(screen.getByTestId('CreateProductPopup__input-name')).toBeInTheDocument()
    expect(screen.getByTestId('CreateProductPopup__input-description')).toBeInTheDocument()
    expect(screen.getByTestId('CreateProductPopup__input-gitlabProjectId')).toBeInTheDocument()
})

test('<CreateProductPopup /> - test submit team',  () => {
    useDispatchMock().mockReturnValue({})
    render(<CreateProductPopup />)

    const name = 'My New Product'
    const gitlabProjectId = '1234567'
    const description = 'Test Description'

    const nameInput =  within(screen.getByTestId('CreateProductPopup__input-name'))
        .getByRole('textbox')
    const descriptionInput =  within(screen.getByTestId('CreateProductPopup__input-description'))
        .getByRole('textbox')
    const gitlabProjectIdInput = within(screen.getByTestId('CreateProductPopup__input-gitlabProjectId'))
        .getByRole('spinbutton')

    userEvent.type(nameInput, name)
    userEvent.type(gitlabProjectIdInput, gitlabProjectId)
    userEvent.type(descriptionInput, description)
    fireEvent.click(screen.getByText('Submit'))

    expect(submitProductMock).toHaveBeenCalledTimes(1)
    expect(submitProductMock.mock.calls[0][0]).toEqual({ name, gitlabProjectId, description })
})

test('<CreateProduct /> - test close popup', () => {
    useDispatchMock().mockReturnValue({})
    render(<CreateProductPopup />)

    fireEvent.click(screen.getByTestId('Popup__button-close'))

    expect(closePopupMock).toHaveBeenCalled()
})

test('<CreateProduct /> -test error messaging', () => {
    const state = {
        errors: {
            'products/createOne': [
                'name error',
                'Gitlab error'
            ]
        }
    }
    render(<CreateProductPopup />, { initialState: state })

    expect(screen.getByText('name error')).toBeInTheDocument()
    expect(screen.getByText('Gitlab error')).toBeInTheDocument()

})

