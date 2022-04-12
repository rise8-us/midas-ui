import { fireEvent, render, screen, useDispatchMock, useModuleMock, userEvent } from 'Utilities/test-utils'
import { DeliverableEntry } from './index'

describe('<DeliverableEntry>', () => {

    const selectPortfolioPageSettingsMock =
        useModuleMock('Redux/AppSettings/selectors', 'selectPortfolioPageSettings')

    const defaultProps = {
        id: 1,
        title: 'title',
        onUpdate: jest.fn,
        onDelete: jest.fn
    }

    test('should render', () => {
        selectPortfolioPageSettingsMock.mockReturnValue({ selectedDeliverableId: 1 })

        render(<DeliverableEntry {...defaultProps}/>)

        userEvent.hover(screen.getByTestId('DeliverableEntry__wrap'))
        userEvent.click(screen.getByTestId('DeliverableEntry__wrap'))

        expect(screen.getByTestId('DeliverableEntry__empty-div')).toBeInTheDocument()
    })

    test('should fire onClick', () => {
        useDispatchMock().mockReturnValue({})
        selectPortfolioPageSettingsMock.mockReturnValue({ selectedDeliverableId: null })
        const onClickMock = jest.fn()

        render(<DeliverableEntry {...defaultProps} hasEdit onClick = {onClickMock}/>)

        fireEvent.click(screen.getByTestId('DeliverableEntry__wrap'))

        expect(onClickMock).toHaveBeenCalled()
    })

})