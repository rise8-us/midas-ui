import React from 'react'
import { fireEvent, render, screen } from 'Utilities/test-utils'
import { FeatureEntry } from './index'

describe('<FeatureEntry>', () => {

    test('should render', () => {
        render(<FeatureEntry
            title = 'title'
            hasEdit = {false}
            onUpdate = {jest.fn}
            onDelete = {jest.fn}
        />)

        fireEvent.mouseEnter(screen.getByTestId('DraggableRow__container'))

        expect(screen.getByTestId('FeatureEntry__icon-checkmark')).toBeInTheDocument()
    })

})