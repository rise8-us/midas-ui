import { render, screen, useDispatchMock, userEvent } from 'Utilities/test-utils'
import { GanttFilter } from './index'

describe('<GanttFilter />', () => {

    test('should render and check', async() => {
        useDispatchMock().mockResolvedValue({ type: '/', payload: [{ isPriority: true }] })

        render(<GanttFilter />)

        userEvent.click(screen.getByTestId('FilterListIcon'))
        userEvent.click(screen.getByTestId('TooltipOptions__checkbox-0'))

        expect(await screen.findByTestId('CheckBoxIcon')).toBeInTheDocument()
    })

})