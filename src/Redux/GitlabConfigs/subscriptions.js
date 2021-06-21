import { subscribe } from '../../Utilities/requests'
import store from '../store'
import { requestUpdateGitlabConfig } from './actions'
import Constants from './constants'

const subscriptions = ({ stompClient }) => {

    subscribe(stompClient, Constants.WS_UPDATE_GITLABCONFIG, (msg) => {
        let payload = JSON.parse(msg.body)
        store.dispatch(requestUpdateGitlabConfig.fulfilled(payload))
    })
}

export default subscriptions