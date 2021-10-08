import { subscribe } from 'Utilities/requests'
import store from '../store'
import { requestDeleteCapability, requestUpdateCapability } from './actions'
import Constants from './constants'

const subscriptions = ({ stompClient }) => {

    subscribe(stompClient, Constants.WS_UPDATE_CAPABILITY, (msg) => {
        let payload = JSON.parse(msg.body)
        store.dispatch(requestUpdateCapability.fulfilled(payload))
    })

    subscribe(stompClient, Constants.WS_DELETE_CAPABILITY, (msg) => {
        let payload = JSON.parse(msg.body)
        store.dispatch(requestDeleteCapability.fulfilled(payload))
    })

}

export default subscriptions