import React from 'react'
import { render, screen } from 'Utilities/test-utils'
import { CtfStatistics } from './index'

describe('<CtfStatistics>', () => {

    const data = [
        {
            name: 'NOT_WHAT_IT_IS_LOCKING_FOR',
            value: 0,
            count: 1,
            total: 1
        },
        {
            name: 'CTF',
            value: 100,
            count: 1,
            total: 1
        }
    ]

    test('should find ctf in array', () => {
        render(<CtfStatistics data = {data}/>)

        expect(screen.getByText(/100%/)).toBeInTheDocument()
    })

    test('should render 0 for no ctf in array', () => {
        render(<CtfStatistics data = {[data[0]]}/>)

        expect(screen.getByText(/0%/)).toBeInTheDocument()
    })

})