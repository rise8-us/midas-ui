import React from 'react'
import { fireEvent, render, screen, useDispatchMock, useModuleMock, userEvent } from 'Utilities/test-utils'
import { ProductUserPersonas } from './index'

describe('<ProductUserPersonas>', () => {
    const selectPersonasByProductId = useModuleMock('Redux/Personas/selectors', 'selectPersonasByProductId')
    const requestCreatePersonaMock = useModuleMock('Redux/Personas/actions', 'requestCreatePersona')
    const requestUpdatePersonaMock = useModuleMock('Redux/Personas/actions', 'requestUpdatePersona')
    const requestUpdatePersonasBulkMock = useModuleMock('Redux/Personas/actions', 'requestUpdatePersonasBulk')
    const requestDeletePersonaMock = useModuleMock('Redux/Personas/actions', 'requestDeletePersona')

    const onDragEndMock = useModuleMock('Utilities/draggable', 'onDragEnd')

    const personas = [
        {
            id: 1,
            productId: 3,
            title: 'persona 1',
            isSupported: true,
            index: 0
        }, {
            id: 2,
            productId: 3,
            title: 'persona 2',
            isSupported: true,
            index: 1
        }, {
            id: 4,
            productId: 3,
            title: 'persona 3',
            isSupported: false,
            index: 2
        }
    ]

    const newPersonaOrder = [
        { ...personas[2], index: 0 },
        personas[1],
        { ...personas[0], index: 2 }
    ]

    beforeEach(() => {
        useDispatchMock().mockReturnValue({})
    })

    test('should render', () => {
        selectPersonasByProductId.mockReturnValue(personas)

        render(<ProductUserPersonas productId = {3}/>)

        expect(screen.getByText('PERSONAS')).toBeInTheDocument()
        expect(screen.getByDisplayValue('persona 1')).toBeInTheDocument()
        expect(screen.getByDisplayValue('persona 2')).toBeInTheDocument()
        expect(screen.getByDisplayValue('persona 3')).toBeInTheDocument()
    })

    test('should call createPersona', () => {
        selectPersonasByProductId.mockReturnValue([personas[0]])

        render(<ProductUserPersonas productId = {3} hasEdit/>)

        userEvent.type(screen.getByPlaceholderText('Add new user persona...'), 'a new thing{enter}')

        expect(requestCreatePersonaMock).toHaveBeenCalled()
    })

    test('should call updatePersona', () => {
        selectPersonasByProductId.mockReturnValue([personas[0]])

        render(<ProductUserPersonas productId = {3} hasEdit/>)

        userEvent.type(screen.getByDisplayValue('persona 1'), '!{enter}')

        expect(requestUpdatePersonaMock).toHaveBeenCalledWith({
            ...personas[0],
            title: '!'
        })
    })

    test('should call toggleIsSupported', () => {
        selectPersonasByProductId.mockReturnValue([personas[0]])

        render(<ProductUserPersonas productId = {3} hasEdit/>)

        fireEvent.mouseEnter(screen.getByTestId('DraggableRow__container'))
        fireEvent.click(screen.getByTestId('PersonaEntry__button-supported'))

        expect(requestUpdatePersonaMock).toHaveBeenCalledWith({
            ...personas[0],
            isSupported: false
        })
    })

    test('should call deletePersona', () => {
        selectPersonasByProductId.mockReturnValue([personas[0]])

        render(<ProductUserPersonas productId = {3} hasEdit/>)

        fireEvent.mouseEnter(screen.getByTestId('DraggableRow__container'))
        fireEvent.click(screen.getByTitle('Delete'))

        expect(requestDeletePersonaMock).toHaveBeenCalled()
    })

    test('should call updatePersonasBulk', () => {
        selectPersonasByProductId.mockReturnValue(personas)
        onDragEndMock.mockImplementation((_a, _b, passedThroughFn) => {
            passedThroughFn(newPersonaOrder)
        })

        render(<ProductUserPersonas productId = {3} hasEdit/>)

        const entries = screen.getAllByTestId('DraggablePersonaList__draggable')

        fireEvent.mouseDown(entries[2])
        fireEvent.mouseMove(entries[2], { clientX: 5, clientY: 5 })
        fireEvent.mouseUp(entries[2])
        fireEvent.dragEnd(entries[2])

        expect(requestUpdatePersonasBulkMock).toHaveBeenCalledWith(newPersonaOrder)
    })

    test('should focus new persona input on icon click', () => {
        selectPersonasByProductId.mockReturnValue([personas[0]])

        render(<ProductUserPersonas productId = {3} hasEdit/>)

        fireEvent.click(screen.getByTitle('Add Persona'))

        expect(screen.queryByPlaceholderText('Add new user persona...')).toHaveFocus()
    })
})