import React from 'react'
import { render, screen, selectRoadmapStatusesMock } from 'Utilities/test-utils'
import { ProductRoadmapHeader } from './index'

describe('<ProductRoadmapHeader />', () => {

    beforeEach(() => {
        selectRoadmapStatusesMock()
    })

    test('should render action when hasEdit===true', () => {
        render(<ProductRoadmapHeader hasEdit = {true} action = {<p>Action</p>}/>)

        expect(screen.getByText('ROADMAP')).toBeInTheDocument()
        expect(screen.getByText('Action')).toBeInTheDocument()
    })

    test('should not render action when hasEdit===false', () => {
        render(<ProductRoadmapHeader action = {<p>Action</p>}/>)

        expect(screen.queryByText('Action')).not.toBeInTheDocument()
    })

})