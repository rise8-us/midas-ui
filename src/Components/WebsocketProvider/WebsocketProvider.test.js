import React from 'react'
import { render, useDispatchMock, useModuleMock, useSelectorMock } from 'Utilities/test-utils'
import { WebsocketProvider } from './index'
//import WebSocket from 'ws'
//import { startServer, waitForSocketState } from './webSocketTestUtils'
//const port = 3000




describe('<WebsocketProvider />', () =>  {
    jest.setTimeout(30000)
    //const onWebsocketCloseMock = useModuleMock('Utilities/initializeApp', 'initializeApp')
    // let server
    // beforeAll(async() => {
    //     server = await startServer(port)
    // })
    // afterAll(() => server.close())

    const setInitializedMock = useModuleMock('Redux/AppSettings/reducer', 'setInitialized')
    const enqueueMessageMock = useModuleMock('Redux/Snackbar/reducer', 'enqueueMessage')
    const removeMessageMock = useModuleMock('Redux/Snackbar/reducer', 'removeMessage')


    beforeEach(() => {
        useDispatchMock().mockReturnValue({})
    })

    test.only('should render', () => {
        useSelectorMock().mockReturnValue(false)
        setInitializedMock.mockReturnValue(true)

        render(<WebsocketProvider value = {{ connected: true }}> </WebsocketProvider>)

        //expect(await )
        //Children need to be added to component on render (Maybe mock?)
        // screen.debug()

    })

    // test('Server echoes the message it receives from client', async() => {
    //     // Create test client
    //     const client = new WebSocket(`ws://localhost:${port}`)
    //     await waitForSocketState(client, client.OPEN)
    //     const testMessage = 'This is a test message'
    //     let responseMessage
    //     client.on('message', (data) => {
    //         responseMessage = data
    //         // Close the client after it receives the response
    //         client.close()
    //     })
    //     // Send client message
    //     client.send(testMessage)

    //     // Perform assertions on the response
    //     await waitForSocketState(client, client.CLOSED)
    //     expect(responseMessage).toBe(testMessage)
    // })

})