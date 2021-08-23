import React from 'react'
import { fireEvent, render, screen, useDispatchMock, useModuleMock } from 'Utilities/test-utils'
import { ProductUserPersonas } from './index'

describe('<ProductUserPersonas>', () => {
    const selectPersonasByProductIdMock = useModuleMock('Redux/Personas/selectors', 'selectPersonasByProductId')
    const requestUpdatePersonaMock = useModuleMock('Redux/Personas/actions', 'requestUpdatePersona')
    const requestDeletePersonaMock = useModuleMock('Redux/Personas/actions', 'requestDeletePersona')
    const openPopupMock = useModuleMock('Redux/Popups/actions', 'openPopup')

    beforeEach(() => {
        selectPersonasByProductIdMock.mockReturnValue([
            {
                id: 1,
                productId: 3,
                isSupported: true,
                title: 'persona 1',
                index: 0
            }, {
                id: 2,
                productId: 3,
                isSupported: false,
                title: 'persona 2',
                index: 1
            }
        ])
        useDispatchMock().mockReturnValue({})
    })

    test('should render', () => {
        render(<ProductUserPersonas productId = {1}/>)
    })

    test('should call openPopup on Add', () => {
        render(<ProductUserPersonas productId = {1} hasEditAccess />)

        fireEvent.click(screen.getByTitle('add'))

        expect(openPopupMock).toHaveBeenCalled()
    })

    test('should call openPopup for editing', () => {
        render(<ProductUserPersonas productId = {1} hasEditAccess />)

        fireEvent.click(screen.getByText('persona 1'))

        expect(openPopupMock).toHaveBeenCalled()
    })

    test('should call delete on trashcan', () => {
        render(<ProductUserPersonas productId = {1} hasEditAccess />)

        fireEvent.click(screen.getAllByTitle('delete')[0])

        expect(requestDeletePersonaMock).toHaveBeenCalled()
    })

    test('should call update on person', () => {
        render(<ProductUserPersonas productId = {1} hasEditAccess />)

        fireEvent.click(screen.getAllByTitle('supported')[0])

        expect(requestUpdatePersonaMock).toHaveBeenCalled()
    })

})