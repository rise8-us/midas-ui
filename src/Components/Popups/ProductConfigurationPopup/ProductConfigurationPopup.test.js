import React from 'react'
import {
    fireEvent,
    mockProductConfigurationFields,
    render,
    screen,
    useDispatchMock,
    useModuleMock,
    userEvent
} from 'Utilities/test-utils'
import { ProductConfigurationPopup } from './index'

jest.mock('Components/ProductConfigurationFields/ProductConfigurationFields', () => function testing(props) {
    return mockProductConfigurationFields(props)
})

describe('<ProductConfigurationPopup />', () => {

    const product = { id: 1, name: 'productName' }

    const selectRequestErrorsMock = useModuleMock('Redux/Errors/selectors', 'selectRequestErrors')
    const selectProductByIdMock = useModuleMock('Redux/Products/selectors', 'selectProductById')
    const requestUpdateProductMock = useModuleMock('Redux/Products/actions', 'requestUpdateProduct')
    const closePopupMock = useModuleMock('Redux/Popups/actions', 'closePopup')

    beforeEach(() => {
        useDispatchMock().mockReturnValue({})
        selectRequestErrorsMock.mockReturnValue([])
        selectProductByIdMock.mockReturnValue(product)
    })

    test('should render', () => {
        render(<ProductConfigurationPopup id = {1}/>)

        fireEvent.click(screen.getByText('cancel'))
        fireEvent.click(screen.getByText('Submit'))

        expect(screen.getByText('Update Product Configuration')).toBeInTheDocument()
        expect(screen.getByText('productName')).toBeInTheDocument()
        expect(closePopupMock).toHaveBeenCalled()
        expect(requestUpdateProductMock).toHaveBeenCalledWith({
            ...product,
            gitlabGroupId: null,
            tagIds: [],
            teamIds: [],
            projectIds: [],
            sourceControlId: null,
            roadmapType: 'MANUAL',
            childIds: []
        })
    })

    test('should handle onChange functions', async() => {
        render(<ProductConfigurationPopup id = {1}/>)

        userEvent.type(screen.getByPlaceholderText('tags'), 'a')
        userEvent.type(screen.getByPlaceholderText('team'), 'b')
        userEvent.type(screen.getByPlaceholderText('projects'), 'c')
        userEvent.type(screen.getByPlaceholderText('srcc'), 'd')
        userEvent.type(screen.getByPlaceholderText('group'), 'e')
        userEvent.type(screen.getByPlaceholderText('roadmaptype'), 'f')

        fireEvent.click(screen.getByText('Submit'))

        expect(requestUpdateProductMock).toHaveBeenCalledWith({
            ...product,
            gitlabGroupId: 50,
            tagIds: [10],
            teamIds: [20],
            projectIds: [30],
            sourceControlId: 40,
            roadmapType: 'roadmaptype',
            childIds: []
        })
    })

})
