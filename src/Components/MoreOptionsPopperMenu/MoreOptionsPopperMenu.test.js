import { fireEvent } from '@testing-library/dom'
import React from 'react'
import { render, screen } from 'Utilities/test-utils'
import { MoreOptionsPopperMenu } from './index'

describe('<MoreOptionsPopperMenu>', () => {

    test('should render', () => {
        render(<MoreOptionsPopperMenu />)

        fireEvent.click(screen.getByTitle('more'))
        expect(screen.getByText(/no options/i)).toBeInTheDocument()

        fireEvent.click(screen.getByTitle('more'))
        expect(screen.queryByText(/no options/i)).not.toBeInTheDocument()
    })

    test('should call options onClick', () => {
        const onClickMock = jest.fn()
        render(<MoreOptionsPopperMenu
            options = {[
                { text: 'test', onClick: onClickMock }
            ]}
        />)

        fireEvent.click(screen.getByTitle('more'))
        fireEvent.click(screen.getByText('test'))

        expect(onClickMock).toHaveBeenCalled()
    })

})