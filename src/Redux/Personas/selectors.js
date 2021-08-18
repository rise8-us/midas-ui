
export const selectPersonaById = (state, id) => {
    const persona = state.personas[id]
    if (!persona) return {
        title: '',
        description: '',
        isSupported: false,
    }

    return persona
}

export const selectPersonasByProductId = (state, productId) => {
    const personas = state.personas
    if (!personas) return []

    return Object.values(personas).filter(persona => persona.productId === productId)
}