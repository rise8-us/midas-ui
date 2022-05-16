import { render, screen, useDispatchMock, useModuleMock, userEvent } from 'Utilities/test-utils'
import { GoalsContainer } from './index'

jest.mock('Components/Cards/OGSM/MeasureCard/MeasureCard',
    () => (function testing() { return (<div>GoalCard</div>) }))

describe('<GoalsContainer />', () => {

    const selectMeasureIdsByAssertionIdMock = useModuleMock('Redux/Measures/selectors', 'selectMeasureIdsByAssertionId')
    const requestCreateMeasureMock = useModuleMock('Redux/Measures/actions', 'requestCreateMeasure')

    beforeEach(() => {
        useDispatchMock().mockReturnValue()
        selectMeasureIdsByAssertionIdMock.mockReturnValue([1])
    })

    test('should render', () => {
        render(<GoalsContainer assertionId = {2} hasEdit = {false}/>)

        expect(screen.getByText('GoalCard')).toBeInTheDocument()
    })

    test('should call dispatch to create goal', async() => {
        requestCreateMeasureMock.mockReturnValue({ type: '/', payload: {} })
        useDispatchMock().mockResolvedValue({ data: {} })

        render(<GoalsContainer assertionId = {2} hasEdit/>)

        userEvent.click(screen.getByTestId('AddItem__icon-button'))
        await screen.findByTestId('AddItem__spinner')

        expect(requestCreateMeasureMock).toHaveBeenCalledTimes(1)
    })

})