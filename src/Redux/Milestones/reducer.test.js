import * as reduxActions from './actions'
import reducer from './reducer'

const allMilestonesResponse = [
    {
        id: 4,
        title: 'Midas Milestone',
        description: null,
        dueDate: '2022-04-30',
        portfolioId: 1
    },
    {
        id: 5,
        title: 'Something Milestone',
        description: 'Something Milestone',
        dueDate: '2022-03-31',
        portfolioId: 1
    },
    {
        id: 6,
        title: 'Something Milestone 2',
        description: 'Something Milestone 2',
        dueDate: '2022-03-31',
        portfolioId: 2
    },
]

const updatedMilestone = { id: 4, title: 'updated' }
const deletedMilestone = { id: 6 }

describe('Milestones Reducer', () => {
    test('should handle initial state', () => {
        expect(reducer(undefined, {})).toEqual({})
    })

    test('fetches all Milestones by Search', () => {
        const actions = [{ type: reduxActions.requestSearchMilestones.fulfilled, payload: allMilestonesResponse }]
        const state = actions.reduce(reducer, {})

        expect(Object.keys(state)).toHaveLength(3)
    })

    test('Create Milestone', () => {
        const actions = [{ type: reduxActions.requestCreateMilestone.fulfilled,
            payload: allMilestonesResponse[0] }]
        const state = actions.reduce(reducer, {})
        expect(state).toEqual({ 4: allMilestonesResponse[0] })
    })

    test('Update Milestone', () => {
        const actions = [{ type: reduxActions.requestUpdateMilestone.fulfilled,
            payload: updatedMilestone }]
        const state = actions.reduce(reducer, { 4: allMilestonesResponse[1] })
        expect(state).toEqual({ 4: updatedMilestone })
    })

    test('Delete Milestone', () => {
        const actions = [{ type: reduxActions.requestDeleteMilestone.fulfilled,
            payload: deletedMilestone }]
        const state = actions.reduce(reducer, { 6: allMilestonesResponse[2] })
        expect(state).toEqual({})
    })
})