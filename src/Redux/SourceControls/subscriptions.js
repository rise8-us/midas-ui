import { subscribe } from 'Utilities/requests'
import store from '../store'
import { requestUpdateSourceControl } from './actions'
import Constants from './constants'

const subscriptions = ({ stompClient }) => {

    subscribe(stompClient, Constants.WS_UPDATE_SOURCE_CONTROL, (msg) => {
        let payload = JSON.parse(msg.body)
        store.dispatch(requestUpdateSourceControl.fulfilled(payload))
    })
}

export default subscriptions