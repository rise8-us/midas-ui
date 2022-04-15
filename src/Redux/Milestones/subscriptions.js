import { subscribe } from 'Utilities/requests'
import store from '../store'
import { requestDeleteMilestone, requestUpdateMilestone } from './actions'
import Constants from './constants'

const subscriptions = ({ stompClient }) => {

    subscribe(stompClient, Constants.WS_UPDATE_MILESTONE, (msg) => {
        let payload = JSON.parse(msg.body)
        store.dispatch(requestUpdateMilestone.fulfilled(payload))
    })

    subscribe(stompClient, Constants.WS_DELETE_MILESTONE, (msg) => {
        let payload = JSON.parse(msg.body)
        store.dispatch(requestDeleteMilestone.fulfilled(payload.id))
    })

}

export default subscriptions