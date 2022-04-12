import { renderWithRouter, screen, useDispatchMock, useModuleMock, userEvent } from 'Utilities/test-utils'
import { DeliverableWorkEntry } from './index'

describe('<DeliverableWorkEntry />', () => {

    const selectProductByIdMock = useModuleMock('Redux/Products/selectors', 'selectProductById')
    const selectDeliverableByIdMock = useModuleMock('Redux/Deliverables/selectors', 'selectDeliverableById')
    const requestDeleteDeliverableMock = useModuleMock('Redux/Deliverables/actions', 'requestDeleteDeliverable')

    const completion = { value: 0.0, target: 5.0, gitlabEpic: null, gitlabIssue: null }
    const gitlabEpic =  { webUrl: 'foo' }

    beforeEach(() => {
        useDispatchMock().mockReturnValue({})
        selectProductByIdMock.mockReturnValue({ name: 'product 1' })
        selectDeliverableByIdMock.mockReturnValue({
            title: 'deliverable title',
            productId: 2,
            completion: {
                ...completion,
                gitlabEpic
            }
        })
    })

    test('should render', () => {
        renderWithRouter(<DeliverableWorkEntry id = {1}/>)

        expect(screen.getByText('deliverable title')).toBeInTheDocument()
        expect(screen.getByText('product 1')).toBeInTheDocument()
        expect(screen.getByTestId('DeliverableWorkEntry__title-link-wrap')).toHaveAttribute('href', 'foo')
        expect(screen.queryByTestId('LinkOffOutlinedIcon')).not.toBeInTheDocument()
    })

    test('should render when link not provided', () => {
        selectDeliverableByIdMock.mockReturnValue({ title: 'deliverable title', productId: 2, completion: {} })

        renderWithRouter(<DeliverableWorkEntry id = {1}/>)

        expect(screen.getByText('deliverable title')).toBeInTheDocument()
        expect(screen.queryByTestId('DeliverableWorkEntry__title-link-wrap')).not.toBeInTheDocument()
    })

    test('should handle delete', () => {
        renderWithRouter(<DeliverableWorkEntry id = {1} hasEdit/>)

        expect(screen.getByTestId('LinkOffOutlinedIcon')).toBeInTheDocument()
        userEvent.click(screen.getByTestId('LinkOffOutlinedIcon'))

        expect(requestDeleteDeliverableMock).toHaveBeenCalledWith(1)
    })

})