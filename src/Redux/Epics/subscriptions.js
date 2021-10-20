import { subscribe } from 'Utilities/requests'
import store from '../store'
import { requestHideEpic } from './actions'
import Constants from './constants'

const subscriptions = ({ stompClient }) => {

    subscribe(stompClient, Constants.WS_SYNC_EPIC, (msg) => {
        let payload = JSON.parse(msg.body)
        store.dispatch(requestHideEpic.fulfilled(payload))
    })

}

export default subscriptions