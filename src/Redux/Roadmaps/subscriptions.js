import { subscribe } from 'Utilities/requests'
import store from '../store'
import { requestDeleteRoadmap, requestUpdateRoadmap } from './actions'
import Constants from './constants'

const subscriptions = ({ stompClient }) => {

    subscribe(stompClient, Constants.WS_UPDATE_ROADMAP, (msg) => {
        let payload = JSON.parse(msg.body)
        store.dispatch(requestUpdateRoadmap.fulfilled(payload))
    })

    subscribe(stompClient, Constants.WS_DELETE_ROADMAP, (msg) => {
        let payload = JSON.parse(msg.body)
        store.dispatch(requestDeleteRoadmap.fulfilled(payload))
    })

}

export default subscriptions