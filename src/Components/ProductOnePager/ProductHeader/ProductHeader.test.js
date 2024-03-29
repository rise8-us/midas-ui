import { render, screen, useDispatchMock, useModuleMock, userEvent } from 'Utilities/test-utils'
import { ProductHeader } from './index'

describe('<ProductHeader>', () => {

    const selectProductByIdMock = useModuleMock('Redux/Products/selectors', 'selectProductById')
    const requestUpdateProductMock = useModuleMock('Redux/Products/actions', 'requestUpdateProduct')

    const product = {
        id: 0,
        name: 'Product 1',
        acronym: '',
        tagIds: [4],
        tags: [
            {   id: 4,
                label: 'Some tags',
                acronym: null,
                color: ''
            }
        ]
    }

    beforeEach(() => {
        selectProductByIdMock.mockReturnValue(product)
    })

    test('Has correct text', () => {
        render(<ProductHeader id = {0} hasEdit/>)

        expect(screen.getByDisplayValue('Product 1')).toBeInTheDocument()
        expect(screen.getByText(/Some tags/i)).toBeInTheDocument()
    })

    test('should display empty quotes if hasEdit === false and no content', () => {
        render(<ProductHeader id = {0} />)

        expect(screen.getByTestId('ProductHeader__input-acronym')).toBeInTheDocument()
    })

    test('should call onSubmit for name change', () => {
        useDispatchMock().mockReturnValue({})
        render(<ProductHeader id = {0} hasEdit/>)

        userEvent.type(screen.getByTestId('ProductHeader__input-name'), '2{enter}')

        expect(requestUpdateProductMock).toHaveBeenCalledWith({
            ...product, name: 'Product 12', childIds: []
        })
    })

    test('should call onSubmit for acronym change', () => {
        useDispatchMock().mockReturnValue({})
        const acronym = 'is no longer empty'

        render(<ProductHeader id = {0} hasEdit/>)

        userEvent.type(screen.getByTestId('ProductHeader__input-acronym'), `${acronym}{enter}`)

        expect(requestUpdateProductMock).toHaveBeenCalledWith({
            ...product, acronym, childIds: []
        })
    })

    test('should display error messages', () => {
        const state = {
            errors: {
                'products/updateOne': [
                    'Name error'
                ]
            }
        }

        render(<ProductHeader id = {0} hasEdit/>, { initialState: state })

        expect(screen.getByText('Name error')).toBeInTheDocument()
    })

})