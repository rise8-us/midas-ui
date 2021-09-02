import React from 'react'
import { fireEvent, render, screen, useDispatchMock, useModuleMock, userEvent } from 'Utilities/test-utils'
import { ProductFeatures } from './index'

describe('<ProductFeatures>', () => {
    const selectFeaturesByProductId = useModuleMock('Redux/Features/selectors', 'selectFeaturesByProductId')
    const requestCreateFeatureMock = useModuleMock('Redux/Features/actions', 'requestCreateFeature')
    const requestUpdateFeatureMock = useModuleMock('Redux/Features/actions', 'requestUpdateFeature')
    const requestUpdateFeaturesBulkMock = useModuleMock('Redux/Features/actions', 'requestUpdateFeaturesBulk')
    const requestDeleteFeatureMock = useModuleMock('Redux/Features/actions', 'requestDeleteFeature')

    const onDragEndMock = useModuleMock('Utilities/draggable', 'onDragEnd')

    const features = [
        {
            id: 1,
            productId: 3,
            title: 'feature 1',
            index: 0
        }, {
            id: 2,
            productId: 3,
            title: 'feature 2',
            index: 1
        }, {
            id: 4,
            productId: 3,
            title: 'feature 3',
            index: 2
        }
    ]

    const newFeatureOrder = [
        { ...features[2], index: 0 },
        features[1],
        { ...features[0], index: 2 }
    ]

    beforeEach(() => {
        useDispatchMock().mockReturnValue({})
    })

    test('should render', () => {
        selectFeaturesByProductId.mockReturnValue(features)

        render(<ProductFeatures productId = {3}/>)

        expect(screen.getByText('FEATURES')).toBeInTheDocument()
        expect(screen.getByDisplayValue('feature 1')).toBeInTheDocument()
        expect(screen.getByDisplayValue('feature 2')).toBeInTheDocument()
    })

    test('should call createFeature', () => {
        selectFeaturesByProductId.mockReturnValue([features[0]])

        render(<ProductFeatures productId = {3} hasEdit/>)

        userEvent.type(screen.getByPlaceholderText('Add new feature...'), 'a new thing{enter}')

        expect(requestCreateFeatureMock).toHaveBeenCalled()
    })

    test('should call updateFeature', () => {
        selectFeaturesByProductId.mockReturnValue([features[0]])

        render(<ProductFeatures productId = {3} hasEdit/>)

        userEvent.type(screen.getByDisplayValue('feature 1'), '!{enter}')

        expect(requestUpdateFeatureMock).toHaveBeenCalled()
    })

    test('should call deleteFeature', () => {
        selectFeaturesByProductId.mockReturnValue([features[0]])

        render(<ProductFeatures productId = {3} hasEdit/>)

        fireEvent.mouseEnter(screen.getByTestId('FeatureEntry__container'))
        fireEvent.click(screen.getByTitle('Delete'))

        expect(requestDeleteFeatureMock).toHaveBeenCalled()
    })

    test('should call updateFeaturesBulk', () => {
        selectFeaturesByProductId.mockReturnValue(features)
        onDragEndMock.mockImplementation((_a, _b, passedThroughFn) => {
            passedThroughFn(newFeatureOrder)
        })

        render(<ProductFeatures productId = {3} hasEdit/>)

        const entries = screen.getAllByTestId('DraggableFeatureList__draggable')

        fireEvent.mouseDown(entries[2])
        fireEvent.mouseMove(entries[2], { clientX: 5, clientY: 5 })
        fireEvent.mouseUp(entries[2])
        fireEvent.dragEnd(entries[2])

        expect(requestUpdateFeaturesBulkMock).toHaveBeenCalledWith(newFeatureOrder)
    })

})