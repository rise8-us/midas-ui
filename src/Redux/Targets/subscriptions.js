import { subscribe } from 'Utilities/requests'
import store from '../store'
import { requestDeleteTarget, requestUpdateTarget } from './actions'
import Constants from './constants'

const subscriptions = ({ stompClient }) => {

    subscribe(stompClient, Constants.WS_UPDATE_TARGET, (msg) => {
        let payload = JSON.parse(msg.body)
        store.dispatch(requestUpdateTarget.fulfilled(payload))
    })

    subscribe(stompClient, Constants.WS_DELETE_TARGET, (msg) => {
        let payload = JSON.parse(msg.body)
        store.dispatch(requestDeleteTarget.fulfilled(payload.id))
    })

}

export default subscriptions