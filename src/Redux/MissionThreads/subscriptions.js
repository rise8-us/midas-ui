import { subscribe } from 'Utilities/requests'
import store from '../store'
import { requestDeleteMissionThread, requestUpdateMissionThread } from './actions'
import Constants from './constants'

const subscriptions = ({ stompClient }) => {

    subscribe(stompClient, Constants.WS_UPDATE_MISSION_THREAD, (msg) => {
        let payload = JSON.parse(msg.body)
        store.dispatch(requestUpdateMissionThread.fulfilled(payload))
    })

    subscribe(stompClient, Constants.WS_DELETE_MISSION_THREAD, (msg) => {
        let payload = JSON.parse(msg.body)
        store.dispatch(requestDeleteMissionThread.fulfilled(payload))
    })

}

export default subscriptions