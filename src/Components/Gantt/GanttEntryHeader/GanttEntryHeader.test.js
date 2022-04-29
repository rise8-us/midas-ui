import { render, screen } from 'Utilities/test-utils'
import { GanttEntryHeader } from './index'

describe('<GanttEntryHeader />', () => {

    test('should render', () => {
        render(<GanttEntryHeader title = 'foo' dateRange = '2 Jan 2020'/>)

        expect(screen.getByText('foo')).toBeInTheDocument()
        expect(screen.getByText('2 Jan 2020')).toBeInTheDocument()
    })
})