import React from 'react'
import { fireEvent, render, screen, userEvent } from 'Utilities/test-utils'
import { FeatureEntry } from './index'

describe('<FeatureEntry>', () => {
    const props = {
        title: 'title',
        hasEdit: true,
        onUpdate: jest.fn,
        onDelete: jest.fn
    }

    test('should render', () => {
        render(<FeatureEntry
            title = 'cool title bro'
            hasEdit = {false}
            onUpdate = {jest.fn}
            onDelete = {jest.fn}
        />)

        fireEvent.mouseEnter(screen.getByTestId('FeatureEntry__container'))

        expect(screen.getByDisplayValue(/cool title bro/)).toBeInTheDocument()
        expect(screen.queryByTestId('FeatureEntry__icon-drag')).not.toBeInTheDocument()
    })

    test('should show icons on edit', () => {
        render(<FeatureEntry {...props} />)

        fireEvent.mouseEnter(screen.getByTestId('FeatureEntry__container'))

        expect(screen.getByDisplayValue('title')).toBeInTheDocument()
        expect(screen.getByTestId('FeatureEntry__icon-drag')).toBeInTheDocument()
        expect(screen.queryByTestId('FeatureEntry__icon-checkmark')).not.toBeInTheDocument()
        expect(screen.getByTestId('FeatureEntry__button-delete')).toBeInTheDocument()

        fireEvent.mouseLeave(screen.getByTestId('FeatureEntry__container'))
        expect(screen.getByTestId('FeatureEntry__icon-checkmark')).toBeInTheDocument()
        expect(screen.queryByTestId('FeatureEntry__icon-drag')).not.toBeInTheDocument()
    })

    test('should call onUpdate', () => {
        const onUpdateMock = jest.fn()
        const newProps = { ...props, onUpdate: onUpdateMock }

        render(<FeatureEntry {...newProps}/>)

        userEvent.type(screen.getByDisplayValue('title'), 'et al{enter}')

        expect(screen.getByDisplayValue('et al')).toBeInTheDocument()
        expect(onUpdateMock).toHaveBeenCalledWith('et al')
    })

    test('should call onDelete', () => {
        const onDeleteMock = jest.fn()
        const newProps = { ...props, onDelete: onDeleteMock }

        render(<FeatureEntry {...newProps}/>)

        fireEvent.mouseEnter(screen.getByTestId('FeatureEntry__container'))
        fireEvent.click(screen.getByTestId('FeatureEntry__button-delete'))

        expect(onDeleteMock).toHaveBeenCalled()
    })

})