import userEvent from '@testing-library/user-event'
import React from 'react'
import { fireEvent, render, screen, useDispatchMock, useModuleMock, within} from '../../../Utilities/test-utils'
import { CreateTagPopup } from './index'

describe('<CreateTagPopup />', () => {

    const closePopupMock = useModuleMock('Redux/Popups/actions', 'closePopup')
    const submitTagMock = useModuleMock('Redux/Tags/actions', 'requestCreateTag')

    test('should render properly', () => {
        render(<CreateTagPopup />)

        expect(screen.getByText('Create Tag')).toBeInTheDocument()
        expect(screen.getByTestId('CreateTagPopup__input-label')).toBeInTheDocument()
        expect(screen.getByTestId('CreateTagPopup__input-description')).toBeInTheDocument()
        expect(screen.getByTestId('CreateTagPopup__input-color')).toBeInTheDocument()
    })

    test('should execute onSubmit', () => {
        useDispatchMock().mockReturnValue({})
        render(<CreateTagPopup />)

        const label = 'My New Product'
        const color = '#e91e63'
        const description = 'Test Description'

        const labelInput =  within(screen.getByTestId('CreateTagPopup__input-label'))
            .getByRole('textbox')
        const descriptionInput =  within(screen.getByTestId('CreateTagPopup__input-description'))
            .getByRole('textbox')

        const colorPicker = screen.getByTitle('#e91e63')

        userEvent.type(labelInput, label)
        fireEvent.click(colorPicker)
        userEvent.type(descriptionInput, description)
        fireEvent.click(screen.getByText('Submit'))

        expect(submitTagMock).toHaveBeenCalledTimes(1)
        expect(submitTagMock.mock.calls[0][0]).toEqual({ label, color, description })

    })

    test('should close popup', () => {
        useDispatchMock().mockReturnValue({})
        render(<CreateTagPopup />)

        fireEvent.click(screen.getByTestId('Popup__button-close'))

        expect(closePopupMock).toHaveBeenCalled()
    })

    test('should display error messages', () => {
        const state = {
            errors: {
                'tag/create': [
                    'label',
                    'hex error'
                ]
            }
        }
        render(<CreateTagPopup />, { initialState: state })

        expect(screen.getByText('label')).toBeInTheDocument()
        expect(screen.getByText('hex error')).toBeInTheDocument()

    })

})