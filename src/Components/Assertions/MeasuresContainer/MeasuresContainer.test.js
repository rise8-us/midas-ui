import { render, screen, useDispatchMock, useModuleMock, userEvent } from 'Utilities/test-utils'
import { MeasuresContainer } from './index'

jest.mock('Components/Cards/OGSM/MeasureCard/MeasureCard',
    () => (function testing() { return (<div>MeasureCard</div>) }))

describe('<MeasuresContainer />', () => {

    const selectMeasureIdsByAssertionIdMock = useModuleMock('Redux/Measures/selectors', 'selectMeasureIdsByAssertionId')
    const requestCreateMeasureMock = useModuleMock('Redux/Measures/actions', 'requestCreateMeasure')

    beforeEach(() => {
        useDispatchMock().mockReturnValue()
        selectMeasureIdsByAssertionIdMock.mockReturnValue([1])
    })

    test('should render', () => {
        render(<MeasuresContainer assertionId = {2} hasEdit = {false}/>)

        expect(screen.getByText('MeasureCard')).toBeInTheDocument()
    })

    test('should call dispatch to create measure', async() => {
        useDispatchMock().mockResolvedValue({ type: '' })

        render(<MeasuresContainer assertionId = {2} hasEdit/>)

        userEvent.click(screen.getByTestId('AddItem__icon-button'))
        await screen.findByTestId('AddItem__spinner')

        expect(requestCreateMeasureMock).toHaveBeenCalledTimes(1)
    })

})