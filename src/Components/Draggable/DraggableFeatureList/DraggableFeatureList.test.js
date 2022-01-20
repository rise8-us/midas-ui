import React from 'react'
import { render, screen } from 'Utilities/test-utils'
import { DraggableFeatureList } from './index'

describe('<DraggableFeatureList />', () => {

    const commonProps = {
        features: [],
        onUpdate: jest.fn,
        onDelete: jest.fn
    }

    test('should render no features text', () => {
        render(<DraggableFeatureList hasEdit = {false} {...commonProps}/>)

        expect(screen.getByText('No Features added yet.')).toBeInTheDocument()
    })

    test('should not render no features text', () => {
        render(<DraggableFeatureList hasEdit = {true} {...commonProps}/>)

        expect(screen.queryByText('No Features added yet.')).not.toBeInTheDocument()
    })

})