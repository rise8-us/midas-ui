import { render, screen, userEvent } from 'Utilities/test-utils'
import { GanttExpandAllTargets } from './index'

describe('<GanttExpandAllTargets />', () => {

    test('should render', () => {
        const expandAll = jest.fn()

        render(<GanttExpandAllTargets expandAllTargets = {expandAll} allExpanded = {false}/>)

        userEvent.click(screen.getByTestId('GanttExpandAllTargets__button'))
        expect(expandAll).toBeCalledTimes(1)
    })
})