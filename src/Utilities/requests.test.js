import axios from 'axios'
import fileDownload from 'js-file-download'
import * as requestUtils from './requests'

jest.mock('axios')
jest.mock('js-file-download')

describe('requests', () => {

    test('createAxiosDownloadRequest', () => {
        let answer = {
            method: 'GET',
            url: 'http://localhost:8000/info',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Content-Disposition': 'attachment'
            },
            responseType: 'blob',
        }
        const demand = requestUtils.createAxiosDownloadRequest('/info', 'GET')
        expect(demand).toEqual(answer)
    })

    test('createAxiosRequest : data attached', () => {
        const answer = {
            method: 'GET',
            url: 'http://localhost:8000/info',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            responseType: 'json',
            data: {
                foo: 'bar'
            }
        }
        const demand = requestUtils.createAxiosRequest('/info', 'GET', { 'foo': 'bar' })
        expect(demand).toEqual(answer)
    })

    test('createAxiosRequest : no data', () => {
        let answer = {
            method: 'GET',
            url: 'http://localhost:8000/info',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            responseType: 'json',
        }
        const demand = requestUtils.createAxiosRequest('/info', 'GET')
        expect(demand).toEqual(answer)
    })

    test('Handles async thunk - application/json', async() => {
        const data = { test: 'data' }
        const response = {
            status: 200,
            data: data
        }
        axios.mockResolvedValueOnce(response)
        const demand = { endpoint: '/api/teams', method: 'GET', body: data }
        const result = await requestUtils.handleThunkRequest(demand, () => { /* Empty */ })
        expect(result).toEqual(data)
    })

    test('Handles async thunk: reject array of errors', async() => {
        const errorResponse = {
            response: {
                data: { errors: ['error1'] }
            }
        }
        axios.mockImplementation(() =>  Promise.reject(errorResponse))
        const demand = { endpoint: '/api/teams', method: 'GET', body: {} }
        const result = await requestUtils.handleThunkRequest(demand, () => errorResponse.response.data.errors[0])
        expect(result).toEqual('error1')
    })

    test('Handles async thunk: reject error message', async() => {
        const errorResponse = {
            response: {
                data: { message: 'error1' }
            }
        }
        axios.mockImplementation(() => Promise.reject(errorResponse))
        const demand = { endpoint: '/api/teams', method: 'GET', body: {} }
        const result = await requestUtils.handleThunkRequest(demand, () => errorResponse.response.data.message)
        expect(result).toEqual('error1')
    })

    test('Handles async thunk: reject no match', async() => {
        const errorResponse = {
            response: {
                data: { error: 'error1' }
            }
        }
        axios.mockImplementation(() => Promise.reject(errorResponse))
        const demand = { endpoint: '/api/teams', method: 'GET', body: {} }
        const result = await requestUtils.handleThunkRequest(demand, () => 'Unknown error occured')
        expect(result).toEqual('Unknown error occured')
    })

    test('Handles async thunk - blob', async() => {
        const data = { fileName: 'data' }
        const response = {
            status: 200,
            data: data
        }
        axios.mockResolvedValueOnce(response)
        fileDownload.mockResolvedValueOnce(true)
        const demand = { endpoint: '/api/teams', method: 'GET', body: data }
        await requestUtils.handleThunkDownloadRequest(demand, () => { /* Empty */ })
        expect(fileDownload).toHaveBeenCalledWith(data, 'data')
    })

    test('Handles async thunk : errors - blob', async() => {
        const errorResponse = {
            response: {
                data: { error: 'error42' }
            }
        }

        axios.mockImplementation(() => Promise.reject(errorResponse))
        fileDownload.mockImplementation(() => Promise.reject(errorResponse))
        const demand = { endpoint: '/some/download', method: 'GET', body: {} }
        const result = await requestUtils.handleThunkDownloadRequest(demand, () => 'Unknown error occured')
        expect(result).toEqual('Unknown error occured')
    })

    test('should create query string', () => {
        expect(requestUtils.buildOrQueryByIds([1, 2])).toEqual('id:1 OR id:2')
    })
})