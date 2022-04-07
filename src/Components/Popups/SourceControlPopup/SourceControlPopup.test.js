import {
    fireEvent, render, screen, useDispatchMock, useModuleMock, userEvent
} from 'Utilities/test-utils'
import { SourceControlPopup } from './index'

describe('<SourceControlPopup />', () => {

    const closePopupMock = useModuleMock('Redux/Popups/actions', 'closePopup')
    const submitCreateSourceControlMock = useModuleMock('Redux/SourceControls/actions', 'requestCreateSourceControl')
    const submitUpdateSourceControlMock = useModuleMock('Redux/SourceControls/actions', 'requestUpdateSourceControl')
    const selectSourceControlByIdMock = useModuleMock('Redux/SourceControls/selectors', 'selectSourceControlById')

    const returnedFoundSourceControl = {
        id: 4,
        name: 'Config Test',
        description: 'IL2',
        baseUrl: 'https://foo.bar'
    }

    const returnedNewSourceControl = {
        name: '',
        description: '',
        baseUrl: ''
    }

    beforeEach(() => {
        useDispatchMock().mockReturnValue({})
        selectSourceControlByIdMock.mockReturnValue(returnedNewSourceControl)
    })

    test('should render properly for createSourceControl', () => {
        render(<SourceControlPopup />)

        expect(screen.getByText('Create Config')).toBeInTheDocument()
    })

    test('should render properly for updateSourceControl', () => {
        selectSourceControlByIdMock.mockReturnValue(returnedFoundSourceControl)
        render(<SourceControlPopup id = {4}/>)

        expect(screen.getByText('Update Config')).toBeInTheDocument()
    })

    test('should display error messages', () => {
        const state = {
            errors: {
                'sourceControls/createOne': [
                    'name error'
                ]
            }
        }
        render(<SourceControlPopup />, { initialState: state })

        expect(screen.getByText('name error')).toBeInTheDocument()
    })

    test('should call onSubmit for createSourceControl', () => {
        render(<SourceControlPopup />)

        fireEvent.click(screen.getByText('submit'))

        expect(submitCreateSourceControlMock).toHaveBeenCalledWith({
            name: '', description: '', baseUrl: '', token: null })
    })

    test('should call onSubmit to Update sourceControl', () => {
        selectSourceControlByIdMock.mockReturnValue(returnedFoundSourceControl)
        render(<SourceControlPopup id = {4} />)

        const name = 'My Edited SourceControl'
        const baseUrl = 'https://foo.bar.baz'
        const description = 'New Description'
        const token = 'themostsupersecrettoken'

        const nameInput = screen.getByTestId('SourceControlPopup__input-name')
        const descriptionInput = screen.getByTestId('SourceControlPopup__input-description')
        const baseUrlInput = screen.getByTestId('SourceControlPopup__input-baseUrl')
        const tokenInput = screen.getByTestId('SourceControlPopup__input-token')

        userEvent.clear(descriptionInput)
        userEvent.clear(baseUrlInput)
        userEvent.clear(nameInput)

        userEvent.type(descriptionInput, description)
        userEvent.type(baseUrlInput, baseUrl)
        userEvent.type(nameInput, name)
        userEvent.type(tokenInput, token)

        fireEvent.click(screen.getByText('submit'))

        expect(submitUpdateSourceControlMock).toHaveBeenCalledWith({
            ...returnedFoundSourceControl, name, description, baseUrl, token })
    })

    test('should close popup', () => {
        render(<SourceControlPopup />)

        fireEvent.click(screen.getByTestId('Popup__button-close'))

        expect(closePopupMock).toHaveBeenCalled()
    })
})