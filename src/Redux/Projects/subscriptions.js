import { subscribe } from '../../Utilities/requests'
import store from '../store'
import { requestUpdateProject } from './actions'
import Constants from './constants'

const subscriptions = ({ stompClient }) => {

    subscribe(stompClient, Constants.WS_UPDATE_PROJECT, (msg) => {
        let payload = JSON.parse(msg.body)
        store.dispatch(requestUpdateProject.fulfilled(payload))
    })

}

export default subscriptions