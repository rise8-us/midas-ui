import { render, screen, useDispatchMock, useModuleMock } from 'Utilities/test-utils'
import { PortfolioStatsPieChart } from './index'

const mockChartData = [
    {
        id: 1,
        title: 'one',
        labels: [
            'type::Feature'
        ]
    },
    {
        id: 2,
        title: 'two',
        labels: [
            'type::Bug'
        ]
    },
    {
        id: 3,
        title: 'three',
        labels: [
            'type::RandomType'
        ]
    },
    {
        id: 4,
        title: 'four',
        labels: []
    },
    {
        id: 5,
        title: 'five',
        labels: [
            'type::Bug'
        ]
    },
]

const mockTags = [
    {
        id: 4,
        label: 'type::Feature',
        color: '#ffeb3b'
    },
    {
        id: 5,
        label: 'type::Bug',
        color: '#ffeb3b'
    }
]

describe('<PortfolioStatsPieChart />', () => {
    const selectAllTagsMock = useModuleMock('Redux/Tags/selectors', 'selectAllTags')

    beforeEach(() => {
        useDispatchMock().mockResolvedValue({ payload: mockChartData })
        selectAllTagsMock.mockReturnValue(mockTags)
    })

    test('should render', async() => {
        render(<PortfolioStatsPieChart portfolioId = {1} dateRange = {[2, 3]}/>)
        expect(await screen.findByText('Feature', { ignore: 'title' })).toBeInTheDocument()
        expect(await screen.findByText('Bug', { ignore: 'title' })).toBeInTheDocument()
        expect(await screen.findByText('Other', { ignore: 'title' })).toBeInTheDocument()
        expect(await screen.findByText('Not Set', { ignore: 'title' })).toBeInTheDocument()
    })

})