import React from 'react'
import { fireEvent, render, screen, userEvent } from 'Utilities/test-utils'
import { DraggableRow } from './index'

describe('<DraggableRow>', () => {
    const props = {
        title: 'title',
        hasEdit: true,
        onUpdate: jest.fn,
        onDelete: jest.fn
    }

    test('should render readonly', () => {
        const newProps = { ...props, hasEdit: false }

        render(<DraggableRow {...newProps} tooltipText = 'test'/>)

        fireEvent.mouseEnter(screen.getByTestId('DraggableRow__container'))

        expect(screen.getByDisplayValue(/title/)).toBeInTheDocument()
        expect(screen.queryByTestId('DraggableRow__icon-drag')).not.toBeInTheDocument()
        expect(screen.queryByTestId('DraggableRow__button-delete')).not.toBeInTheDocument()
    })

    test('should show icons on edit', () => {
        render(<DraggableRow {...props} />)

        fireEvent.mouseEnter(screen.getByTestId('DraggableRow__container'))

        expect(screen.getByTestId('DraggableRow__icon-drag')).toBeInTheDocument()
        expect(screen.getByTestId('DraggableRow__button-delete')).toBeInTheDocument()

        fireEvent.mouseLeave(screen.getByTestId('DraggableRow__container'))
        expect(screen.queryByTestId('DraggableRow__icon-drag')).not.toBeInTheDocument()
    })

    test('should call onUpdate', () => {
        const onUpdateMock = jest.fn()
        const newProps = { ...props, onUpdate: onUpdateMock }

        render(<DraggableRow {...newProps}/>)

        userEvent.type(screen.getByDisplayValue('title'), 'et al{enter}')

        expect(screen.getByDisplayValue('et al')).toBeInTheDocument()
        expect(onUpdateMock).toHaveBeenCalledWith('et al')
    })

    test('should call onDelete', () => {
        const onDeleteMock = jest.fn()
        const newProps = { ...props, onDelete: onDeleteMock }

        render(<DraggableRow {...newProps}/>)

        fireEvent.mouseEnter(screen.getByTestId('DraggableRow__container'))
        fireEvent.click(screen.getByTestId('DraggableRow__button-delete'))

        expect(onDeleteMock).toHaveBeenCalled()
    })

})