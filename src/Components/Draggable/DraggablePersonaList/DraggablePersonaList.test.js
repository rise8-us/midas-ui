import { render, screen } from 'Utilities/test-utils'
import { DraggablePersonaList } from './index'

describe('<DraggablePersonaList />', () => {

    const commonProps = {
        hasEdit: true,
        personas: [],
        onUpdate: jest.fn,
        onDelete: jest.fn,
        onInfoClick: jest.fn,
        onToggleIsSupported: jest.fn
    }

    test('should render no personas text', () => {
        render(<DraggablePersonaList {...commonProps}/>)

        expect(screen.getByText('No Personas added yet.')).toBeInTheDocument()
    })

})