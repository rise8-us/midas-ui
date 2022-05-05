import { selectPortfolioById } from 'Redux/Portfolios/selectors'
import { selectProductById } from 'Redux/Products/selectors'

export const selectEpicById = (state, id) => {
    const newEpic = {
        title: '',
        description: '',
        productName: undefined
    }

    if (state.epics[id]?.id > 0) {
        const product = selectProductById(state, state.epics[id].productId)
        const portfolio = selectPortfolioById(state, state.epics[id].portfolioId)
        return {
            ...state.epics[id],
            name: portfolio.name ? portfolio.name : product.name
        }
    }

    return newEpic
}

export const selectEpicsByProductId = (state, productId) => {
    const epics = state.epics
    if (!epics) return []

    return Object.values(epics).filter(epic => epic.productId === productId)
}

export const selectEpicsByIds = (state, ids) => {
    const epics = []
    ids.forEach(id => {
        const epic = selectEpicById(state, id)
        epic.id && epics.push(epic)
    })
    return epics
}