import Axios from 'axios'

export const handleThunkRequest = async({ endpoint, method, body }, rejectWithValue) => {
    const request = createAxiosRequest(endpoint, method, body)
    try {
        const response = await Axios(request)
        return response.data
    } catch (error) {
        if (error.response.data.errors) {
            return rejectWithValue(error.response.data.errors)
        } else if (error.response.data.message) {
            return rejectWithValue([error.response.data.message])
        } else {
            return rejectWithValue('Unknown error occured')
        }
    }
}

export const getAPIURL = () => {
    return window.REACT_APP_API_URL ?? 'http://localhost:8000'
}

export const createAxiosRequest = (routeSuffix, method, body) => {
    let request = {
        method: method,
        url: getAPIURL() + routeSuffix,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }
    if (body) request.data = body
    return request
}
