import { render, screen } from 'Utilities/test-utils'
import { GanttTargetHeader } from './index'

describe('<GanttTargetHeader />', () => {

    test('should render', () => {
        render(<GanttTargetHeader title = 'foo' dateRange = '2 Jan 2020'/>)

        expect(screen.getByText('foo')).toBeInTheDocument()
        expect(screen.getByText('2 Jan 2020')).toBeInTheDocument()
    })
})