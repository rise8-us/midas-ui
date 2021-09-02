import { Stomp } from '@stomp/stompjs'
import PropTypes from 'prop-types'
import React, { createContext, useContext, useEffect, useState } from 'react'
import assertionSubscriptions from 'Redux/Assertions/subscriptions'
import commentSubscriptions from 'Redux/Comments/subscriptions'
import featureSubscriptions from 'Redux/Features/subscriptions'
import personaSubscriptions from 'Redux/Personas/subscriptions'
import portfolioSubscriptions from 'Redux/Portfolios/subscriptions'
import productSubscriptions from 'Redux/Products/subscriptions'
import projectSubscriptions from 'Redux/Projects/subscriptions'
import sourceControlSubscriptions from 'Redux/SourceControls/subscriptions'
import tagSubscriptions from 'Redux/Tags/subscriptions'
import teamSubscriptions from 'Redux/Teams/subscriptions'
import SockJS from 'sockjs-client'
import { getAPIURL } from 'Utilities/requests'

const WebsocketContext = createContext({})

export const useWebsocket = () => useContext(WebsocketContext)

let stompClient = Stomp.client(`${getAPIURL()}/midas-websocket`)

function WebsocketProvider({ children }) {

    const [connected, setConnected] = useState(false)

    const socketFactory = () => {
        return new SockJS(`${getAPIURL()}/midas-websocket`)
    }

    const onWebsocketClose = (error) => {
        setConnected(false)
        // https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent
        if (error.code !== 1002) {
            console.error(`WebSocket error code: ${error.code}`)
        }
    }

    const onConnectSuccess = () => {
        setConnected(true)
        assertionSubscriptions({ stompClient })
        commentSubscriptions({ stompClient })
        sourceControlSubscriptions({ stompClient })
        productSubscriptions({ stompClient })
        projectSubscriptions({ stompClient })
        tagSubscriptions({ stompClient })
        teamSubscriptions({ stompClient })
        portfolioSubscriptions({ stompClient })
        featureSubscriptions({ stompClient })
        personaSubscriptions({ stompClient })
    }

    const onConnectFailure = (error) => {
        console.error(error?.headers?.message)
    }


    useEffect(() => {
        stompClient.webSocketFactory = socketFactory
        stompClient.reconnectDelay = 5000
        stompClient.debug = function() { /* Turn off debugging */ }
        stompClient.onWebSocketClose = onWebsocketClose
        stompClient.onWebSocketError = onConnectFailure
        stompClient.onConnect = onConnectSuccess
        stompClient.activate()
    }, [])


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