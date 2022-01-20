import React from 'react'
import { render, screen, useDispatchMock, useModuleMock } from 'Utilities/test-utils'
import { CapabilitiesList } from './index'

describe('<SelectCapabilities />', () => {
    const selectAllCapabilityIdsMock = useModuleMock('Redux/Capabilities/selectors', 'selectAllCapabilityIds')
    const selectCapabilityByIdMock = useModuleMock('Redux/Capabilities/selectors', 'selectCapabilityById')
    const selectCapabilitiesPagePermissionMock =
        useModuleMock('Redux/PageAccess/selectors', 'selectCapabilitiesPagePermission')

    beforeEach(() => {
        useDispatchMock().mockReturnValue({})
        selectCapabilitiesPagePermissionMock.mockReturnValue(false)
    })

    test('should render no capabilities', () => {
        selectAllCapabilityIdsMock.mockReturnValue([])

        render(<CapabilitiesList />)

        expect(screen.getByText('There are no Capability Needs Statements.')).toBeInTheDocument()
    })

    test('should render new capability', () => {
        selectAllCapabilityIdsMock.mockReturnValue([])
        selectCapabilitiesPagePermissionMock.mockReturnValue(true)
        selectCapabilityByIdMock.mockReturnValue({ title: '', description: '' })

        render(<CapabilitiesList />)

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