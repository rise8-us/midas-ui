import * as reduxActions from './actions'
import reducer from './reducer'

const allFeaturesResponse = [
    {
        description: 'description1',
        id: 1,
        index: 0,
        productId: 3,
        title: 'Feature1',
    }, {
        description: 'description2',
        id: 2,
        index: 1,
        productId: 3,
        title: 'Feature2',
    }
]

const updatedFeature = {
    description: 'description2',
    id: 2,
    index: 2,
    productId: 3,
    title: 'Feature2',
}

const deleteFeature = { id: 1 }

describe('Features Reducer', () => {
    test('should handle initial state', () => {
        expect(reducer(undefined, {})).toEqual({})
    })

    test('fetches all Features', () => {
        const actions = [{ type: reduxActions.requestFetchFeaturesByProductId.fulfilled, payload: allFeaturesResponse }]
        const state = actions.reduce(reducer, {})

        expect(state[1]).toEqual(allFeaturesResponse[0])
        expect(state[2]).toEqual(allFeaturesResponse[1])
        expect(Object.keys(state)).toHaveLength(2)
    })

    test('Updates Features Bulk', () => {
        const actions = [{ type: reduxActions.requestUpdateFeaturesBulk.fulfilled, payload: allFeaturesResponse }]
        const state = actions.reduce(reducer, {})

        expect(state[1]).toEqual(allFeaturesResponse[0])
        expect(state[2]).toEqual(allFeaturesResponse[1])
        expect(Object.keys(state)).toHaveLength(2)
    })

    test('Create Feature', () => {
        const actions = [{ type: reduxActions.requestCreateFeature.fulfilled, payload: allFeaturesResponse[0] }]
        const state = actions.reduce(reducer, {})
        expect(state).toEqual({ 1: allFeaturesResponse[0] })
    })

    test('Update Feature', () => {
        const actions = [{ type: reduxActions.requestUpdateFeature.fulfilled, payload: updatedFeature }]
        const state = actions.reduce(reducer, { 2: allFeaturesResponse[1] })
        expect(state).toEqual({ 2: updatedFeature })
    })

    test('Delete Feature', () => {
        const actions = [{ type: reduxActions.requestDeleteFeature.fulfilled, payload: deleteFeature }]
        const state = actions.reduce(reducer, { 1: allFeaturesResponse[0] })
        expect(state).toEqual({})
    })
})