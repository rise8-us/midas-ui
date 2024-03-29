import { fireEvent, render, screen } from 'Utilities/test-utils'
import { PersonaEntry } from './index'

describe('<PersonaEntry>', () => {
    const props = {
        title: 'title',
        description: 'description',
        hasEdit: true,
        isSupported: true,
        onUpdate: jest.fn,
        onDelete: jest.fn,
        onToggleIsSupported: jest.fn,
        onInfoClick: jest.fn
    }

    test('should show icons on edit', () => {
        render(<PersonaEntry {...props} />)

        fireEvent.mouseEnter(screen.getByTestId('DraggableRow__container'))

        expect(screen.queryByTestId('PersonaEntry__icon-person')).not.toBeInTheDocument()
        expect(screen.getByTestId('PersonaEntry__button-supported')).toBeInTheDocument()
    })

    test('should call onToggleIsSupported', () => {
        const onToggleIsSupportedMock = jest.fn()
        const newProps = { ...props, onToggleIsSupported: onToggleIsSupportedMock, isSupported: false }

        render(<PersonaEntry {...newProps}/>)

        fireEvent.mouseEnter(screen.getByTestId('DraggableRow__container'))
        fireEvent.click(screen.getByTestId('PersonaEntry__button-supported'))

        expect(onToggleIsSupportedMock).toHaveBeenCalled()
    })

    test('should call onInfoClick', () => {
        const onInfoClickMock = jest.fn()
        const newProps = { ...props, onInfoClick: onInfoClickMock }

        render(<PersonaEntry {...newProps}/>)

        fireEvent.mouseEnter(screen.getByTestId('DraggableRow__container'))
        fireEvent.click(screen.getByTestId('PersonaEntry__button-info'))

        expect(onInfoClickMock).toHaveBeenCalled()
    })

})