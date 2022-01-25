import React from 'react'
import { fireEvent, render, screen, useDispatchMock, useModuleMock } from 'Utilities/test-utils'
import { DeliverableEntry } from './index'

describe('<DeliverableEntry>', () => {

    const setCapabilityPageMock = useModuleMock('Redux/AppSettings/reducer', 'setCapabilityPage')
    const selectCapabilityPageSettingsMock =
        useModuleMock('Redux/AppSettings/selectors', 'selectCapabilityPageSettings')

    const defaultProps = {
        id: 1,
        title: 'title',
        hasEdit: false,
        onUpdate: jest.fn,
        onDelete: jest.fn
    }

    test('should render', () => {
        selectCapabilityPageSettingsMock.mockReturnValue({ selectedDeliverableId: 1 })

        render(<DeliverableEntry {...defaultProps} />)

        fireEvent.mouseEnter(screen.getByTestId('DraggableRow__container'))

        expect(screen.getByTestId('DeliverableEntry__empty-div')).toBeInTheDocument()
    })

    test('should update selectedDeliverableId', () => {
        useDispatchMock().mockReturnValue({})
        selectCapabilityPageSettingsMock.mockReturnValue({ selectedDeliverableId: null })

        render(<DeliverableEntry {...defaultProps} hasEdit = {true} />)

        fireEvent.click(screen.getByTestId('DeliverableEntry__wrap'))

        expect(setCapabilityPageMock).toHaveBeenCalledWith({ selectedDeliverableId: 1 })
    })

})