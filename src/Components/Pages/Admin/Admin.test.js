import { fireEvent, render, screen } from 'Utilities/test-utils'
import { Admin } from './index'

jest.mock('Components/Admin/UserTab/UserTab',
    () => function testing() { return (<div>Admin Page User Tab Test</div>) })

jest.mock('Components/Admin/TeamsTab/TeamsTab',
    () => function testing() { return (<div>Admin Page Team Tab Test</div>) })

jest.mock('Components/Admin/ProjectsTab/ProjectsTab',
    () => function testing() { return (<div>Admin Page Project Tab Test</div>) })

jest.mock('Components/Admin/ProductsTab/ProductsTab',
    () => function testing() { return (<div>Admin Page Product Tab Test</div>) })

jest.mock('Components/Admin/PortfoliosTab/PortfoliosTab',
    () => function testing() { return (<div>Admin Page Portfolio Tab Test</div>) })

jest.mock('Components/Admin/SourceControlTab/SourceControlTab',
    () => function testing() { return (<div>Admin Page sourceControls Tab Test</div>) })

jest.mock('Components/Admin/DatabaseTab/DatabaseTab',
    () => function testing() { return (<div>Admin Page dbActions Tab Test</div>) })

describe('<Admin />', () => {

    test('should render correctly', () => {
        render(<Admin />)

        expect(screen.getByText('users')).toBeInTheDocument()
        expect(screen.getByText('projects')).toBeInTheDocument()
        expect(screen.getByText('products')).toBeInTheDocument()
        expect(screen.getByText('portfolios')).toBeInTheDocument()
    })

    test('should call UsersTab component', async() => {
        render(<Admin />)

        fireEvent.click(screen.getByText('users'))

        expect(await screen.findByText('Admin Page User Tab Test')).toBeInTheDocument()
    })

    test('should call TeamsTab component', async() => {
        render(<Admin />)

        fireEvent.click(screen.getByText('teams'))

        expect(await screen.findByText('Admin Page Team Tab Test')).toBeInTheDocument()
    })

    test('should call ProjectsTab component', async() => {
        render(<Admin />)

        fireEvent.click(screen.getByText('projects'))

        expect(await screen.findByText('Admin Page Project Tab Test')).toBeInTheDocument()
    })

    test('should call ProductsTab component', async() => {
        render(<Admin />)

        fireEvent.click(screen.getByText('products'))

        expect(await screen.findByText('Admin Page Product Tab Test')).toBeInTheDocument()
    })

    test('should call PortfoliosTab component', async() => {
        render(<Admin />)

        fireEvent.click(screen.getByText('portfolios'))

        expect(await screen.findByText('Admin Page Portfolio Tab Test')).toBeInTheDocument()
    })

    test('should call SourceControlTab component', async() => {
        render(<Admin />)

        fireEvent.click(screen.getByText('source Controls'))

        expect(await screen.findByText('Admin Page sourceControls Tab Test')).toBeInTheDocument()
    })

    test('should call DatabaseTab component', async() => {
        render(<Admin />)

        fireEvent.click(screen.getByText('Database Backup & Recovery'))

        expect(await screen.findByText('Admin Page dbActions Tab Test')).toBeInTheDocument()
    })

})