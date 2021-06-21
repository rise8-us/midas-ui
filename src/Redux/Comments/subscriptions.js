import { subscribe } from '../../Utilities/requests'
import store from '../store'
import { requestDeleteComment, requestUpdateComment } from './actions'
import Constants from './constants'

const subscriptions = ({ stompClient }) => {

    subscribe(stompClient, Constants.WS_UPDATE_COMMENT, (msg) => {
        let payload = JSON.parse(msg.body)
        store.dispatch(requestUpdateComment.fulfilled(payload))
    })

    subscribe(stompClient, Constants.WS_DELETE_COMMENT, (msg) => {
        let payload = JSON.parse(msg.body)
        store.dispatch(requestDeleteComment.fulfilled(payload.id))
    })

}

export default subscriptions