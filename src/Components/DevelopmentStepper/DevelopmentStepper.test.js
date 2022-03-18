import { render, screen } from 'Utilities/test-utils'
import { DevelopmentStepper } from './index'

describe('<DevelopmentStepper>', () => {

    test('should render', () => {
        render(<DevelopmentStepper completedIndex = {1}/>)

        expect(screen.getByTestId('DevelopmentStepper__icon-0')).toBeInTheDocument()
        expect(screen.getByTestId('DevelopmentStepper__icon-1')).toBeInTheDocument()
        expect(screen.getByTestId('DevelopmentStepper__icon-0')).toBeInTheDocument()

        expect(screen.getByTestId('DevelopmentStepper__connector-completed-true')).toBeInTheDocument()
        expect(screen.getByTestId('DevelopmentStepper__connector-completed-false')).toBeInTheDocument()
    })

})