import { fireEvent } from '@testing-library/dom'
import React from 'react'
import { render, screen } from '../../../Utilities/test-utils'
import { EditCommentOptions } from './index'

describe('<EditCommentOptions>', () => {

    test('should render', () => {
        const onEditClickMock = jest.fn()
        render(<EditCommentOptions onEditClick = {onEditClickMock} canAccess/>)

        fireEvent.click(screen.getByTitle('more'))
        fireEvent.click(screen.getByText(/edit/i))

        expect(onEditClickMock).toHaveBeenCalled()
    })

    test('should not render', () => {
        render(<EditCommentOptions onEditClick = {jest.fn()}/>)

        expect(screen.queryByTitle('more')).not.toBeInTheDocument()
    })

    test('should handle onDelete', () => {
        const onDeleteClickMock = jest.fn()
        render(<EditCommentOptions onEditClick = {jest.fn} onDeleteClick = {onDeleteClickMock} canAccess/>)

        fireEvent.click(screen.getByTitle('more'))
        fireEvent.click(screen.getByText(/delete/i))

        expect(onDeleteClickMock).toHaveBeenCalled()
    })

})