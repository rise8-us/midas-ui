import { DeliverablesViewSubtargets } from 'Components/DeliverablesViewSubtargets'
import { render, screen, useModuleMock } from 'Utilities/test-utils'

describe('<DeliverablesViewSubtargets />', () => {

    const selectEpicsByIdsMock = useModuleMock('Redux/Epics/selectors', 'selectEpicsByIds')

    const foundEpics = [
        { id: 4, name: 'alpha', title: 'foo' },
        { id: 5, name: 'bravo', title: 'foo' },
    ]

    const subtarget = {
        id: 3,
        startDate: '2022-01-01',
        dueDate: '2022-02-02',
        title: 'subtarget title',
        description: 'subtarget description',
        portfolioId: 1,
        parentId: 2,
        childrenIds: [],
        epicIds: [4, 5],
        deliverableIds: [],
        isPriority: false
    }

    test('should render', () => {
        selectEpicsByIdsMock.mockReturnValue(foundEpics)
        render(<DeliverablesViewSubtargets subtarget = {subtarget}/>)

        expect(screen.getByText('subtarget title')).toBeInTheDocument()

    })
})
