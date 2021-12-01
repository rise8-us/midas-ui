import React from 'react'
import { render, screen, useDispatchMock, useModuleMock, userEvent } from 'Utilities/test-utils'
import { Capability } from './index'

describe('<Capability />', () => {
    const selectCapabilityByIdMock = useModuleMock('Redux/Capabilities/selectors', 'selectCapabilityById')
    const requestCreateCapabilityMock = useModuleMock('Redux/Capabilities/actions', 'requestCreateCapability')
    const requestUpdateCapabilityMock = useModuleMock('Redux/Capabilities/actions', 'requestUpdateCapability')

    beforeEach(() => {
        useDispatchMock().mockResolvedValue({})
        selectCapabilityByIdMock.mockReturnValue({ id: 1, title: 'title', description: '' })
    })

    test('should render', () => {
        selectCapabilityByIdMock.mockReturnValue({ id: 1, title: 'title', description: 'description' })

        render(<Capability hasEdit = {false}/>)

        expect(screen.getByDisplayValue('title')).toBeInTheDocument()
        expect(screen.getByDisplayValue('description')).toBeInTheDocument()
    })

    test('should create new', () => {
        selectCapabilityByIdMock.mockReturnValue({ title: '', description: '' })

        render(<Capability hasEdit = {true}/>)

        userEvent.type(screen.getByPlaceholderText('NEW CAPABILITY NEEDS STATEMENT'), 'foobar')
        userEvent.tab()

        expect(requestCreateCapabilityMock).toHaveBeenCalledWith({
            title: 'foobar',
            description: '',
            referenceId: 0
        })
    })

    test('should update title', () => {
        render(<Capability hasEdit = {true}/>)

        userEvent.type(screen.getByDisplayValue('title'), 'new title')
        userEvent.tab()

        expect(requestUpdateCapabilityMock).toHaveBeenCalledWith({
            id: 1,
            title: 'new title',
            description: '',
            referenceId: 0
        })
    })

    test('should update description', () => {
        render(<Capability hasEdit = {true}/>)

        userEvent.type(screen.getByPlaceholderText('Enter Operational Context'), 'description')
        userEvent.tab()

        expect(requestUpdateCapabilityMock).toHaveBeenCalledWith({
            id: 1,
            title: 'title',
            description: 'description',
            referenceId: 0
        })
    })
})