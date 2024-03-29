import { render, screen } from 'Utilities/test-utils'
import { SonarqubeIndicator } from './index'

describe('<SonarqubeIndicator />', () => {

    const checkLogic = (value, color) => {
        expect(screen.getByText(value)).toBeInTheDocument()
        expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow',
            typeof value === 'number' ? value.toString() : '100')
        expect(screen.getByRole('progressbar')).toHaveStyle(`color: ${color}`)
    }

    test('should handle above 80%', () => {
        render(<SonarqubeIndicator title = 'test' value = {80}/>)

        expect(screen.getByText('test')).toBeInTheDocument()
        checkLogic(80, 'rgb(102, 187, 106)')
    })

    test('should handle between 55 & 80%', () => {
        render(<SonarqubeIndicator value = {55}/>)

        checkLogic(55, 'rgb(255, 167, 38)')
    })

    test('should handle below 55%', () => {
        render(<SonarqubeIndicator value = {54}/>)

        checkLogic(54, 'rgb(244, 67, 54)')
    })

    test('should handle A', () => {
        render(<SonarqubeIndicator value = {'A'}/>)

        checkLogic('A', 'rgb(102, 187, 106)')
    })

    test('should handle B', () => {
        render(<SonarqubeIndicator value = {'B'}/>)

        checkLogic('B', 'rgb(255, 167, 38)')
    })

    test('should handle C', () => {
        render(<SonarqubeIndicator value = {'C'}/>)

        checkLogic('C', 'rgb(255, 167, 38)')
    })
    test('should handle D', () => {
        render(<SonarqubeIndicator value = {'D'}/>)

        checkLogic('D', 'rgb(244, 67, 54)')
    })

    test('should handle E', () => {
        render(<SonarqubeIndicator value = {'E'}/>)

        checkLogic('E', 'rgb(244, 67, 54)')
    })

    test('should handle U', () => {
        render(<SonarqubeIndicator value = {'U'}/>)

        checkLogic('U', 'rgb(41, 182, 246)')
    })
})