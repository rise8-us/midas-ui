import { subscribe } from 'Utilities/requests'
import store from '../store'
import { requestDeleteRelease, requestUpdateRelease } from './actions'
import Constants from './constants'

const subscriptions = ({ stompClient }) => {

    subscribe(stompClient, Constants.WS_UPDATE_Release, (msg) => {
        let payload = JSON.parse(msg.body)
        store.dispatch(requestUpdateRelease.fulfilled(payload))
    })

    subscribe(stompClient, Constants.WS_DELETE_Release, (msg) => {
        let payload = JSON.parse(msg.body)
        store.dispatch(requestDeleteRelease.fulfilled(payload))
    })

}

export default subscriptions