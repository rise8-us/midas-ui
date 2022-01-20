import React from 'react'
import { fireEvent, render, screen } from 'Utilities/test-utils'
import { DeliverableEntry } from './index'

describe('<DeliverableEntry>', () => {

    test('should render', () => {
        render(<DeliverableEntry
            title = 'title'
            hasEdit = {false}
            onUpdate = {jest.fn}
            onDelete = {jest.fn}
        />)

        fireEvent.mouseEnter(screen.getByTestId('DraggableRow__container'))

        expect(screen.getByTestId('DeliverableEntry__empty-div')).toBeInTheDocument()
    })

})