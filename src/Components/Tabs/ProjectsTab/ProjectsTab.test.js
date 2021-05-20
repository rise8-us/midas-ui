import React from 'react'
import { render, screen, useModuleMock } from '../../../Utilities/test-utils'
import { ProjectsTab } from './index'

jest.mock('../../Cards/ProjectCard/ProjectCard',
    () => function testing() { return (<div>ProjectCard</div>) })

describe('<ProjectsTab>', () => {

    const selectProductByIdMock = useModuleMock('Redux/Products/selectors', 'selectProductById')

    test('should not render ProjectCards', () => {
        selectProductByIdMock.mockReturnValue({})

        render(<ProjectsTab id = {0}/>)
        expect(screen.queryByText('ProjectCard')).not.toBeInTheDocument()
    })

    test('should render project cards', () => {
        selectProductByIdMock.mockReturnValue({
            projects: [{ id: 2, isArchived: false }, { id: 3, isArchived: false  }]
        })
        render(<ProjectsTab id = {0}/>)

        expect(screen.getAllByText('ProjectCard')).toHaveLength(2)
    })

})