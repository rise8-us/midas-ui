import * as selectors from './selectors'

const mockState = {
    features: {
        2: {
            id: 2,
            productId: 1,
            title: 'title',
            description: 'description',
            index: 0
        },
        3: {
            id: 3,
            productId: 1
        },
        4: {
            id: 4,
            productId: 6
        },
        5: {
            id: 5,
            productId: 1
        }
    },
}

test('selectFeatureById - returns default feature object', () => {
    const features = selectors.selectFeatureById({ features: {} }, 1)

    expect(features).toEqual({ title: '', description: '', index: 0 })
})

test('selectFeatureById - returns feature object', () => {
    const feature = selectors.selectFeatureById(mockState, 2)

    expect(feature).toEqual(mockState.features[2])
})


test('selectFeaturesByProductId - returns empty array', () => {
    const features = selectors.selectFeaturesByProductId({}, 1)

    expect(features).toHaveLength(0)
})

test('selectFeaturesByProductId - returns array of features', () => {
    const features = selectors.selectFeaturesByProductId(mockState, 1)

    expect(features).toHaveLength(3)
})
