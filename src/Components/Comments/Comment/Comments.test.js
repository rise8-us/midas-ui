import React from 'react'
import { render, screen } from '../../../Utilities/test-utils'
import { Comment } from './index'

describe('<Comment>', () => {

    test('should render', () => {
        render(
            <Comment
                id = {0}
                author = 'aSmith'
                authorId = {1}
                lastEdit = 'timestamp'
                text = 'comment body'
            />
        )

        expect(screen.getByText('aSmith')).toBeInTheDocument()
        expect(screen.getByText('timestamp')).toBeInTheDocument()
        expect(screen.getByText('comment body')).toBeInTheDocument()
    })

    test('should parse status', () => {
        render(
            <Comment
                id = {0}
                author = 'aSmith'
                authorId = {1}
                lastEdit = 'timestamp'
                text = 'comment body###COMPLETED'
                handleStatusUpdates
            />, {
                initialState: {
                    app: {
                        assertionStatus: {
                            COMPLETED: { name: 'COMPLETED', label: 'Completed', color: '#000000' }
                        }
                    }
                }
            }
        )

        expect(screen.getByText('status')).toBeInTheDocument()
        expect(screen.getByText('Completed')).toBeInTheDocument()
    })

})