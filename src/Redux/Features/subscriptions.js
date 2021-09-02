import { subscribe } from 'Utilities/requests'
import store from '../store'
import { requestDeleteFeature, requestUpdateFeature } from './actions'
import Constants from './constants'

const subscriptions = ({ stompClient }) => {

    subscribe(stompClient, Constants.WS_UPDATE_FEATURE, (msg) => {
        let payload = JSON.parse(msg.body)
        store.dispatch(requestUpdateFeature.fulfilled(payload))
    })

    subscribe(stompClient, Constants.WS_DELETE_FEATURE, (msg) => {
        let payload = JSON.parse(msg.body)
        store.dispatch(requestDeleteFeature.fulfilled(payload))
    })

}

export default subscriptions