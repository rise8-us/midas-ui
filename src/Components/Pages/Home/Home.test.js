import React from 'react'
import ProductConstants from '../../../Redux/Products/constants'
import { fireEvent, render, screen, useDispatchMock, useModuleMock } from '../../../Utilities/test-utils'
import { Home } from './index'

jest.mock('../../Cards/ProductCard/ProductCard', () =>
    function testing() { return (<div>Product Card mock</div>) })

describe('<Home>', () => {

    const openPopupMock = useModuleMock('Redux/Popups/actions', 'openPopup')
    const selectAppBarFilterMock = useModuleMock('Redux/Filters/selectors', 'selectAppBarFilter')
    const selectUnarchivedProductsMock =
        useModuleMock('Redux/Products/selectors', 'selectUnarchivedProducts')

    beforeEach(() => {
        useDispatchMock().mockReturnValue({})
        selectAppBarFilterMock.mockReturnValue('')
        selectUnarchivedProductsMock.mockReturnValue([
            {
                id: 1,
                name: '1n',
                description: '1d',
                projects: []
            }, {
                id: 2,
                name: '2n',
                description: '2d',
                projects: [
                    {
                        name: 'p1',
                        description: 'p2'
                    }
                ]
            }
        ])
    })

    test('should render', () => {
        render(<Home />)

        expect(screen.getByText('Measuring Inception to Production')).toBeInTheDocument()
        expect(screen.getAllByText('Product Card mock')).toHaveLength(2)
    })

    test('should filter results', async() => {
        selectAppBarFilterMock.mockReturnValue('1n')
        const { rerender } = render(<Home />)
        expect(await screen.findAllByText('Product Card mock')).toHaveLength(1) // product name

        selectAppBarFilterMock.mockReturnValue('2d')
        rerender(<Home />)
        expect(await screen.findAllByText('Product Card mock')).toHaveLength(1) // product description

        selectAppBarFilterMock.mockReturnValue('p1')
        rerender(<Home />)
        expect(await screen.findAllByText('Product Card mock')).toHaveLength(1) // project name

        selectAppBarFilterMock.mockReturnValue('p2')
        rerender(<Home />)
        expect(await screen.findAllByText('Product Card mock')).toHaveLength(1) // project description
    })

    test('should display no cards', async() => {
        selectAppBarFilterMock.mockReturnValue('no data should show')

        render(<Home />)

        expect(await screen.queryByText('Product Card mock')).not.toBeInTheDocument()
    })

    test('should call openPopup on Add Product', () => {
        render(<Home />)

        fireEvent.click(screen.getByText('Add New Product'))

        expect(openPopupMock).toHaveBeenCalledWith(ProductConstants.CREATE_PRODUCT, 'CreateOrUpdateProductPopup')
    })

})