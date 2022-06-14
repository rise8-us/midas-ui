import { setEpicSyncProgress, setIssueSyncProgress } from 'Redux/AppSettings/reducer'
import { subscribe } from 'Utilities/requests'
import store from '../store'

const subscriptions = ({ stompClient, connectedUser }) => {

    subscribe(stompClient, `/${connectedUser.keycloakUid}/queue/fetchGitlabEpicsPagination`, (msg) => {
        store.dispatch(setEpicSyncProgress(JSON.parse(msg.body)))
    }, '/user')

    subscribe(stompClient, `/${connectedUser.keycloakUid}/queue/fetchGitlabIssuesPagination`, (msg) => {
        store.dispatch(setIssueSyncProgress(JSON.parse(msg.body)))
    }, '/user')

}

export default subscriptions