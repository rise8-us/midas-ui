import { subscribe } from '../../Utilities/requests'
import store from '../store'
import { requestDeleteAssertion, requestUpdateAssertion } from './actions'
import Constants from './constants'

const subscriptions = ({ stompClient }) => {

    subscribe(stompClient, Constants.WS_UPDATE_ASSERTION, (msg) => {
        let payload = JSON.parse(msg.body)
        store.dispatch(requestUpdateAssertion.fulfilled(payload))
    })

    subscribe(stompClient, Constants.WS_DELETE_ASSERTION, (msg) => {
        let payload = JSON.parse(msg.body)
        store.dispatch(requestDeleteAssertion.fulfilled(payload.id))
    })

}

export default subscriptions