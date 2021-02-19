export const getAPIURL = () => {
    return 'http://localhost:8000'
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
