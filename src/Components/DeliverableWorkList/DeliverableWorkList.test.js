import staticConstants from 'Constants/Statics'
import { render, screen } from 'Utilities/test-utils'
import { DeliverableWorkList } from './index'

jest.mock('Components/DeliverableWorkEntry/DeliverableWorkEntry',
    () => (function testing(props) { return (<div>{props.id}</div>) }))

describe('<DeliverableWorkList />', () => {

    test('should render with entry', () => {
        render(<DeliverableWorkList workList = {[{ id: 1 }]}/>)

        expect(screen.getByText('1')).toBeInTheDocument()
        expect(screen.queryByText(staticConstants.NO_DELIVERABLES_ASSIGNED)).not.toBeInTheDocument()
    })

    test('should render with  no entries', () => {
        render(<DeliverableWorkList />)

        expect(screen.getByText(staticConstants.NO_DELIVERABLES_ASSIGNED)).toBeInTheDocument()
    })

})