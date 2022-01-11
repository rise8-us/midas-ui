import React from 'react'
import { render, screen } from 'Utilities/test-utils'
import { SonarqubeTooltip } from './index'

describe('<SonarqubeTooltip />', () => {

    test('should render with no props', () => {
        render(<SonarqubeTooltip />)

        expect(screen.getByText('No Data')).toBeInTheDocument()
        expect(screen.queryByText('Gitlab Pipeline')).not.toBeInTheDocument()
        expect(screen.queryByText('SonarQube Project')).not.toBeInTheDocument()
    })

    test('should render with props', () => {
        render(<SonarqubeTooltip message = 'message' pipelineUrl = 'a' sonarqubeUrl = 'b'/>)

        expect(screen.getByText('message')).toBeInTheDocument()
        expect(screen.getByText('Gitlab Pipeline')).toBeInTheDocument()
        expect(screen.getByText('SonarQube Project')).toBeInTheDocument()
    })

    test('should render with message!==string type', () => {
        render(<SonarqubeTooltip message = {<div>Hello World</div>}/>)

        expect(screen.getByText('Hello World')).toBeInTheDocument()
    })
})