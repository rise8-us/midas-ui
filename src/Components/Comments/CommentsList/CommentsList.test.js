import React from 'react'
import { render, screen, useModuleMock } from '../../../Utilities/test-utils'
import { CommentsList } from './index'

jest.mock('../Comment/Comment',
    () => function testing() { return (<div>Comment</div>) })

describe('<CommentsList>', () => {
    const commentsList = [12, 11, 143]

    const selectUserLoggedInMock = useModuleMock('Redux/Auth/selectors', 'selectUserLoggedIn')

    test('should render', () => {
        selectUserLoggedInMock.mockReturnValue({ id: 11 })

        render(<CommentsList commentIds = {commentsList}/>)

        expect(screen.getAllByText('Comment')).toHaveLength(3)
    })

})