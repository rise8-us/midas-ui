import { createAxiosRequest, getAPIURL } from './requests'

test('request - getAPIURL', () => {
    const apiUrl = getAPIURL()
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
    const request = createAxiosRequest('/info', 'GET', { 'foo': 'bar' })
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
    const request = createAxiosRequest('/info', 'GET')
    expect(request).toEqual(requestAnswer)
})