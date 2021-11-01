import React from 'react'
import { fireEvent, render, screen } from 'Utilities/test-utils'
import { Tag } from './index'

describe('<Tag />', () => {

    const onDeleteMock = jest.fn()

    test('scoped tag no description', async() => {
        const data = {
            label: 'scope::label 1',
            description: 'desc 1',
            color: '#000000'
        }

        const scopedTag = 'scope | label 1'

        render(<Tag {...data}/>)

        expect(screen.getByText(scopedTag)).toBeInTheDocument()
        expect(screen.queryAllByText('::')).toHaveLength(0)

        fireEvent.mouseEnter(screen.getByText(scopedTag))

        expect(await screen.findByText(data.description)).toBeInTheDocument()
    })

    test('scoped tag no description', () => {
        const data = {
            label: 'scope::label 2',
            description: '',
            color: '#000000'
        }
        const scopedTag = 'scope | label 2'

        render(<Tag {...data}/>)

        expect(screen.getByText(scopedTag)).toBeInTheDocument()
    })

    test('single tag with description', async() => {
        const data = {
            label: 'label 3',
            description: 'desc 3',
            color: '#000000'
        }

        render(<Tag {...data}/>)

        fireEvent.mouseEnter(screen.getByText(data.label))

        expect(await screen.findByText(data.description)).toBeInTheDocument()
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

    test('should call onDelete func', () => {
        const data = {
            label: 'scope::label 4',
            description: '',
            color: '#000000'
        }

        render(<Tag {...data} onDelete = {onDeleteMock}/>)

        fireEvent.click(screen.getByTitle('Remove label 4'))

        expect(onDeleteMock).toHaveBeenCalled()
    })
})