import React from 'react'
import { render, screen } from 'Utilities/test-utils'
import { DraggablePersonaList } from './index'

describe('<DraggablePersonaList />', () => {

    const commonProps = {
        personas: [],
        onUpdate: jest.fn,
        onDelete: jest.fn,
        onToggleIsSupported: jest.fn
    }

    test('should render render no personas text', () => {
        render(<DraggablePersonaList hasEdit = {false} {...commonProps}/>)

        expect(screen.getByText('No Personas added yet.')).toBeInTheDocument()
    })

    test('should not render render no personas text', () => {
        render(<DraggablePersonaList hasEdit = {true} {...commonProps}/>)

        expect(screen.queryByText('No Personas added yet.')).not.toBeInTheDocument()
    })

})