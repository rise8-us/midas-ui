import React from 'react'
import TagConstants from '../../../Redux/Tags/constants'
import { fireEvent, render, screen, useDispatchMock, useModuleMock, waitFor } from '../../../Utilities/test-utils'
import { Tags } from './index'

describe('<Tags />', () => {

    const allTags = {
        id: 1,
        label: 'Horizon One',
        description: 'New Tag',
        color: '#ff5722'

    }

    const selectAllTagsMock = useModuleMock('Redux/Tags/selectors', 'selectAllTags')
    const openPopupMock = useModuleMock('Redux/Popups/actions', 'openPopup')
    const deleteTagMock = useModuleMock('Redux/Tags/actions', 'requestDeletTag')
    const selectUserLoggedInMock = useModuleMock('Redux/Auth/selectors', 'selectUserLoggedIn')

    beforeEach(() => {
        useDispatchMock().mockReturnValue({})
        selectAllTagsMock.mockReturnValue([allTags])
        selectUserLoggedInMock.mockReturnValue({ isAdmin: true })
    })

    test('Table display correctly', () => {
        render(<Tags />)

        expect(screen.getByText('Tag')).toBeInTheDocument()
        expect(screen.getByText('Description')).toBeInTheDocument()
        expect(screen.getByText('Color')).toBeInTheDocument()
        expect(screen.getByText('Horizon One')).toBeInTheDocument()
        expect(screen.getByText('New Tag')).toBeInTheDocument()
        expect(screen.getByText('#ff5722')).toBeInTheDocument()
    })

    test('Should fire updateTagPopup', () => {
        render(<Tags />)

        fireEvent.click(screen.getByTitle('edit'))

        expect(openPopupMock).toHaveBeenCalledWith(
            TagConstants.UPDATE_TAG, 'UpdateTagPopup', { id: allTags.id })
    })

    test('Should fire delete tag', () => {
        render(<Tags />)

        fireEvent.click(screen.getByTitle('delete'))

        waitFor(() => expect(deleteTagMock).toHaveBeenCalledWith(allTags.id))
    })

    test('Add Tag calls openPopup', () => {
        render(<Tags />)

        fireEvent.click(screen.getByText('Add New Tag'))

        expect(openPopupMock).toHaveBeenCalledWith(TagConstants.CREATE_TAG, 'CreateTagPopup')
    })

})