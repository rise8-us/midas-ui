import { fireEvent, render, screen, useDispatchMock, useModuleMock } from 'Utilities/test-utils'
import { CodeCoverageTooltip } from './index'

describe('<CodeCoverageTooltip />', () => {

    const requestSearchCoveragesMock = useModuleMock('Redux/Coverages/actions', 'requestSearchCoverages')

    const mockResponsePage0 = [
        { creationDate: '2021-01-01T00:12:34', pipelineUrl: 'a', testCoverage: 80 },
        { creationDate: '2021-02-01', pipelineUrl: 'a', testCoverage: 70 },
        { creationDate: '2021-03-01', pipelineUrl: 'a', testCoverage: 60 },
        { creationDate: '2021-04-01', pipelineUrl: 'a', testCoverage: 50 },
        { creationDate: '2021-05-01', pipelineUrl: 'a', testCoverage: 40 }
    ]
    const mockResponsePage1 = [
        { creationDate: '2020-01-01', pipelineUrl: 'a', testCoverage: 82 },
        { creationDate: '2020-02-01', pipelineUrl: 'a', testCoverage: 72 },
        { creationDate: '2020-03-01', pipelineUrl: 'a', testCoverage: 62 },
        { creationDate: '2020-04-01', pipelineUrl: 'a', testCoverage: 52 }
    ]

    test('should render with no results', async() => {
        useDispatchMock().mockResolvedValue({ payload: [] })

        render(<CodeCoverageTooltip currentPercent = {10} projectId = {0}/>)

        expect(await screen.findByText('Code coverage is currently at 10%')).toBeInTheDocument()
        expect(requestSearchCoveragesMock).toHaveBeenCalledWith('project.id:0&order_by=DESC&size=5&page=0')
    })

    test('should handle pagination', async() => {
        useDispatchMock()
            .mockResolvedValueOnce({ payload: mockResponsePage0 })
            .mockResolvedValueOnce({ payload: mockResponsePage1 })
            .mockResolvedValueOnce({ payload: mockResponsePage0 })

        render(<CodeCoverageTooltip currentPercent = {10} projectId = {0}/>)
        expect(await screen.findByText('Code coverage is currently at 10%')).toBeInTheDocument()
        requestSearchCoveragesMock.mockClear()

        expect(screen.getByText('2021-01-01')).toBeInTheDocument()
        expect(screen.getByText('80.0')).toBeInTheDocument()
        expect(screen.getAllByTestId('CodeCoverageTooltip__coverage-row')).toHaveLength(5)

        fireEvent.click(screen.getByTestId('ArrowRightOutlinedIcon'))
        expect(await screen.findByText('2020-01-01')).toBeInTheDocument()

        expect(requestSearchCoveragesMock).toHaveBeenCalledWith('project.id:0&order_by=DESC&size=5&page=1')
        expect(screen.getAllByTestId('CodeCoverageTooltip__coverage-row')).toHaveLength(4)
        expect(screen.getByText('2')).toBeInTheDocument()

        fireEvent.click(screen.getByTestId('ArrowLeftOutlinedIcon'))
        expect(await screen.findByText('2021-01-01')).toBeInTheDocument()

        expect(screen.getAllByTestId('CodeCoverageTooltip__coverage-row')).toHaveLength(5)
        expect(requestSearchCoveragesMock).toHaveBeenCalledWith('project.id:0&order_by=DESC&size=5&page=1')
    })

})