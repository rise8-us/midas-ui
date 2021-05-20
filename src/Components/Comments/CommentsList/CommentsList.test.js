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

    test('should render', () => {
        selectCommentsByAssertionIdMock.mockReturnValue(commentsList)

        render(<CommentsList assertionId = {0}/>)

        expect(screen.getByText('Joe Smith')).toBeInTheDocument()
        expect(screen.getByText('jsmith@contoso.com')).toBeInTheDocument()
        expect(screen.getByText('jsmith')).toBeInTheDocument()

        expect(screen.getByText('now')).toBeInTheDocument()
        expect(screen.getByText('now +2')).toBeInTheDocument()
        expect(screen.queryByText('orig')).not.toBeInTheDocument()
    })

})