export const DateInDisplayOrder = (date) => {
    if (date !== null && typeof date === 'string') {
        const splitDate = date.split('-')
        return splitDate[1] + '-' + splitDate[2] + '-' + splitDate[0]
    } else {
        return null
    }
}

export const DateInDatabaseOrder = (date) => {
    if (date !== null && typeof date === 'string') {
        const splitDate = date.split('-')
        return splitDate[2] + '-' + splitDate[0] + '-' + splitDate[1]
    } else {
        return null
    }
}