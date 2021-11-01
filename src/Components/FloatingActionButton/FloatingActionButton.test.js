import { fireEvent } from '@testing-library/dom'
import React from 'react'
import { render, screen } from 'Utilities/test-utils'
import { FloatingActionButton } from './index'

describe('<FloatingActionButton>', () => {

    test('should render', () => {
        const onClickMock = jest.fn()

        render(<FloatingActionButton onClick = {onClickMock}/>)
        fireEvent.click(screen.getByTitle(/add/i))

        expect(onClickMock).toHaveBeenCalledTimes(1)
    })
})