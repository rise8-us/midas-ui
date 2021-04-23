export const getUrlParam = (param) => {
    const pathName = window.location.pathname
    const pathArray = pathName.split('/')
    let paramIndex = pathArray.indexOf(param)
    let paramValue = pathArray[paramIndex + 1]
    return paramValue
}
