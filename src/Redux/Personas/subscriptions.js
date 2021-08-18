import { subscribe } from 'Utilities/requests'
import store from '../store'
import { requestDeletePersona, requestUpdatePersona } from './actions'
import Constants from './constants'

const subscriptions = ({ stompClient }) => {

    subscribe(stompClient, Constants.WS_UPDATE_PERSONA, (msg) => {
        let payload = JSON.parse(msg.body)
        store.dispatch(requestUpdatePersona.fulfilled(payload))
    })

    subscribe(stompClient, Constants.WS_DELETE_PERSONA, (msg) => {
        let payload = JSON.parse(msg.body)
        store.dispatch(requestDeletePersona.fulfilled(payload))
    })

}

export default subscriptions