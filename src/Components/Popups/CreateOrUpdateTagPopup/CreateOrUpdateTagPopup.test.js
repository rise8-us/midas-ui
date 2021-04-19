import React from 'react'
import {
    fireEvent, render, screen, useDispatchMock, useModuleMock, userEvent, within
} from '../../../Utilities/test-utils'
import { CreateOrUpdateTagPopup } from './index'

describe('<CreateOrUpdateTagPopup />', () => {

    const closePopupMock = useModuleMock('Redux/Popups/actions', 'closePopup')
    const submitTagMock = useModuleMock('Redux/Tags/actions', 'requestCreateTag')
    const submitTagMockUpdate = useModuleMock('Redux/Tags/actions', 'requestUpdateTag')
   

    const returnedTag = {
        id: 4,
        label: 'My Tag',
        color: '#696696',
        description: 'Description'
    }

   
    test('should render properly', () => {
        render(<CreateOrUpdateTagPopup />)

        expect(screen.getByText('Create Tag')).toBeInTheDocument()
        expect(screen.getByTestId('CreateOrUpdateTagPopup__input-label')).toBeInTheDocument()
        expect(screen.getByTestId('CreateOrUpdateTagPopup__input-description')).toBeInTheDocument()
        expect(screen.getByTestId('ColorPicker__input-color')).toBeInTheDocument()
    })

    test('should execute onSubmit', () => {
        useDispatchMock().mockReturnValue({})
        render(<CreateOrUpdateTagPopup />)

        const label = 'My New Tag'
        const color = '#e91e63'
        const description = 'Test Description'

        const labelInput = within(screen.getByTestId('CreateOrUpdateTagPopup__input-label'))
            .getByRole('textbox')
        const descriptionInput = within(screen.getByTestId('CreateOrUpdateTagPopup__input-description'))
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
        render(<CreateOrUpdateTagPopup />)

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
        render(<CreateOrUpdateTagPopup />, { initialState: state })

        expect(screen.getByText('label')).toBeInTheDocument()
        expect(screen.getByText('hex error')).toBeInTheDocument()

    })

    test('should call onSubmit to Update tag', () => {
        const getTagMock = useModuleMock('Redux/Tags/selectors', 'selectTagById')
        useDispatchMock().mockReturnValue({})
        getTagMock.mockReturnValue(returnedTag)
        render(<CreateOrUpdateTagPopup id = {4} />)

        const label = 'My Edited Tag'
        const color = '#e91e63'
        const description = 'New Description'

        const labelInput = within(screen.getByTestId('CreateOrUpdateTagPopup__input-label'))
            .getByRole('textbox')
        const descriptionInput = within(screen.getByTestId('CreateOrUpdateTagPopup__input-description'))
            .getByRole('textbox')
        const colorInput = within(screen.getByTestId('ColorPicker__input-color'))
            .getByRole('textbox')
        const colorPicker = screen.getByTitle('#e91e63')

        userEvent.clear(descriptionInput)
        userEvent.clear(colorInput)
        userEvent.clear(labelInput)

        userEvent.type(descriptionInput, description)
        fireEvent.click(colorPicker)
        userEvent.type(labelInput, label)
        fireEvent.click(screen.getByText('Submit'))

        expect(submitTagMockUpdate).toHaveBeenCalledTimes(1)
        expect(submitTagMockUpdate.mock.calls[0][0]).toEqual({ ...returnedTag, label, description, color })
    })


})