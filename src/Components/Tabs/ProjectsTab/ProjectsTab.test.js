import ProductConstants from 'Redux/Products/constants'
import ProjectConstants from 'Redux/Projects/constants'
import { fireEvent, render, screen, useDispatchMock, useModuleMock } from 'Utilities/test-utils'
import { ProjectsTab } from './index'

jest.mock('Components/Cards/ProjectCard/ProjectCard',
    () => function testing() { return (<div>ProjectCard</div>) })

describe('<ProjectsTab>', () => {

    const selectProductByIdMock = useModuleMock('Redux/Products/selectors', 'selectProductById')
    const openPopupMock = useModuleMock('Redux/Popups/actions', 'openPopup')

    test('should not render ProjectCards', () => {
        selectProductByIdMock.mockReturnValue({})

        render(<ProjectsTab id = {0} hasEdit = {false}/>)
        expect(screen.queryByText('ProjectCard')).not.toBeInTheDocument()
        expect(screen.getByText(/There does not seem to be any projects associated with this product/i))
            .toBeInTheDocument()
    })

    test('should render project cards', () => {
        selectProductByIdMock.mockReturnValue({
            projects: [{ id: 2, isArchived: false }, { id: 3, isArchived: false  }]
        })
        render(<ProjectsTab id = {0} hasEdit = {false}/>)

        expect(screen.getAllByText('ProjectCard')).toHaveLength(2)
    })

    test('should call ProductPopup', () => {
        useDispatchMock().mockReturnValue({})
        selectProductByIdMock.mockReturnValue({
            name: 'foo',
            projects: [],
            id: 0
        })

        render(<ProjectsTab id = {0} hasEdit = {true}/>)

        fireEvent.click(screen.getByText(/add an existing project/i))
        expect(openPopupMock)
            .toHaveBeenCalledWith(ProductConstants.UPDATE_PRODUCT, 'ProductPopup', { id: 0 })
    })

    test('should call ProjectPopup', () => {
        useDispatchMock().mockReturnValue({})
        selectProductByIdMock.mockReturnValue({
            id: 0,
            name: 'foo',
            projects: []
        })

        render(<ProjectsTab id = {0} hasEdit = {true}/>)

        fireEvent.click(screen.getByText(/create a new project/i))
        expect(openPopupMock)
            .toHaveBeenCalledWith(ProjectConstants.CREATE_PROJECT, 'ProjectPopup', { parentId: 0 })
    })

})