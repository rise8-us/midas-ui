import { subscribe } from '../../Utilities/requests'
import store from '../store'
import { requestUpdatePortfolio } from './actions'
import Constants from './constants'

const subscriptions = ({ stompClient }) => {

    subscribe(stompClient, Constants.WS_UPDATE_PORTFOLIO, (msg) => {
        let payload = JSON.parse(msg.body)
        store.dispatch(requestUpdatePortfolio.fulfilled(payload))
    })
}

export default subscriptions