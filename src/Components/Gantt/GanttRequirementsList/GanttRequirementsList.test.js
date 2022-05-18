import { render, screen, useDispatchMock, useModuleMock, userEvent } from 'Utilities/test-utils'
import { GanttRequirementsList } from './index'

describe('<GanttRequirementsList /> ', () => {
    const selectCapabilitiesByIdsMock =
        useModuleMock('Redux/Capabilities/selectors', 'selectCapabilitiesByIds')

    const foundCapabilities = [
        {
            id: 1,
            title: 'capability',
            deliverableIds: [2, 3]
        }
    ]

    beforeEach(() => {
        useDispatchMock().mockResolvedValue({})
        selectCapabilitiesByIdsMock.mockReturnValue(foundCapabilities)
    })

    test('should render', () => {

        const handleClick = jest.fn()

        render(<GanttRequirementsList
            handleEditCapability = {handleClick}
            capabilityIds = {[2, 3]}
            deliverableIds = {[2, 3, 4]}
        />)

        expect(screen.getByTestId('GanttRequirementsList__wrapper')).toBeInTheDocument()

        userEvent.click(screen.getByTestId('GanttRequirementsList__edit-button'))

        expect(handleClick).toBeCalledTimes(1)
    })
})