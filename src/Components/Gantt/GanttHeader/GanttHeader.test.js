import { render, screen } from 'Utilities/test-utils'
import { GanttHeader } from './index'

describe('<GanttHeader />', () => {
    const columns = [{ title: 'Jan', flexGrow: 1 }, { title: 'Dec' }]

    test('should render', () => {
        render(<GanttHeader columns = {columns} />)

        expect(screen.getByText('Jan')).toBeInTheDocument()
        expect(screen.getByText('Dec')).toBeInTheDocument()
    })
})
