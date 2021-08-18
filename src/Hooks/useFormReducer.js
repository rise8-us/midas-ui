function useFormReducer(state, action) {
    if (action.type === 'onChange') {
        return { ...state, [action.payload.name]: action.payload.value }
    } else {
        return state
    }
}

export default useFormReducer