import React from 'react'
import { render, screen, useModuleMock, userEvent } from '../../../Utilities/test-utils'
import { SearchTeams } from './index'

describe('<SearchTeams />', () => {
    jest.setTimeout(15000)

    const allTeams = [
        {
            id: 10,
            name: 'Bruins',
        }, {
            id: 11,
            name: 'Trojans',
        }
    ]

    const selectAllTeamsMock = useModuleMock('Redux/Teams/selectors', 'selectAllTeams')

    beforeEach(() => {
        selectAllTeamsMock.mockReturnValue(allTeams)
    })

    test('should render default', () => {
        render(<SearchTeams />)

        expect(screen.getByText('Team(s)')).toBeInTheDocument()
        expect(screen.getByDisplayValue('')).toBeInTheDocument()
    })

    test('should render props', () => {
        render(<SearchTeams value = {[allTeams[1]]}/>)

        expect(screen.getByText('Trojans')).toBeInTheDocument()
    })

    test('shoulld call onChange prop', async() => {
        const onChangePropMock = jest.fn()

        render(<SearchTeams onChange = {onChangePropMock}/>)

        const input = screen.getByDisplayValue('')
        userEvent.click(input)

        userEvent.click(await screen.findByText('Bruins'))

        expect(onChangePropMock).toHaveBeenCalledTimes(1)
    })

})
