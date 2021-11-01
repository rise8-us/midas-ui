import { subscribe } from 'Utilities/requests'
import store from '../store'
import { requestUpdateTeam } from './actions'
import Constants from './constants'

const subscriptions = ({ stompClient }) => {

    subscribe(stompClient, Constants.WS_UPDATE_TEAM, (msg) => {
        let payload = JSON.parse(msg.body)
        store.dispatch(requestUpdateTeam.fulfilled(payload))
    })

}

export default subscriptions