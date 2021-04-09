import React from 'react'
import {
    fireEvent, render, screen, useDispatchMock, useModuleMock, userEvent, within
} from '../../../Utilities/test-utils'
import { CreateProjectPopup } from './index'

describe('<CreateProjectPopup />', () => {

    const closePopupMock = useModuleMock('Redux/Popups/actions', 'closePopup')
    const submitProjectMock = useModuleMock('Redux/Projects/actions', 'requestCreateProject')
    const selectAllTagsMock = useModuleMock('Redux/Tags/selectors', 'selectAllTags')

    const returnedTags = [
        { id: 1, label: 'Tag 1', description: '', color: '#000000' },
        { id: 2, label: 'Tag 2', description: '', color: '#000000' },
        { id: 13, label: 'scoped::label 1', description: '', color: '#000000' },
        { id: 14, label: 'scoped::label 2', description: '', color: '#000000' }
    ]

    beforeEach(() => {
        useDispatchMock().mockReturnValue({})
        selectAllTagsMock.mockReturnValue(returnedTags)
    })

    test('should render properly', () => {
        render(<CreateProjectPopup />)

        expect(screen.getByText('Create New Project')).toBeInTheDocument()
        expect(screen.getByTestId('CreateProjectPopup__input-name')).toBeInTheDocument()
        expect(screen.getByTestId('CreateProjectPopup__input-description')).toBeInTheDocument()
        expect(screen.getByTestId('CreateProjectPopup__input-gitlabProjectId')).toBeInTheDocument()
    })

    test('should execute onSubmit', async() => {
        render(<CreateProjectPopup />)

        const name = 'My New Project'
        const gitlabProjectId = '1234567'
        const description = 'Test Description'

        const nameInput = within(screen.getByTestId('CreateProjectPopup__input-name'))
            .getByRole('textbox')
        const descriptionInput = within(screen.getByTestId('CreateProjectPopup__input-description'))
            .getByRole('textbox')
        const gitlabProjectIdInput = within(screen.getByTestId('CreateProjectPopup__input-gitlabProjectId'))
            .getByRole('spinbutton')

        userEvent.type(nameInput, name)
        userEvent.type(gitlabProjectIdInput, gitlabProjectId)
        userEvent.type(descriptionInput, description)

        fireEvent.click(await screen.findByTitle('Open'))
        const option = screen.getByText('Tag 2')
        expect(option).toBeInTheDocument()
        fireEvent.click(option)

        fireEvent.click(screen.getByText('Submit'))

        expect(submitProjectMock).toHaveBeenCalledTimes(1)
        expect(submitProjectMock.mock.calls[0][0]).toEqual({ name, gitlabProjectId, description, tagIds: [2] })
    })
    test('should add & remove tag', async() => {
        render(<CreateProjectPopup id = {4}/>)
        fireEvent.click(await screen.findByTitle('Open'))

        // Add tag
        const option = screen.getByText('Tag 2')
        expect(option).toBeInTheDocument()
        fireEvent.click(option)

        expect(await screen.getByText('Tag 2')).toBeInTheDocument()

        // Remove tag
        fireEvent.click(await screen.findByTitle('Clear'))
        expect(await screen.queryByText('Tag 2')).not.toBeInTheDocument()
    })

    test('should allow only one scoped tag', async() => {
        render(<CreateProjectPopup id = {4}/>)

        // add first scoped label
        fireEvent.click(await screen.findByTitle('Open'))
        const option = screen.getByText('scoped::label 1')
        expect(option).toBeInTheDocument()
        fireEvent.click(option)

        expect(await screen.findByText('label 1')).toBeInTheDocument()

        // add second scoped label
        fireEvent.click(await screen.findByTitle('Open'))
        const option2 = screen.getByText('scoped::label 2')
        expect(option2).toBeInTheDocument()
        fireEvent.click(option2)

        expect(await screen.queryByText('label 1')).not.toBeInTheDocument()
        expect(await screen.findByText('label 2')).toBeInTheDocument()
    })
    test('should close popup', () => {
        render(<CreateProjectPopup />)

        fireEvent.click(screen.getByTestId('Popup__button-close'))

        expect(closePopupMock).toHaveBeenCalled()
    })

    test('should display error messages', () => {
        const state = {
            errors: {
                'projects/createOne': [
                    'name error',
                    'Gitlab error',
                    'Tag error'
                ]
            }
        }
        render(<CreateProjectPopup />, { initialState: state })

        expect(screen.getByText('name error')).toBeInTheDocument()
        expect(screen.getByText('Gitlab error')).toBeInTheDocument()
        expect(screen.getByText('Tag error')).toBeInTheDocument()

    })

})