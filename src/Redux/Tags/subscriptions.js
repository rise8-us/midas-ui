import { subscribe } from '../../Utilities/requests'
import store from '../store'
import { requestDeleteTag, requestUpdateTag } from './actions'
import Constants from './constants'

const subscriptions = ({ stompClient }) => {

    subscribe(stompClient, Constants.WS_UPDATE_TAG, (msg) => {
        let payload = JSON.parse(msg.body)
        store.dispatch(requestUpdateTag.fulfilled(payload))
    })

    subscribe(stompClient, Constants.WS_DELETE_TAG, (msg) => {
        let payload = JSON.parse(msg.body)
        store.dispatch(requestDeleteTag.fulfilled(payload.id))
    })

}

export default subscriptions