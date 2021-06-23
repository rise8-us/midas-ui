import { subscribe } from '../../Utilities/requests'
import Constants from '../Products/constants'
import store from '../store'
import { requestUpdatePortfolio } from './actions'

const subscriptions = ({ stompClient }) => {

    subscribe(stompClient, Constants.WS_UPDATE_PRODUCT, (msg) => {
        let payload = JSON.parse(msg.body)
        payload.type === 'PORTFOLIO' && store.dispatch(requestUpdatePortfolio.fulfilled(payload))
    })
}

export default subscriptions