import {
    act, fireEvent, render, screen, useDispatchMock, useModuleMock, waitForElementToBeRemoved
} from 'Utilities/test-utils'
import { StrategiesContainer } from './index'

jest.mock('Components/Cards/OGSM/StrategyCard/StrategyCard',
    () => (function testing() { return (<div>StrategyCard</div>) }))


describe('<StrategiesContainer />', () => {

    const selectAssertionByIdMock = useModuleMock('Redux/Assertions/selectors', 'selectAssertionById')
    const selectChildIdsByParentIdMock = useModuleMock('Redux/Assertions/selectors', 'selectChildIdsByParentId')
    const requestCreateAssertionMock = useModuleMock('Redux/Assertions/actions', 'requestCreateAssertion')

    beforeEach(() => {
        useDispatchMock().mockReturnValue()
        selectAssertionByIdMock.mockReturnValue({ id: 1 })
        selectChildIdsByParentIdMock.mockReturnValue([10, 20])
    })

    test('should render', () => {
        render(<StrategiesContainer productId = {23} parentId = {1} hasEdit = {false}/>)

        expect(screen.getAllByText('StrategyCard')).toHaveLength(2)
    })

    test('should call dispatch to create strategy', () => {
        useDispatchMock().mockResolvedValue({ type: '' })

        render(<StrategiesContainer productId = {23} parentId = {1} hasEdit/>)

        act(() => {
            fireEvent.click(screen.getByTestId('StrategiesContainer__icon-add'))
        })

        waitForElementToBeRemoved(screen.getByTestId('StrategiesContainer__loading'))

        expect(requestCreateAssertionMock).toHaveBeenCalledWith({
            parentId: 1,
            productId: 23,
            text: 'Enter new strategy here...',
            status: 'NOT_STARTED',
            children: [],
            measures: [{
                value: 0,
                target: 1,
                text: 'Enter new measure here...',
                completionType: 'BINARY'
            }]
        })
    })

})