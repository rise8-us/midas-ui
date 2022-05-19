import { subscribe } from 'Utilities/requests'
import store from '../store'
import { requestDeleteWin, requestUpdateWin } from './actions'
import Constants from './constants'

const subscriptions = ({ stompClient }) => {

    subscribe(stompClient, Constants.WS_UPDATE_WIN, (msg) => {
        let payload = JSON.parse(msg.body)
        store.dispatch(requestUpdateWin.fulfilled(payload))
    })

    subscribe(stompClient, Constants.WS_DELETE_WIN, (msg) => {
        let payload = JSON.parse(msg.body)
        store.dispatch(requestDeleteWin.fulfilled(payload.id))
    })

}

export default subscriptions