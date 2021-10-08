import React from 'react'
import { render, screen, useDispatchMock, useModuleMock, userEvent } from 'Utilities/test-utils'
import { Capability } from './index'

describe('<Capability />', () => {
    const selectCapabilityByIdMock = useModuleMock('Redux/Capabilities/selectors', 'selectCapabilityById')

    test('should create new', () => {
        useDispatchMock().mockResolvedValue({ payload: {} })

        const requestCreateCapabilityMock = useModuleMock('Redux/Capabilities/actions', 'requestCreateCapability')
        selectCapabilityByIdMock.mockReturnValue({ id: undefined, title: '', description: '' })

        render(<Capability hasEdit = {true}/>)

        userEvent.type(screen.getByPlaceholderText('NEW CAPABILITY NEEDS STATEMENT'), 'foobar')
        userEvent.tab()

        expect(requestCreateCapabilityMock).toHaveBeenCalledTimes(1)
    })

    test('should render and update', () => {
        useDispatchMock().mockResolvedValue({ payload: {} })

        selectCapabilityByIdMock.mockReturnValue({ id: 1, title: 'test title', description: '' })

        render(<Capability hasEdit = {true}/>)

        userEvent.click(screen.getByDisplayValue('test title'))
        userEvent.tab()
        userEvent.tab()

        expect(screen.getByPlaceholderText('NEW CAPABILITY NEEDS STATEMENT')).toHaveDisplayValue('')
        expect(screen.getByPlaceholderText('Enter Operational Context')).toBeInTheDocument()
    })

    test('should not save empty', () => {
        selectCapabilityByIdMock.mockReturnValue({ id: undefined, title: '', description: '' })

        render(<Capability hasEdit = {true}/>)

        userEvent.click(screen.getByPlaceholderText('NEW CAPABILITY NEEDS STATEMENT'))
        userEvent.tab()

        expect(screen.getByPlaceholderText('NEW CAPABILITY NEEDS STATEMENT')).toBeInTheDocument()
        expect(screen.queryByPlaceholderText('Enter Operational Context')).not.toBeInTheDocument()
    })
})