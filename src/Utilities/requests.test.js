import axios from 'axios'
import * as requestUtils from './requests'

jest.mock('axios')

test('request - getAPIURL', () => {
    const apiUrl = requestUtils.getAPIURL()
    expect(apiUrl).toEqual('http://localhost:8000')
})

test('request - createAxiosRequest : data attached', () => {
    let requestAnswer = {
        method: 'GET',
        url: 'http://localhost:8000/info',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        data: {
            foo: 'bar'
        }
    }
    const request = requestUtils.createAxiosRequest('/info', 'GET', { 'foo': 'bar' })
    expect(request).toEqual(requestAnswer)
})

test('request - createAxiosRequest : no data', () => {
    let requestAnswer = {
        method: 'GET',
        url: 'http://localhost:8000/info',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }
    const request = requestUtils.createAxiosRequest('/info', 'GET')
    expect(request).toEqual(requestAnswer)
})

test('Handles async thunk', async() => {
    const data = { test: 'data' }
    const response = {
        status: 200,
        data: data
    }
    axios.mockResolvedValueOnce(response)
    const request = { endpoint: '/api/teams', method: 'GET', body: data }
    const result = await requestUtils.handleThunkRequest(request, () => {})
    expect(result).toEqual(data)
})

test('Handle async thunk: reject array of erros', async() => {
    const errorResponse = {
        response: {
            data: { errors: ['error1'] }
        }
    }
    axios.mockImplementation(() =>  Promise.reject(errorResponse))
    const request = { endpoint: '/api/teams', method: 'GET', body: {} }
    const result = await requestUtils.handleThunkRequest(request, () => errorResponse.response.data.errors[0])
    expect(result).toEqual('error1')
})

test('Handles async thunk: reject error message', async() => {
    const errorResponse = {
        response: {
            data: { message: 'error1' }
        }
    }
    axios.mockImplementation(() => Promise.reject(errorResponse))
    const request = { endpoint: '/api/teams', method: 'GET', body: {} }
    const result = await requestUtils.handleThunkRequest(request, () => errorResponse.response.data.message)
    expect(result).toEqual('error1')
})

test('Handles async thunk: reject no match', async() => {
    const errorResponse = {
        response: {
            data: { error: 'error1' }
        }
    }
    axios.mockImplementation(() => Promise.reject(errorResponse))
    const request = { endpoint: '/api/teams', method: 'GET', body: {} }
    const result = await requestUtils.handleThunkRequest(request, () => 'Unknown error occured')
    expect(result).toEqual('Unknown error occured')
})
