import React from 'react'
import { fireEvent, render, screen, userEvent, waitFor } from '../../Utilities/test-utils'
import { Tag } from './index'

describe('<Tag />', () => {

    const onDeleteMock = jest.fn()

    test('scopped tag no description', () => {
        const data = {
            label: 'scope::label 1',
            description: 'desc 1',
            color: '#000000'
        }

        render(<Tag {...data}/>)

        expect(screen.getByText('scope')).toBeInTheDocument()
        expect(screen.getByText('label 1')).toBeInTheDocument()
        expect(screen.queryAllByText('::')).toHaveLength(0)

        fireEvent.mouseEnter(screen.getByText('scope'))

        waitFor(() => expect(screen.getByTitle(data.description)).toBeInTheDocument())
    })

    test('scoped tag no description', () => {
        const data = {
            label: 'scope::label 2',
            description: '',
            color: '#000000'
        }

        render(<Tag {...data}/>)

        expect(screen.getByText('scope')).toBeInTheDocument()
        expect(screen.getByText('label 2')).toBeInTheDocument()
    })

    test('single tag with description', () => {
        const data = {
            label: 'label 3',
            description: 'desc 3',
            color: '#000000'
        }

        render(<Tag {...data}/>)

        fireEvent.mouseEnter(screen.getByText(data.label))

        waitFor(() => expect(screen.getByTitle(data.description)).toBeInTheDocument())
    })

    test('single tag no description', () => {
        const data = {
            label: 'label 4',
            description: '',
            color: '#000000'
        }

        render(<Tag {...data}/>)

        expect(screen.getByText(data.label)).toBeInTheDocument()
    })

    test('single tag no description', () => {
        const data = {
            label: 'scope::label 4',
            description: '',
            color: '#000000'
        }

        render(<Tag {...data} onDelete = {onDeleteMock}/>)

        userEvent.click(screen.getByTitle('delete'))

        expect(onDeleteMock).toHaveBeenCalled()
    })
})