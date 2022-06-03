import { render, screen, useDispatchMock, useModuleMock, userEvent } from 'Utilities/test-utils'
import { GanttExpandAllTargets } from './index'

describe('<GanttExpandAllTargets />', () => {

    const setPortfolioPageSettingExpandAllMock =
        useModuleMock('Redux/AppSettings/reducer', 'setPortfolioPageSettingExpandAll')
    const selectPortfolioPageSettingAllExpandedMock =
        useModuleMock('Redux/AppSettings/selectors', 'selectPortfolioPageSettingAllExpanded')

    beforeEach(() => {
        useDispatchMock().mockReturnValue()
    })

    test('should render - expanded', () => {
        selectPortfolioPageSettingAllExpandedMock.mockReturnValue(false)

        render(<GanttExpandAllTargets portfolioId = {0}/>)
        userEvent.click(screen.getByText('expand all'))

        expect(setPortfolioPageSettingExpandAllMock).toHaveBeenCalledWith({
            portfolioId: 0,
            isExpanded: true
        })
        expect(screen.getByText('expand all')).toBeInTheDocument()
    })

    test('should render - collapsed', () => {
        selectPortfolioPageSettingAllExpandedMock.mockReturnValue(true)

        render(<GanttExpandAllTargets portfolioId = {0}/>)

        expect(screen.getByText('collapse all')).toBeInTheDocument()
    })
})