import React from 'react'
import ProductConstants from '../../../Redux/Products/constants'
import TagConstants from '../../../Redux/Tags/constants'
import { fireEvent, render, screen, useDispatchMock, useModuleMock } from '../../../Utilities/test-utils'
import { Home } from './index'

jest.mock('../../Cards/AppCard/AppCard', () =>
    function testing() { return (<div>Product Card mock</div>) })

describe('<Home>', () => {

    const openPopupMock = useModuleMock('Redux/Popups/actions', 'openPopup')
    const selectUnarchivedProductIdsMock =
        useModuleMock('Redux/Products/selectors', 'selectUnarchivedProductIds')

    beforeEach(() => {
        useDispatchMock().mockReturnValue({})
        selectUnarchivedProductIdsMock.mockReturnValue([0])
    })

    test('Has correct text', () => {
        render(<Home />)

        expect(screen.getByText('Add New Product')).toBeInTheDocument()
        expect(screen.getByText('Add New Tag')).toBeInTheDocument()
        expect(screen.getByText('Measuring Inception to Production')).toBeInTheDocument()
        expect(screen.getByText('Product Card mock')).toBeInTheDocument()
    })

    test('Add App calls openPopup', () => {
        render(<Home />)

        fireEvent.click(screen.getByText('Add New Product'))

        expect(openPopupMock).toHaveBeenCalledWith(ProductConstants.CREATE_PRODUCT, 'CreateProductPopup')
    })

    test('Add Tag calls openPopup', () => {
        render(<Home />)

        fireEvent.click(screen.getByText('Add New Tag'))

        expect(openPopupMock).toHaveBeenCalledWith(TagConstants.CREATE_TAG, 'CreateOrUpdateTagPopup')
    })
})