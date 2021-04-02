import React from 'react'
import {
    fireEvent, render, screen, useDispatchMock, useModuleMock, userEvent, within
} from '../../../Utilities/test-utils'
import { UpdateTagPopup } from './index'

describe('<UpdateTagPopup />', () => {

    const closePopupMock = useModuleMock('Redux/Popups/actions', 'closePopup')
    const submitTagMock = useModuleMock('Redux/Tags/actions', 'requestUpdateTag')
    const getTagMock = useModuleMock('Redux/Tags/selectors', 'selectTagById')

    const returnedTag = {
        id: 4,
        label: 'My New Tag',
        color: '#696696',
        description: 'Test Description'
    }

    beforeEach(() => {
        useDispatchMock().mockReturnValue({})
        getTagMock.mockReturnValue(returnedTag)
    })

    test('should render properly', () => {
        render(<UpdateTagPopup id = {4}/>)

        expect(screen.getByText('Update Tag')).toBeInTheDocument()
        expect(within(screen.getByTestId('UpdateTagPopup__input-label'))
            .getByRole('textbox')).toHaveValue(returnedTag.label)
        expect(within(screen.getByTestId('UpdateTagPopup__input-description'))
            .getByRole('textbox')).toHaveValue(returnedTag.description)
        expect(within(screen.getByTestId('ColorPicker__input-color'))
            .getByRole('textbox')).toHaveValue(returnedTag.color)
    })

    test('should call onSubmit', () => {
        render(<UpdateTagPopup id = {4} />)

        const label = 'My Edited Tag'
        const color = '#e91e63'
        const description = 'New Description'

        const labelInput = within(screen.getByTestId('UpdateTagPopup__input-label'))
            .getByRole('textbox')
        const descriptionInput = within(screen.getByTestId('UpdateTagPopup__input-description'))
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

        expect(submitTagMock).toHaveBeenCalledTimes(1)
        expect(submitTagMock.mock.calls[0][0]).toEqual({ ...returnedTag, label, description, color })
    })

    test('should close popup', () => {
        render(<UpdateTagPopup id = {4}/>)

        fireEvent.click(screen.getByTestId('Popup__button-close'))

        expect(closePopupMock).toHaveBeenCalled()
    })

    test('should display error message', () => {
        const state = {
            errors: {
                'tag/create': [
                    'label',
                    'hex error'
                ]
            }
        }
        render(<UpdateTagPopup id = {4} />, { initialState: state })

        expect(screen.getByText('label')).toBeInTheDocument()
        expect(screen.getByText('hex error')).toBeInTheDocument()
    })
})