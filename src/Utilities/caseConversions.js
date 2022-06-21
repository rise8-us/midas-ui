export const camelToCapitalCase = (stringToConvert) => {
    return stringToConvert.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())
}

export const snakeToCamel = (stringToConvert) => {
    return stringToConvert.toLowerCase().replace(/([_][a-z])/g, group =>
        group.toUpperCase().replaceAll('_', '')
    )
}

export const capitalize = (str) => str[0].toUpperCase() + str.slice(1)
