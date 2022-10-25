import { render, screen, useDispatchMock, useModuleMock, userEvent } from 'Utilities/test-utils'
import { ExpandAllEntities } from './index'

describe('<ExpandAllEntities />', () => {

    const setPortfolioPageGanttExpandAllMock =
        useModuleMock('Redux/AppSettings/reducer', 'setPortfolioPageGanttExpandAll')
    const selectPortfolioPageGanttAllExpandedMock =
        useModuleMock('Redux/AppSettings/selectors', 'selectPortfolioPageGanttAllExpanded')
    const setPortfolioPageSprintReportExpandAllMock =
        useModuleMock('Redux/AppSettings/reducer', 'setPortfolioPageSprintReportExpandAll')
    const selectPortfolioPageSprintReportAllExpandedMock =
        useModuleMock('Redux/AppSettings/selectors', 'selectPortfolioPageSprintReportAllExpanded')

    beforeEach(() => {
        useDispatchMock().mockReturnValue()
    })

    test('should render gantt - expanded', () => {
        selectPortfolioPageGanttAllExpandedMock.mockReturnValue(false)

        render(<ExpandAllEntities portfolioId = {0}/>)
        userEvent.click(screen.getByText('expand all'))

        expect(setPortfolioPageGanttExpandAllMock).toHaveBeenCalledWith({
            portfolioId: 0,
            isExpanded: true
        })
        expect(screen.getByText('expand all')).toBeInTheDocument()
    })

    test('should render gantt - collapsed', () => {
        selectPortfolioPageGanttAllExpandedMock.mockReturnValue(true)

        render(<ExpandAllEntities portfolioId = {0}/>)

        expect(screen.getByText('collapse all')).toBeInTheDocument()
    })

    test('should render sprint report - expanded', () => {
        selectPortfolioPageSprintReportAllExpandedMock.mockReturnValue(false)

        render(<ExpandAllEntities portfolioId = {0} type = {'SprintReport'}/>)
        userEvent.click(screen.getByText('expand all'))

        expect(setPortfolioPageSprintReportExpandAllMock).toHaveBeenCalledWith({
            portfolioId: 0,
            isExpanded: true
        })
        expect(screen.getByText('expand all')).toBeInTheDocument()
    })

    test('should render sprint report - collapsed', () => {
        selectPortfolioPageSprintReportAllExpandedMock.mockReturnValue(true)

        render(<ExpandAllEntities portfolioId = {0} type = {'SprintReport'}/>)

        expect(screen.getByText('collapse all')).toBeInTheDocument()
    })
})
