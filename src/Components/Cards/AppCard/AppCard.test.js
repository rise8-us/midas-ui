import React from 'react'
import ApplicationConstants from '../../../Redux/Applications/constants'
import { fireEvent, render, screen, useDispatchMock, useModuleMock } from '../../../Utilities/test-utils'
import { AppCard } from './index'

describe('<AppCard />', () => {

    const application = {
        id: 4,
        name: 'Midas Application',
        description: 'New Application',
        projectIds: [2],
        isArchived: false,
        portfolioId: 2,
        tagIds: [4],
        tags: [
            {   id: 4,
                label: 'Some tags',
                description: null,
                color: ''
            }
        ],
        projects: [{ id: 2, name: 'project 1' }]
    }
    const application2 = {
        ...application,
        projects: []
    }

    const selectApplicationByIdMock = useModuleMock('Redux/Applications/selectors', 'selectApplicationById')
    const openPopupMock = useModuleMock('Redux/Popups/actions', 'openPopup')

    beforeEach(() => {
        useDispatchMock().mockReturnValue({})
        selectApplicationByIdMock.mockReturnValue(application)
    })

    test('should display data with projects', () => {
        render(<AppCard id = {application.id}/>)

        expect(screen.getByText('Midas Application')).toBeInTheDocument()
        expect(screen.getByText('Some tags')).toBeInTheDocument()
        expect(screen.getByText('project 1')).toBeInTheDocument()
    })

    test('should display data without projects', () => {
        selectApplicationByIdMock.mockReturnValue(application2)
        render(<AppCard id = {application.id}/>)

        expect(screen.getByText('Midas Application')).toBeInTheDocument()
        expect(screen.getByText('Some tags')).toBeInTheDocument()
        expect(screen.queryByText('project 1')).not.toBeInTheDocument()
    })

    test('should fire updateApplicationPopup', () => {
        render(<AppCard id = {application.id}/>)

        fireEvent.click(screen.getByTestId('AppCard__button-edit'))

        expect(openPopupMock).toHaveBeenCalledWith(
            ApplicationConstants.UPDATE_APPLICATION, 'UpdateApplicationPopup', { id: application.id })
    })

})