import { Stomp } from '@stomp/stompjs'
import PropTypes from 'prop-types'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setInitialized } from 'Redux/AppSettings/reducer'
import { selectInitializedState } from 'Redux/AppSettings/selectors'
import assertionSubscriptions from 'Redux/Assertions/subscriptions'
import capabilitySubscriptions from 'Redux/Capabilities/subscriptions'
import commentSubscriptions from 'Redux/Comments/subscriptions'
import deliverableSubscriptions from 'Redux/Deliverables/subscriptions'
import epicSubscriptions from 'Redux/Epics/subscriptions'
import featureSubscriptions from 'Redux/Features/subscriptions'
import measureSubscriptions from 'Redux/Measures/subscriptions'
import missionThreadSubscriptions from 'Redux/MissionThreads/subscriptions'
import performanceMeasuresSubscriptions from 'Redux/PerformanceMeasures/subscriptions'
import personaSubscriptions from 'Redux/Personas/subscriptions'
import portfolioSubscriptions from 'Redux/Portfolios/subscriptions'
import productSubscriptions from 'Redux/Products/subscriptions'
import projectSubscriptions from 'Redux/Projects/subscriptions'
import releaseSubscriptions from 'Redux/Releases/subscriptions'
import { enqueueMessage, removeMessage } from 'Redux/Snackbar/reducer'
import sourceControlSubscriptions from 'Redux/SourceControls/subscriptions'
import tagSubscriptions from 'Redux/Tags/subscriptions'
import teamSubscriptions from 'Redux/Teams/subscriptions'
import SockJS from 'sockjs-client'
import { initializeApp } from 'Utilities/initializeApp'
import { getAPIURL } from 'Utilities/requests'
const WebsocketContext = createContext({})

export const useWebsocket = () => useContext(WebsocketContext)
//console.log('usewebscoket', useWebsocket)
let stompClient = Stomp.client(`${getAPIURL()}/midas-websocket`)

function WebsocketProvider({ children }) {

    const dispatch = useDispatch()

    const isInitialized = useSelector(selectInitializedState)
    console.log('isIniializedValue', isInitialized)
    const [connected, setConnected] = useState(false)

    const socketFactory = () => {
        return new SockJS(`${getAPIURL()}/midas-websocket`)
    }

    const onWebsocketClose = (error) => {
        console.log("onWebSocketClose")
        setConnected(false)
        dispatch(setInitialized(false))
        if (error.code !== 1002) {
            console.error(`WebSocket error code: ${error.code}`)
            dispatch(enqueueMessage({
                id: 'webSocketFailure',
                message: 'Lost connection to server!',
                severity: 'error',
                persist: true
            }))
        }
    }

    const onConnectSuccess = () => {
        setConnected(true)
        dispatch(removeMessage({ id: 'webSocketFailure' }))
        dispatch(enqueueMessage({
            id: 'webSocketSuccess',
            message: 'Connected to server!',
            severity: 'success'
        }))

        assertionSubscriptions({ stompClient })
        measureSubscriptions({ stompClient })
        capabilitySubscriptions({ stompClient })
        commentSubscriptions({ stompClient })
        deliverableSubscriptions({ stompClient })
        epicSubscriptions({ stompClient })
        featureSubscriptions({ stompClient })
        missionThreadSubscriptions({ stompClient })
        performanceMeasuresSubscriptions({ stompClient })
        personaSubscriptions({ stompClient })
        portfolioSubscriptions({ stompClient })
        productSubscriptions({ stompClient })
        projectSubscriptions({ stompClient })
        releaseSubscriptions({ stompClient })
        sourceControlSubscriptions({ stompClient })
        tagSubscriptions({ stompClient })
        teamSubscriptions({ stompClient })

        !isInitialized && initializeApp().catch(() => setInitialized(false))
    }

    const onConnectFailure = (error) => {
        dispatch(setInitialized(false))
        console.error(error?.headers?.message)
    }

    useEffect(() => {
        stompClient.webSocketFactory = socketFactory
        stompClient.reconnectDelay = 5000
        stompClient.debug = () => { /* turn off debug */ }
        stompClient.onWebSocketClose = onWebsocketClose
        stompClient.onWebSocketError = onConnectFailure
        stompClient.onConnect = onConnectSuccess
        stompClient.activate()
    }, [isInitialized])

    return (
        <WebsocketContext.Provider value = {{ connected: connected }}>
            {children}
        </WebsocketContext.Provider>
    )
}

WebsocketProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
}

export default WebsocketProvider
