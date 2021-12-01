import { subscribe } from 'Utilities/requests'
import store from '../store'
import { requestDeleteMeasure, requestUpdateMeasure } from './actions'
import Constants from './constants'

const subscriptions = ({ stompClient }) => {

    subscribe(stompClient, Constants.WS_UPDATE_MEASURE, (msg) => {
        let payload = JSON.parse(msg.body)
        store.dispatch(requestUpdateMeasure.fulfilled(payload))
    })

    subscribe(stompClient, Constants.WS_DELETE_MEASURE, (msg) => {
        let payload = JSON.parse(msg.body)
        store.dispatch(requestDeleteMeasure.fulfilled(payload))
    })

}

export default subscriptions