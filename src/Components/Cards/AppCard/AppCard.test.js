import React from 'react'
// import ApplicationConstants from '../../../Redux/Applications/constants'
import { render, screen, useDispatchMock, useModuleMock } from '../../../Utilities/test-utils'
import { AppCard } from './index'

describe('<AppCard />', () => {

    const application = {
        id: 4,
        name: 'Midas Application',
        description: 'New Application',
        projectsIds: [2],
        isArchived: false,
        portfolioId: 2,
        tagIds: [4],
        tags: [
            {   id: 4,
                label: 'Some tags',
                description: null,
                color: ''
            }
        ]
    }
    const project = {
        id: 2,
        name: 'project 1',
        description: 'desc 1',
        projectJourneyMap: 1,
        tagIds: [1],
        tags: [
            {   id: 1,
                label: 'Other tags',
                description: null,
                color: ''
            }
        ]
    }

    const getApplicationByIdMock = useModuleMock('Redux/Applications/selectors', 'getApplicationById')
    const getProjectByIdMock = useModuleMock('Redux/Projects/selectors', 'getProjectById')
    // const openPopupMock = useModuleMock('Redux/Popups/actions', 'openPopup')

    beforeEach(() => {
        useDispatchMock().mockReturnValue({})
        getApplicationByIdMock.mockReturnValue(application)
        getProjectByIdMock.mockReturnValue(project)
    })

    test('should display data', () => {
        render(<AppCard id = {application.id}/>)

        expect(screen.getByText('Midas Application')).toBeInTheDocument()
        expect(screen.getByText('Some tags')).toBeInTheDocument()
        expect(screen.getByText('Other tags')).toBeInTheDocument()
    })

    // test('should fire updateApplicationPopup', () => {
    //     render(<AppCard id = {application.id}/>)

    //     fireEvent.click(screen.getByTestId('AppCard__button-edit'))

    //     expect(openPopupMock).toHaveBeenCalledWith(
    //         ApplicationConstants.UPDATE_APPLICATION, 'UpdateApplicationPopup', { id: application.id })
    // })

})