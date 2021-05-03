import React from 'react'
import { fireEvent, render, screen } from '../../../Utilities/test-utils'
import { Admin } from './index'

jest.mock('../../Admin/UserTab/UserTab',
    () => function testing() { return (<div>Admin Page User Tab Test</div>) })

jest.mock('../../Admin/ProjectsTab/ProjectsTab',
    () => function testing() { return (<div>Admin Page Project Tab Test</div>) })

jest.mock('../../Admin/ProductsTab/ProductsTab',
    () => function testing() { return (<div>Admin Page Product Tab Test</div>) })

describe('<Admin />', () => {

    test('should render correctly', () => {
        render(<Admin />)

        expect(screen.getByText('users')).toBeInTheDocument()
        expect(screen.getByText('projects')).toBeInTheDocument()
        expect(screen.getByText('products')).toBeInTheDocument()
    })

    test('should call UsersTab component', async() => {
        render(<Admin />)

        fireEvent.click(screen.getByText('users'))

        expect(await screen.findByText('Admin Page User Tab Test')).toBeInTheDocument()
    })

    test('should call ProjectsTab component', async() => {
        render(<Admin />)

        fireEvent.click(screen.getByText('projects'))

        expect(await screen.findByText('Admin Page Project Tab Test')).toBeInTheDocument()
    })

    test('should call ProductsTab component', async() => {
        render(<Admin />)

        fireEvent.click(screen.getByText('products'))

        expect(await screen.findByText('Admin Page Product Tab Test')).toBeInTheDocument()
    })

})