import { getMonthAbbreviated } from 'Utilities/dateHelpers'
import { render, screen, useDispatchMock, useModuleMock, userEvent } from 'Utilities/test-utils'
import { EntriesContainer } from './index'

describe('<EntriesContainer />', () => {

    const selectMilestonesByPortfolioIdMock =
        useModuleMock('Redux/Milestones/selectors', 'selectMilestonesByPortfolioId')
    const selectEventsByPortfolioIdMock =
        useModuleMock('Redux/Events/selectors', 'selectEventsByPortfolioId')
    const selectTargetsByPortfolioIdMock =
        useModuleMock('Redux/Targets/selectors', 'selectTargetsByPortfolioId')
    const selectPortfolioPagePermissionMock =
        useModuleMock('Redux/PageAccess/selectors', 'selectPortfolioPagePermission')

    beforeEach(() => {
        useDispatchMock().mockReturnValue()
        selectMilestonesByPortfolioIdMock.mockReturnValue([])
        selectEventsByPortfolioIdMock.mockReturnValue([])
        selectTargetsByPortfolioIdMock.mockReturnValue([])
        selectPortfolioPagePermissionMock.mockReturnValue({})
    })

    test('should render without edit', () => {
        render(<EntriesContainer portfolioId = {0} />)

        expect(screen.queryByTestId('GanttAddNewItem__button')).not.toBeInTheDocument()
    })

    test('should render with edit', () => {
        selectPortfolioPagePermissionMock.mockReturnValue({ edit: true })
        render(<EntriesContainer portfolioId = {0} />)

        expect(screen.getByTestId('GanttAddNewItem__button')).toBeInTheDocument()
    })

    test('should change scope', () => {
        render(<EntriesContainer portfolioId = {0} />)

        expect(screen.getByTestId('GanttHeader__wrap').getElementsByTagName('div').length).toEqual(6)

        userEvent.click(screen.getByTestId('GanttView__button-scope-1YR'))
        expect(screen.getByTestId('GanttHeader__wrap').getElementsByTagName('div').length).toEqual(12)

        userEvent.click(screen.getByTestId('GanttView__button-scope-3YR'))
        expect(screen.getByTestId('GanttHeader__wrap').getElementsByTagName('div').length).toEqual(3)

        userEvent.click(screen.getByTestId('GanttView__button-scope-6M'))
        expect(screen.getByTestId('GanttHeader__wrap').getElementsByTagName('div').length).toEqual(6)
    })

    test('should show correct columns for 6M scope', () => {
        render(<EntriesContainer portfolioId = {0} />)

        let currDate = new Date()
        let startDate = new Date(currDate.getFullYear(), currDate.getMonth() - 2, currDate.getDay())
        let endDate = new Date(currDate.getFullYear(), currDate.getMonth() + 3, currDate.getDay())

        let startYearText = ' \'' + startDate.getYear().toString().slice(-2)

        expect(screen.getByTestId('GanttHeader__column-0').textContent)
            .toContain(getMonthAbbreviated(startDate.getMonth()) + startYearText)
        expect(screen.getByTestId('GanttHeader__column-5').textContent)
            .toContain(getMonthAbbreviated(endDate.getMonth()))
    })

    test('should show correct columns for 1YR scope', () => {
        render(<EntriesContainer portfolioId = {0} />)

        let currDate = new Date()
        let startDate = new Date(currDate.getFullYear(), currDate.getMonth() - 4, currDate.getDay())
        let endDate = new Date(currDate.getFullYear(), currDate.getMonth() + 7, currDate.getDay())

        let startYearText = ' \'' + startDate.getYear().toString().slice(-2)

        userEvent.click(screen.getByTestId('GanttView__button-scope-1YR'))

        expect(screen.getByTestId('GanttHeader__column-0').textContent)
            .toContain(getMonthAbbreviated(startDate.getMonth()) + startYearText)
        expect(screen.getByTestId('GanttHeader__column-11').textContent)
            .toContain(getMonthAbbreviated(endDate.getMonth()))
    })

    test('should show correct columns for 3YR scope', () => {
        render(<EntriesContainer portfolioId = {0} />)

        let currDate = new Date()

        userEvent.click(screen.getByTestId('GanttView__button-scope-3YR'))

        expect(screen.getByTestId('GanttHeader__column-0').textContent)
            .toContain(`${currDate.getUTCFullYear() - 1}`)
        expect(screen.getByTestId('GanttHeader__column-2').textContent)
            .toContain(`${currDate.getUTCFullYear() + 1}`)
    })

})