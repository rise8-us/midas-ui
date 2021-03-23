import { getAPIURL } from './index'

test('getAPIRURL', () => {
    expect(getAPIURL()).toEqual('http://localhost:8000')
})