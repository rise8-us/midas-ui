import { render, screen } from 'Utilities/test-utils'
import { GanttView } from './index'

describe('<GanttTarget />', () => {

    test('should render', () => {
        const onChangeMock = jest.fn()
        render(<GanttView onChange = {onChangeMock}/>)
        expect(screen.getByText('6M')).toBeInTheDocument()
        expect(screen.getByText('1YR')).toBeInTheDocument()
        expect(screen.getByText('3YR')).toBeInTheDocument()
    })
})