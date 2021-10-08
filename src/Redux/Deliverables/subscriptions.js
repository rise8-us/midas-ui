import { subscribe } from 'Utilities/requests'
import store from '../store'
import { requestDeleteDeliverable, requestUpdateDeliverable } from './actions'
import Constants from './constants'

const subscriptions = ({ stompClient }) => {

    subscribe(stompClient, Constants.WS_UPDATE_DELIVERABLE, (msg) => {
        let payload = JSON.parse(msg.body)
        store.dispatch(requestUpdateDeliverable.fulfilled(payload))
    })

    subscribe(stompClient, Constants.WS_DELETE_DELIVERABLE, (msg) => {
        let payload = JSON.parse(msg.body)
        store.dispatch(requestDeleteDeliverable.fulfilled(payload))
    })

}

export default subscriptions