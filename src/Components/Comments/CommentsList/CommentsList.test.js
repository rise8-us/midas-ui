import React from 'react'
import { render, screen, useModuleMock } from '../../../Utilities/test-utils'
import { CommentsList } from './index'

describe('<CommentsList>', () => {
    const commentsList = [
        {
            id: 1,
            author: {
                id: 11,
                displayName: 'Joe Smith'
            },
            text: 'c1',
            creationDate: 'now'
        },
        {
            id: 2,
            author: {
                id: 12,
                email: 'jsmith@contoso.com'
            },
            text: 'c2',
            creationDate: 'now +1'
        },
        {
            id: 3,
            author: {
                id: 13,
                username: 'jsmith'
            },
            text: 'c3',
            lastEdit: 'now +2',
            creationDate: 'orig'
        }
    ]


    const selectCommentsByAssertionIdMock = useModuleMock('Redux/Comments/selectors', 'selectCommentsByAssertionId')
    const selectUserLoggedInMock = useModuleMock('Redux/Auth/selectors', 'selectUserLoggedIn')

    beforeEach(() => {
        selectCommentsByAssertionIdMock.mockReturnValue(commentsList)
        selectUserLoggedInMock.mockReturnValue({ id: 11 })
    })

    test('should render', () => {
        render(<CommentsList assertionId = {0}/>)

        expect(screen.getByText('Joe Smith')).toBeInTheDocument()
        expect(screen.getByText('jsmith@contoso.com')).toBeInTheDocument()
        expect(screen.getByText('jsmith')).toBeInTheDocument()

        expect(screen.getByText('now')).toBeInTheDocument()
        expect(screen.getByText('now +2 (edited)')).toBeInTheDocument()
        expect(screen.queryByText('orig')).not.toBeInTheDocument()
    })


    test('should render vertMore icon', () => {
        render(<CommentsList assertionId = {0}/>)

        expect(screen.getByTitle(/more/i)).toBeInTheDocument()
    })

})