import Axios from 'axios'
import fileDownload from 'js-file-download'

export const getAPIURL = () => window.REACT_APP_API_URL ?? 'http://localhost:8000'

const handleErrors = async(error, action) => {
    if (error.response.data.errors) {
        return action(error.response.data.errors)
    } else if (error.response.data.message) {
        return action([error.response.data.message])
    } else {
        return action('Unknown error occured')
    }
}

export const handleThunkRequest = async({ endpoint, method, body = {}}, rejectWithValue) => {
    const request = createAxiosRequest(endpoint, method, body)
    try {
        const response = await Axios(request)
        return response.data
    } catch (error) {
        return handleErrors(error, rejectWithValue)
    }
}

export const handleThunkDownloadRequest = async({ endpoint, method, body = {} }, rejectWithValue) => {
    const request = createAxiosDownloadRequest(endpoint, method, body)
    try {
        const response = await Axios(request)
        return fileDownload(response.data, body?.fileName ?? 'unknown-file')
    } catch (error) {
        return handleErrors(error, rejectWithValue)
    }
}

export const createAxiosDownloadRequest = (routeSuffix, method, body) => {
    let request = createAxiosRequest(routeSuffix, method, body)
    request.responseType = 'blob'
    request.headers['Content-Disposition'] = 'attachment'

    return request
}

export const createAxiosRequest = (routeSuffix, method, body) => {
    let request = {
        method: method,
        url: getAPIURL() + routeSuffix,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        responseType: 'json'
    }
    if (body) request.data = body
    return request
}

export const subscribe = (selectedStompClient, topic, callback, prefix = '/topic') => {
    selectedStompClient.subscribe(prefix + topic, callback)
}

export const buildOrQueryByIds = (ids, prefix = '') => ids.map(id => `${prefix}id:${id}`).join(' OR ')

export const isLoading = (loading, condition = true) => condition && loading