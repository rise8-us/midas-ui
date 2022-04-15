import * as reduxActions from './actions'
import reducer from './reducer'

const allEventsResponse = [
    {
        id: 4,
        title: 'Midas Event',
        description: null,
        dueDate: '2022-04-30',
        portfolioId: 1
    },
    {
        id: 5,
        title: 'Something Event',
        description: 'Something Event',
        dueDate: '2022-03-31',
        portfolioId: 1
    },
    {
        id: 6,
        title: 'Something Event 2',
        description: 'Something Event 2',
        dueDate: '2022-03-31',
        portfolioId: 2
    },
]

const updatedEvent = { id: 4, title: 'updated' }
const deletedEvent = { id: 6 }

describe('Events Reducer', () => {
    test('should handle initial state', () => {
        expect(reducer(undefined, {})).toEqual({})
    })

    test('fetches all Events by Search', () => {
        const actions = [{ type: reduxActions.requestSearchEvents.fulfilled, payload: allEventsResponse }]
        const state = actions.reduce(reducer, {})

        expect(Object.keys(state)).toHaveLength(3)
    })

    test('Create Event', () => {
        const actions = [{ type: reduxActions.requestCreateEvent.fulfilled,
            payload: allEventsResponse[0] }]
        const state = actions.reduce(reducer, {})
        expect(state).toEqual({ 4: allEventsResponse[0] })
    })

    test('Update Event', () => {
        const actions = [{ type: reduxActions.requestUpdateEvent.fulfilled,
            payload: updatedEvent }]
        const state = actions.reduce(reducer, { 4: allEventsResponse[1] })
        expect(state).toEqual({ 4: updatedEvent })
    })

    test('Delete Event', () => {
        const actions = [{ type: reduxActions.requestDeleteEvent.fulfilled,
            payload: deletedEvent }]
        const state = actions.reduce(reducer, { 6: allEventsResponse[2] })
        expect(state).toEqual({})
    })
})