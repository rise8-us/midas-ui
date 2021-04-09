import React from 'react'
import { fireEvent, render, screen } from '../../../Utilities/test-utils'
import { Admin } from './index'

jest.mock('../../Admin/UserTab/UserTab',
    () => function testing() { return (<div>Admin Page User Tab Test</div>) })

jest.mock('../../Admin/ProjectsTab/ProjectsTab',
    () => function testing() { return (<div>Admin Page Project Tab Test</div>) })

jest.mock('../../Admin/TagsTab/TagsTab',
    () => function testing() { return (<div>Admin Page Tags Tab Test</div>) })

describe('<Admin />', () => {

    test('should render correctly', () => {
        render(<Admin />)

        expect(screen.getByText('users')).toBeInTheDocument()
        expect(screen.getByText('tags')).toBeInTheDocument()
        expect(screen.getByText('projects')).toBeInTheDocument()
    })

    test('should call usersTab component', async() => {
        render(<Admin />)

        fireEvent.click(screen.getByText('users'))

        expect(await screen.findByText('Admin Page User Tab Test')).toBeInTheDocument()
    })

    test('should call projectsTab component', async() => {
        render(<Admin />)

        fireEvent.click(screen.getByText('projects'))

        expect(await screen.findByText('Admin Page Project Tab Test')).toBeInTheDocument()
    })

    test('should call tagsTab component', async() => {
        render(<Admin />)

        fireEvent.click(screen.getByText('tags'))

        expect(await screen.findByText('Admin Page Tags Tab Test')).toBeInTheDocument()
    })



})