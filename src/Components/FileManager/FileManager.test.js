import { render, screen, useDispatchMock, useModuleMock } from 'Utilities/test-utils'
import { FileManager } from './index'

describe('<FileManager />', () => {
    jest.setTimeout(30000)

    const requestGetFileMock = useModuleMock('Redux/FileManager/actions', 'requestGetFile')
    const requestSaveFileMock = useModuleMock('Redux/FileManager/actions', 'requestSaveFile')
    const requestGetFileNamesMock = useModuleMock('Redux/FileManager/actions', 'requestGetFileNames')
    const requestDeleteFileMock = useModuleMock('Redux/FileManager/actions', 'requestDeleteFile')

    const selectPortfolioByIdMock = useModuleMock('Redux/Portfolios/selectors', 'selectPortfolioById')
    const selectProductByIdMock = useModuleMock('Redux/Products/selectors', 'selectProductById')

    beforeEach(() => {
        useDispatchMock().mockResolvedValue({ type: '/', payload: { } })
        selectPortfolioByIdMock.mockReturnValue({ name: 'portfolio' })
        selectProductByIdMock.mockReturnValue({ name: 'product' })

    })

    test('should render', async() => {
        render(<FileManager productId = {1} hasEdit = {true} />)

        expect(await screen.findByPlaceholderText('Choose File')).toBeInTheDocument()
        expect(await screen.findByLabelText('Select existing file from product')).toBeInTheDocument()
    })

})