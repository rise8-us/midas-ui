import { fireEvent, render, screen, useDispatchMock, useModuleMock } from 'Utilities/test-utils'
import { GanttView } from './index'

describe('<GanttView />', () => {

    const selectPortfolioPageSettingViewMock =
        useModuleMock('Redux/AppSettings/selectors', 'selectPortfolioPageSettingView')
    const setPortfolioPageSettingMock = useModuleMock('Redux/AppSettings/reducer', 'setPortfolioPageSetting')

    const defaultView = { title: '6M', viewBy: 'month', scope: 6, leadingColumns: 2 }

    test('should render', () => {
        selectPortfolioPageSettingViewMock.mockReturnValue(defaultView)

        render(<GanttView portfolioId = {1}/>)

        expect(screen.getByText('6M')).toBeInTheDocument()
        expect(screen.getByText('1YR')).toBeInTheDocument()
        expect(screen.getByText('3YR')).toBeInTheDocument()
    })

    test('should handle view change', () => {
        useDispatchMock().mockReturnValue({})
        selectPortfolioPageSettingViewMock.mockReturnValue(defaultView)

        render(<GanttView portfolioId = {1}/>)
        fireEvent.click(screen.getByTestId('GanttView__button-scope-1YR'))

        expect(setPortfolioPageSettingMock).toHaveBeenCalledWith({
            id: 1,
            settingName: 'view',
            settingValue: expect.objectContaining({
                title: '1YR'
            })
        })
    })
})