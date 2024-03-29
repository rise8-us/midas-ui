import { render, screen, useDispatchMock, useModuleMock, userEvent } from 'Utilities/test-utils'
import { ProductDetails } from './index'

describe('<ProductDetails>', () => {

    const selectProductByIdMock = useModuleMock('Redux/Products/selectors', 'selectProductById')
    const requestUpdateProductMock = useModuleMock('Redux/Products/actions', 'requestUpdateProduct')

    const product = {
        id: 1,
        mission: 'get to da chappa',
        problemStatement: 'da bridge is out',
        vision: 'to be the governer',
        coreDomain: 'to be da guvna',
        childIds: []
    }

    beforeEach(() => {
        selectProductByIdMock.mockReturnValue(product)
        useDispatchMock().mockReturnValue({})
    })

    test('should render with data and access', () => {
        render(<ProductDetails productId = {1} hasEdit = {true} />)

        expect(screen.getByDisplayValue(product.mission)).toBeInTheDocument()
        expect(screen.getByDisplayValue(product.problemStatement)).toBeInTheDocument()
        expect(screen.getByDisplayValue(product.vision)).toBeInTheDocument()
        expect(screen.getByDisplayValue(product.coreDomain)).toBeInTheDocument()

        userEvent.type(screen.getByDisplayValue(product.mission), '!')
        userEvent.tab()

        expect(requestUpdateProductMock).toHaveBeenCalledWith({ ...product, mission: '!' })

        requestUpdateProductMock.mockReset()
        userEvent.type(screen.getByDisplayValue(product.problemStatement), '!')
        userEvent.tab()

        expect(requestUpdateProductMock).toHaveBeenCalledWith({ ...product, problemStatement: 'da bridge is out!' })

        requestUpdateProductMock.mockReset()
        userEvent.type(screen.getByDisplayValue(product.vision), '!')
        userEvent.tab()

        expect(requestUpdateProductMock).toHaveBeenCalledWith({ ...product, vision: '!' })

        requestUpdateProductMock.mockReset()
        userEvent.type(screen.getByDisplayValue(product.coreDomain), 'core')
        userEvent.tab()

        expect(requestUpdateProductMock).toHaveBeenCalledWith({ ...product, coreDomain: 'core' })
    })

    test('should render with no data and no access', () => {
        render(<ProductDetails productId = {1} hasEdit = {false} />)

        userEvent.type(screen.getByDisplayValue(product.vision), '!')
        userEvent.tab()

        expect(requestUpdateProductMock).not.toHaveBeenCalled()
    })

})