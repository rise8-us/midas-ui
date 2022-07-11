import { DeliverablesViewTargets } from 'Components/DeliverablesViewTargets'
import { render, screen, useModuleMock } from 'Utilities/test-utils'

describe('<DeliverablesViewTargets />', () => {
    const selectTargetByIdMock = useModuleMock('Redux/Targets/selectors', 'selectTargetById')

    const foundTarget = {
        id: 1,
        startDate: '2022-04-04',
        dueDate: '2022-06-30',
        title: 'target title',
        description: 'target description',
        portfolioId: 233,
        parentId: null,
        childrenIds: [3],
        epicIds: [],
        deliverableIds: [],
        isPriority: false
    }

    test('should render', () => {
        selectTargetByIdMock.mockReturnValue(foundTarget)

        render(<DeliverablesViewTargets targetId = {1} subtargets = {[]}/>)

        expect(screen.getByText('target title')).toBeInTheDocument()

    })
})