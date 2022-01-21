import React from 'react'
import { renderWithRouter, screen, useDispatchMock, useModuleMock, userEvent } from 'Utilities/test-utils'
import { DeliverableWorkEntry } from './index'

describe('<DeliverableWorkEntry />', () => {

    const hasEditMock = useModuleMock('Redux/PageAccess/selectors', 'selectCapabilitiesPagePermission')
    const selectProductByIdMock = useModuleMock('Redux/Products/selectors', 'selectProductById')
    const selectEpicByIdMock = useModuleMock('Redux/Epics/selectors', 'selectEpicById')
    const requestDeleteDeliverableMock = useModuleMock('Redux/Deliverables/actions', 'requestDeleteDeliverable')

    beforeEach(() => {
        useDispatchMock().mockReturnValue({})
        hasEditMock.mockReturnValue(false)
        selectProductByIdMock.mockReturnValue({ name: 'product 1' })
        selectEpicByIdMock.mockReturnValue({ webUrl: 'foo' })
    })

    test('should render', () => {
        renderWithRouter(<DeliverableWorkEntry id = {1} productId = {2} epicId = {3} title = 'a whole new world'/>)

        expect(screen.getByText('a whole new world')).toBeInTheDocument()
        expect(screen.getByText('product 1')).toBeInTheDocument()
        expect(screen.queryByTestId('LinkOffOutlinedIcon')).not.toBeInTheDocument()
    })

    test('should handle delete', () => {
        hasEditMock.mockReturnValue(true)

        renderWithRouter(<DeliverableWorkEntry id = {1} productId = {2} epicId = {3} title = 'yup'/>)

        expect(screen.getByTestId('LinkOffOutlinedIcon')).toBeInTheDocument()
        userEvent.click(screen.getByTestId('LinkOffOutlinedIcon'))

        expect(requestDeleteDeliverableMock).toHaveBeenCalledWith(1)
    })

})