import React from 'react'
import { render, screen, useModuleMock } from 'Utilities/test-utils'
import { CapabilitiesList } from './index'

describe('<SelectCapabilities />', () => {
    const selectAllCapabilityIdsMock = useModuleMock('Redux/Capabilities/selectors', 'selectAllCapabilityIds')
    const selectCapabilityByIdMock = useModuleMock('Redux/Capabilities/selectors', 'selectCapabilityById')

    test('should render no capabilities', () => {
        selectAllCapabilityIdsMock.mockReturnValue([])
        render(<CapabilitiesList />)

        expect(screen.getByText('There are no Capability Needs Statements to display.')).toBeInTheDocument()
    })

    test('should render new capability', () => {
        selectAllCapabilityIdsMock.mockReturnValue([])
        selectCapabilityByIdMock.mockReturnValue({ title: '', description: '' })
        render(<CapabilitiesList hasEdit = {true}/>)

        expect(screen.getByPlaceholderText('NEW CAPABILITY NEEDS STATEMENT')).toBeInTheDocument()
    })

    test('should render existing capabilities', () => {
        selectAllCapabilityIdsMock.mockReturnValue([0])
        selectCapabilityByIdMock.mockReturnValue({ id: 0, title: 'CNS 1', description: 'this is a cns' })

        render(<CapabilitiesList />)

        expect(screen.getByDisplayValue('CNS 1')).toBeInTheDocument()
        expect(screen.getByDisplayValue('this is a cns')).toBeInTheDocument()
    })
})