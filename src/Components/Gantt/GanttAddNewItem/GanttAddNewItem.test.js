import EventConstants from 'Redux/Events/constants'
import MilestoneConstants from 'Redux/Milestones/constants'
import TargetConstants from 'Redux/Targets/constants'
import { render, screen, useDispatchMock, useModuleMock, userEvent } from 'Utilities/test-utils'
import { GanttAddNewItem } from './index'

describe('<GanttAddNewItem />', () => {

    const openPopupMock = useModuleMock('Redux/Popups/actions', 'openPopup')

    beforeEach(() => {
        useDispatchMock().mockReturnValue()
    })

    test('create new milestone', () => {
        render(<GanttAddNewItem portfolioId = {0} />)

        userEvent.click(screen.getByTestId('GanttAddNewItem__button'))
        userEvent.click(screen.getByText('Add Milestone'))

        expect(openPopupMock).toHaveBeenCalledWith(
            MilestoneConstants.CREATE_MILESTONE, 'MilestonePopup', { portfolioId: 0 }
        )
    })

    test.skip('create new event', () => {
        render(<GanttAddNewItem portfolioId = {0} />)

        userEvent.click(screen.getByTestId('GanttAddNewItem__button'))
        userEvent.click(screen.getByText('Add Event'))

        expect(openPopupMock).toHaveBeenCalledWith(
            EventConstants.CREATE_EVENT, 'EventPopup', { portfolioId: 0 }
        )
    })

    test('create new target', () => {
        render(<GanttAddNewItem portfolioId = {0} />)

        userEvent.click(screen.getByTestId('GanttAddNewItem__button'))
        userEvent.click(screen.getByText('Add Target'))

        expect(openPopupMock).toHaveBeenCalledWith(
            TargetConstants.CREATE_TARGET, 'TargetPopup', { portfolioId: 0 }
        )
    })
})