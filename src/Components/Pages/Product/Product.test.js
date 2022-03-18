import { fireEvent, renderWithRouter, screen, useDispatchMock, useModuleMock } from 'Utilities/test-utils'
import { Product } from './index'

jest.mock('Components/Tabs/ProjectsTab/ProjectsTab',
    () => function testing() { return (<div>ProjectsTab</div>) })

jest.mock('Components/Tabs/AssertionsTab/AssertionsTab',
    () => function testing() { return (<div>AssertionsTab</div>) })

jest.mock('Components/ProductOnePager/ProductRoadmap/ProductRoadmap',
    () => function testing() { return (<div>ProductRoadmap</div>) })

jest.mock('Components/ProductOnePager/ProductUserPersonas/ProductUserPersonas',
    () => function testing() { return (<div>ProductUserPersonas</div>) })

jest.mock('Components/ProductOnePager/ProductTeam/ProductTeam',
    () => function testing() { return (<div>ProductTeam</div>) })

jest.mock('Components/Page/Page',
    () => function testing({ children }) { return (<div>{children}</div>) })

describe('<Product>', () => {

    const selectProductByIdMock = useModuleMock('Redux/Products/selectors', 'selectProductById')
    const hasProductOrTeamAccessMock = useModuleMock('Redux/Auth/selectors', 'hasProductOrTeamAccess')
    const openPopupMock = useModuleMock('Redux/Popups/actions', 'openPopup')

    const product = {
        id: 0,
        name: 'Product 1',
        description: '',
        roadmapType: 'MANUAL',
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
        selectProductByIdMock.mockReturnValue(product)
        hasProductOrTeamAccessMock.mockReturnValue(true)
    })

    test('should have correct header text', () => {
        renderWithRouter(<Product />)

        expect(screen.getByDisplayValue('Product 1'))
        expect(screen.getByText(/Some tags/i)).toBeInTheDocument()
    })

    test('should render projects tab', () => {
        renderWithRouter(<Product />)

        fireEvent.click(screen.getByText(/Projects/i))
        expect(screen.getByText('ProjectsTab')).toBeInTheDocument()
    })

    test('should render overview tab', () => {
        renderWithRouter(<Product />)

        fireEvent.click(screen.getByText(/overview/i))
        expect(screen.getByText('ProductRoadmap')).toBeInTheDocument()
        expect(screen.getByText('ProductUserPersonas')).toBeInTheDocument()
    })

    test('should render ogsms tab', () => {
        renderWithRouter(<Product />)

        fireEvent.click(screen.getByText(/measures/i))
        expect(screen.getByText('AssertionsTab')).toBeInTheDocument()
    })

    test('should handle action icons', () => {
        renderWithRouter(<Product />)

        fireEvent.click(screen.getByTestId('ProductPage__icon-inline-edit'))
        fireEvent.click(screen.getByTestId('ProductPage__icon-popup-edit'))

        expect(screen.getByTitle('unlocked')).toBeInTheDocument()
        expect(openPopupMock).toHaveBeenCalled()
    })

})