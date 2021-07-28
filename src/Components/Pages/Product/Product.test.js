import React from 'react'
import { fireEvent, render, screen, useDispatchMock, useModuleMock } from '../../../Utilities/test-utils'
import { Product } from './index'

jest.mock('../../Tabs/ProjectsTab/ProjectsTab',
    () => function testing() { return (<div>ProjectsTab</div>) })

jest.mock('../../Tabs/AssertionsTab/AssertionsTab',
    () => function testing() { return (<div>AssertionsTab</div>) })

jest.mock('../../Page/Page',
    () => function testing({ children }) { return (<div>{children}</div>) })

describe('<Product>', () => {

    const selectProductByIdMock = useModuleMock('Redux/Products/selectors', 'selectProductById')
    const queryParamsMock = useModuleMock('Utilities/queryParams', 'getUrlParam')

    const product = {
        id: 0,
        name: 'Product 1',
        visionStatement: 'great vision',
        tagIds: [4],
        tags: [
            {   id: 4,
                label: 'Some tags',
                description: null,
                color: ''
            }
        ]
    }

    beforeEach(() => {
        useDispatchMock().mockReturnValue({})
        queryParamsMock.mockReturnValue(0)
        selectProductByIdMock.mockReturnValue(product)
    })

    test('should have correct header text', () => {
        render(<Product />)
        expect(screen.getByTestId('ProductHeader__input-name').querySelector('input')).toHaveValue('Product 1')
        expect(screen.getByPlaceholderText('Description not set...')).toBeInTheDocument()
        expect(screen.getByText('Some tags')).toBeInTheDocument()
    })

    test('should render projects tab', () => {
        render(<Product />)

        fireEvent.click(screen.getByText(/Projects/i))
        expect(screen.getByText('ProjectsTab')).toBeInTheDocument()
    })

})