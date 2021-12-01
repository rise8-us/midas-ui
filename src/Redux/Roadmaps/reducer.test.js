import * as reduxActions from './actions'
import reducer from './reducer'

const allRoadmapsResponse = [
    {
        id: 1,
        title: 'roadmap1',
        description: 'description1',
        productId: 3,
        isSupported: true
    }, {
        id: 2,
        title: 'roadmap2',
        description: 'description2',
        productId: 3,
        isSupported: false,
        isHidden: false
    }
]

const updatedRoadmap = {
    id: 2,
    title: 'roadmap2',
    description: 'description2',
    productId: 3,
    isSupported: true
}

const deleteRoadmap = { id: 1 }
const hiddenRoadmap = { id: 2, isHidden: true }

describe('Roadmaps Reducer', () => {
    test('should handle initial state', () => {
        expect(reducer(undefined, {})).toEqual({})
    })

    test('fetches all roadmaps', () => {
        const actions = [{ type: reduxActions.requestFetchRoadmapsByProductId.fulfilled, payload: allRoadmapsResponse }]
        const state = actions.reduce(reducer, {})

        expect(state[1]).toEqual(allRoadmapsResponse[0])
        expect(state[2]).toEqual(allRoadmapsResponse[1])
        expect(Object.keys(state)).toHaveLength(2)
    })

    test('Create Roadmap', () => {
        const actions = [{ type: reduxActions.requestCreateRoadmap.fulfilled, payload: allRoadmapsResponse[0] }]
        const state = actions.reduce(reducer, {})
        expect(state).toEqual({ 1: allRoadmapsResponse[0] })
    })

    test('Update Roadmap', () => {
        const actions = [{ type: reduxActions.requestUpdateRoadmap.fulfilled, payload: updatedRoadmap }]
        const state = actions.reduce(reducer, { 2: allRoadmapsResponse[1] })
        expect(state).toEqual({ 2: updatedRoadmap })
    })

    test('Delete Roadmap', () => {
        const actions = [{ type: reduxActions.requestDeleteRoadmap.fulfilled, payload: deleteRoadmap }]
        const state = actions.reduce(reducer, { 1: allRoadmapsResponse[0] })
        expect(state).toEqual({})
    })

    test('Hide Roadmap', () => {
        const actions = [{ type: reduxActions.requestHideRoadmap.fulfilled, payload: hiddenRoadmap }]
        const state = actions.reduce(reducer, { 2: allRoadmapsResponse[1] })
        expect(state).toEqual({ 2: hiddenRoadmap })
    })
})