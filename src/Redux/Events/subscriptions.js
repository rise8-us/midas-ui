import { subscribe } from 'Utilities/requests'
import store from '../store'
import { requestDeleteEvent, requestUpdateEvent } from './actions'
import Constants from './constants'

const subscriptions = ({ stompClient }) => {

    subscribe(stompClient, Constants.WS_UPDATE_EVENT, (msg) => {
        let payload = JSON.parse(msg.body)
        store.dispatch(requestUpdateEvent.fulfilled(payload))
    })

    subscribe(stompClient, Constants.WS_DELETE_EVENT, (msg) => {
        let payload = JSON.parse(msg.body)
        store.dispatch(requestDeleteEvent.fulfilled(payload.id))
    })

}

export default subscriptions