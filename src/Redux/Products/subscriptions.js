import { subscribe } from '../../Utilities/requests'
import store from '../store'
import { requestUpdateProduct } from './actions'
import Constants from './constants'

const subscriptions = ({ stompClient }) => {

    subscribe(stompClient, Constants.WS_UPDATE_PRODUCT, (msg) => {
        let payload = JSON.parse(msg.body)
        payload.type === 'PRODUCT' && store.dispatch(requestUpdateProduct.fulfilled(payload))
    })
}

export default subscriptions