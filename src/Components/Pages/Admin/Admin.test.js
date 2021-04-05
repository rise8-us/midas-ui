import React from 'react'
import { fireEvent, render, screen } from '../../../Utilities/test-utils'
import { Admin } from './index'

jest.mock('../../Admin/UserTab/UserTab',
    () => function testing() { return (<div>Admin Page User Tab Test</div>) })

describe('<Admin />', () => {

    test('should render correctly', () => {
        render(<Admin />)

        expect(screen.getByText('users')).toBeInTheDocument()
        expect(screen.getByText('tags')).toBeInTheDocument()
        expect(screen.getByText('products')).toBeInTheDocument()
    })

    test('should call usersTab component', async() => {
        render(<Admin />)

        fireEvent.click(screen.getByText('users'))

        expect(await screen.findByText('Admin Page User Tab Test')).toBeInTheDocument()
    })

})