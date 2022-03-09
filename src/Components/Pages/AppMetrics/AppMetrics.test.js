import React from 'react'
import { render, screen, useDispatchMock, waitFor } from 'Utilities/test-utils'
import { AppMetrics } from './index'

describe('<PersonaEntry>', () => {

    beforeAll(() => {
        jest.useFakeTimers('modern')
        jest.setSystemTime(new Date(2020, 12, 31))
    })

    afterAll(() => {
        jest.useRealTimers()
    })

    const response = [
        {
            id: '2020-12-31',
            uniqueLogins: 1,
            uniqueRoleMetrics: {
                foo: [],
                bar: [1]
            }
        }, {
            id: '2020-12-30',
            uniqueLogins: 3,
            uniqueRoleMetrics: {
                foo: [],
                bar: [1],
                fizz: [1]
            }
        }, {
            id: '2020-12-29',
            uniqueLogins: 1,
            uniqueRoleMetrics: {
                foo: [],
                bar: [1]
            }
        },
    ]

    test('should show icons on edit', async() => {
        await waitFor(() => {
            useDispatchMock().mockResolvedValue({ payload: response })
        })

        render(<AppMetrics />)

        await screen.findByTestId('AppMetrics__data')

        expect(screen.getByText('Tue Dec 29 2020')).toBeInTheDocument()
        expect(screen.getByText('Wed Dec 30 2020')).toBeInTheDocument()
        expect(screen.getByText('Thu Dec 31 2020')).toBeInTheDocument()
        expect(screen.getByText('Avg Unique/Day last 30 Days')).toBeInTheDocument()
        expect(screen.getByText('Avg Unique/Day last 90 Days')).toBeInTheDocument()
    })

})