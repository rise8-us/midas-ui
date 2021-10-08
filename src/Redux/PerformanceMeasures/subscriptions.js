import { subscribe } from 'Utilities/requests'
import store from '../store'
import { requestDeletePerformanceMeasure, requestUpdatePerformanceMeasure } from './actions'
import Constants from './constants'

const subscriptions = ({ stompClient }) => {

    subscribe(stompClient, Constants.WS_UPDATE_PERFORMANCE_MEASURE, (msg) => {
        let payload = JSON.parse(msg.body)
        store.dispatch(requestUpdatePerformanceMeasure.fulfilled(payload))
    })

    subscribe(stompClient, Constants.WS_DELETE_PERFORMANCE_MEASURE, (msg) => {
        let payload = JSON.parse(msg.body)
        store.dispatch(requestDeletePerformanceMeasure.fulfilled(payload))
    })

}

export default subscriptions