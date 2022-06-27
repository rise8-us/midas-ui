import { setEpicSyncProgress, setIssueSyncProgress, setReleaseSyncProgress } from 'Redux/AppSettings/reducer'
import { subscribe } from 'Utilities/requests'
import store from '../store'

const subscriptions = ({ stompClient }) => {

    subscribe(stompClient, '/fetchGitlabEpicsPagination', (msg) => {
        store.dispatch(setEpicSyncProgress(JSON.parse(msg.body)))
    })

    subscribe(stompClient, '/fetchGitlabIssuesPagination', (msg) => {
        store.dispatch(setIssueSyncProgress(JSON.parse(msg.body)))
    })

    subscribe(stompClient, '/fetchGitlabReleasesPagination', (msg) => {
        store.dispatch(setReleaseSyncProgress(JSON.parse(msg.body)))
    })

}

export default subscriptions