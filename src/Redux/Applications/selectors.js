import { selectTagsByIds } from '../Tags/selectors'

export const getApplicationById = (state, id) => {
    const application = state.applications[id]
    if (!application) return {}

    const tags = selectTagsByIds(state, application.tagIds)
    const updatedApplication = { ...application, tags }

    return updatedApplication
}

export const getApplications = (state) => {
    const allApplications = state.applications
    if (!allApplications) return []

    return Object.values(state.applications).map(application => {
        return { ...application, tags: selectTagsByIds(state, application.tagIds) }
    })
}

export const getUnarchivedApplications = (state) => {
    return getApplications(state).filter(p => !p.isArchived)
}