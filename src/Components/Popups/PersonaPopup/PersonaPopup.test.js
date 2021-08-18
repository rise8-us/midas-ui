import React from 'react'
import { fireEvent, render, screen, useDispatchMock, useModuleMock, userEvent } from 'Utilities/test-utils'
import { PersonaPopup } from './index'

describe('<PersonaPopup />', () => {

    const selectPersonaByIdMock = useModuleMock('Redux/Personas/selectors', 'selectPersonaById')
    const requestCreatePersonaMock = useModuleMock('Redux/Personas/actions', 'requestCreatePersona')
    const requestUpdatePersonaMock = useModuleMock('Redux/Personas/actions', 'requestUpdatePersona')
    const closePopupMock = useModuleMock('Redux/Popups/actions', 'closePopup')

    beforeEach(() => {
        useDispatchMock().mockReturnValue({})
        selectPersonaByIdMock.mockReturnValue({
            title: '',
            description: '',
            isSupported: false
        })
    })

    test('should render', () => {
        render(<PersonaPopup id = {null} index = {0} productId = {1}/>)

        expect(screen.getByText(/Persona/i)).toBeInTheDocument()
        expect(screen.getByText('Title')).toBeInTheDocument()
        expect(screen.getByText('Description')).toBeInTheDocument()
    })

    test('should close', () => {
        render(<PersonaPopup id = {null} index = {0} productId = {1}/>)

        fireEvent.click(screen.getByTestId('Popup__button-cancel'))

        expect(closePopupMock).toHaveBeenCalled()
    })

    test('should fire create persona', () => {
        render(<PersonaPopup id = {null} index = {0} productId = {1}/>)

        fireEvent.click(screen.getByTestId('Popup__button-submit'))

        expect(requestCreatePersonaMock).toHaveBeenCalled()
    })

    test('should handle updates and dispatch', () => {
        const title = 'guy with sunglasses'
        const description = 'goose'
        selectPersonaByIdMock.mockReturnValue({
            id: 1,
            title: title,
            description: description,
            isSupported: false
        })

        render(<PersonaPopup id = {1} index = {0} productId = {1}/>)

        userEvent.type(screen.getByDisplayValue(title), ' and swag')
        userEvent.type(screen.getByDisplayValue(description), ' with a waddle')
        fireEvent.click(screen.getByTestId('Popup__button-submit'))

        expect(requestUpdatePersonaMock).toHaveBeenCalledWith({
            id: 1,
            title: 'guy with sunglasses and swag',
            description: 'goose with a waddle',
            productId: 1,
            isSupported: false,
            index: 0
        })
    })

})