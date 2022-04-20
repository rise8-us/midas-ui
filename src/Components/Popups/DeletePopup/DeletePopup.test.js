import { render, screen, useDispatchMock } from 'Utilities/test-utils'
import { DeletePopup } from './index'

describe('<DeletePopup />', () => {

    const mockItemToDelete = {
        id: 4,
        title: 'TargetToDelete',
        type: 'target',
        constant: 'constant'
    }

    beforeEach(() => {
        useDispatchMock().mockReturnValue({})
    })

    test('should render properly', () => {
        const mockRequest = jest.fn()
        render(<DeletePopup
            id = {mockItemToDelete.id}
            title = {mockItemToDelete.title}
            type = {mockItemToDelete.type}
            constant = {mockItemToDelete.constant}
            request = {mockRequest}
        />)

        expect(screen.getByText('Are you sure?')).toBeInTheDocument()
        expect(screen.getByText('Please confirm or cancel')).toBeInTheDocument()
        expect(screen.getByText('TargetToDelete')).toBeInTheDocument()

    })

})