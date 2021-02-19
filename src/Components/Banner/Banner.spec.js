import React from 'react'
import { render, screen, useSelectorMock } from '../../Utilities/test-utils'
import { Banner } from './index'

beforeEach(() => {
    useSelectorMock().mockClear()
})

test('<Banner /> - Has correct info', () => {
    const initialState = {
        info: {
            classification: {
                name: 'FOO',
                caveat: 'BAR',
                backgroundColor: '#000000',
                textColor: '#FFFFFF'
            }
        }
    }
    render(<Banner><div/></Banner>, { initialState: initialState })
    const linkElement = screen.getAllByText(/FOO\/\/BAR/i)
    expect(linkElement).toHaveLength(2)
})

test('<Banner /> - Has correct info', () => {
    useSelectorMock().mockReturnValue()
    render(<Banner><div/></Banner>, { initialState: {} })
    const linkElement = screen.getByTestId('Banner__empty')
    expect(linkElement).toBeInTheDocument()
})
