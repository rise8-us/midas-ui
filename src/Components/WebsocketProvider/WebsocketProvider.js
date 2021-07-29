import { Stomp } from '@stomp/stompjs'
import PropTypes from 'prop-types'
import React, { createContext, useContext, useEffect, useState } from 'react'
import SockJS from 'sockjs-client'
import assertionSubscriptions from '../../Redux/Assertions/subscriptions'
import commentSubscriptions from '../../Redux/Comments/subscriptions'
import portfolioSubscriptions from '../../Redux/Portfolios/subscriptions'
import productSubscriptions from '../../Redux/Products/subscriptions'
import projectSubscriptions from '../../Redux/Projects/subscriptions'
import sourceControlSubscriptions from '../../Redux/SourceControls/subscriptions'
import tagSubscriptions from '../../Redux/Tags/subscriptions'
import teamSubscriptions from '../../Redux/Teams/subscriptions'
import { getAPIURL } from '../../Utilities/requests'

const WebsocketContext = createContext({})

export const useWebsocket = () => useContext(WebsocketContext)

let stompClient

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
    }

    const onConnectFailure = (error) => {
        console.error(error?.headers?.message)
    }


    useEffect(() => {
        stompClient = Stomp.over(socketFactory)
        stompClient.reconnectDelay = 5000
        stompClient.debug = function() { /* Turn off debugging */ }
        stompClient.onWebSocketClose = onWebsocketClose
        stompClient.connect(
            {},
            onConnectSuccess,
            onConnectFailure
        )
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