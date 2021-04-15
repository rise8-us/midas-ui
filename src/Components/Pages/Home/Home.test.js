import React from 'react'
import ApplicationConstants from '../../../Redux/Applications/constants'
import TagConstants from '../../../Redux/Tags/constants'
import { fireEvent, render, screen, useDispatchMock, useModuleMock } from '../../../Utilities/test-utils'
import { Home } from './index'

jest.mock('../../Cards/AppCard/AppCard', () =>
    function testing() { return (<div>Application Card mock</div>) })

describe('<Home>', () => {

    const openPopupMock = useModuleMock('Redux/Popups/actions', 'openPopup')
    const selectUnarchivedApplicationIdsMock =
        useModuleMock('Redux/Applications/selectors', 'selectUnarchivedApplicationIds')

    beforeEach(() => {
        useDispatchMock().mockReturnValue({})
        selectUnarchivedApplicationIdsMock.mockReturnValue([0])
    })

    test('Has correct text', () => {
        render(<Home />)

        expect(screen.getByText('Add New App')).toBeInTheDocument()
        expect(screen.getByText('Add New Tag')).toBeInTheDocument()
        expect(screen.getByText('Measuring Inception to Production')).toBeInTheDocument()
        expect(screen.getByText('Application Card mock')).toBeInTheDocument()
    })

    test('Add App calls openPopup', () => {
        render(<Home />)

        fireEvent.click(screen.getByText('Add New App'))

        expect(openPopupMock).toHaveBeenCalledWith(ApplicationConstants.CREATE_APPLICATION, 'CreateApplicationPopup')
    })

    test('Add Tag calls openPopup', () => {
        render(<Home />)

        fireEvent.click(screen.getByText('Add New Tag'))

        expect(openPopupMock).toHaveBeenCalledWith(TagConstants.CREATE_TAG, 'CreateTagPopup')
    })
})