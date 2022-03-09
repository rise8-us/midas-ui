export const camelToCapitalCase = (stringToConvert) => {
    return stringToConvert.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())
}