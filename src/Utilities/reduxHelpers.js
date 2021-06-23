export const setStateFromArray = (state, response) => {
    response.forEach(item => { state[item.id] = item })
}