import React from 'react'
import { render, screen, userEvent } from '../../Utilities/test-utils'
import { ProductDetails } from './index'

describe('<ProductDetails>', () => {

    test('should render with data and access', () => {
        const onFieldUpdatedMock = jest.fn()
        const mission = 'get to da chappa'
        const problem = 'da bridge is out'
        const vision = 'to be the governer'

        render(
            <ProductDetails
                missionStatement = {mission}
                problemStatement = {problem}
                visionStatement = {vision}
                onFieldUpdated = {onFieldUpdatedMock}
                hasEditAccess = {true}
            />
        )

        expect(screen.getByDisplayValue(mission)).toBeInTheDocument()
        expect(screen.getByDisplayValue(problem)).toBeInTheDocument()
        expect(screen.getByDisplayValue(vision)).toBeInTheDocument()

        userEvent.type(screen.getByDisplayValue(mission), '!')
        userEvent.tab()

        expect(onFieldUpdatedMock).toHaveBeenCalledWith('mission', '!')

        onFieldUpdatedMock.mockReset()
        userEvent.type(screen.getByDisplayValue(problem), '!')
        userEvent.tab()

        expect(onFieldUpdatedMock).toHaveBeenCalledWith('problemStatement', '!')

        onFieldUpdatedMock.mockReset()
        userEvent.type(screen.getByDisplayValue(vision), '!')
        userEvent.tab()

        expect(onFieldUpdatedMock).toHaveBeenCalledWith('vision', '!')
    })

    test('should render with no data and no access', () => {
        const onFieldUpdatedMock = jest.fn()

        render(<ProductDetails onFieldUpdated = {onFieldUpdatedMock} hasEditAccess = {false} />)

        expect(screen.getByDisplayValue(/not have a Vision Statement./i)).toBeInTheDocument()

        userEvent.type(screen.getByDisplayValue(/not have a Vision Statement./i), '!')
        userEvent.tab()

        expect(onFieldUpdatedMock).not.toHaveBeenCalled()
    })

})