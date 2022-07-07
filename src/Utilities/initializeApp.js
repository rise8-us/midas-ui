
import { setInitialized } from 'Redux/AppSettings/reducer'
import { requestFetchInit } from 'Redux/Init/actions'
import { requestFetchAllPortfolios } from 'Redux/Portfolios/actions'
import { requestFetchAllProducts } from 'Redux/Products/actions'
import { requestFetchAllProjects } from 'Redux/Projects/actions'
import { requestFetchAllSourceControls } from 'Redux/SourceControls/actions'
import store from 'Redux/store'
import { requestFetchAllTags } from 'Redux/Tags/actions'
import { requestFetchAllTeams } from 'Redux/Teams/actions'

export const initializeApp = async() => {
    const init = await store.dispatch(requestFetchInit())

    return new Promise((resolve, reject) => {
        if (init.meta.requestStatus !== 'fulfilled') {
            console.error('INIT FAILED')
            return reject(init.error.message)
        }
        store.dispatch(setInitialized(true))
        store.dispatch(requestFetchAllPortfolios())
        store.dispatch(requestFetchAllProducts())
        store.dispatch(requestFetchAllProjects())
        store.dispatch(requestFetchAllSourceControls())
        store.dispatch(requestFetchAllTags())
        store.dispatch(requestFetchAllTeams())

        resolve('INIT SUCCESS')
    })
}
