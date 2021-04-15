import { selectProjectById } from '../Projects/selectors'
import { selectTagsByIds } from '../Tags/selectors'

export const selectApplicationById = (state, id) => {
    const application = state.applications[id]
    if (!application) return {}

    const tags = selectTagsByIds(state, application.tagIds)
    const projects = application.projectIds.map(id => selectProjectById(state, id))

    const updatedApplication = { ...application, tags, projects }

    return updatedApplication
}

export const selectApplications = (state) => {
    const allApplications = state.applications
    if (!allApplications) return []

    return Object.values(state.applications).map(application => {
        return { ...application, tags: selectTagsByIds(state, application.tagIds) }
    })
}

export const selectUnarchivedApplicationIds = (state) => {
    return Object.values(state.applications).filter(a => !a.isArchived).map(a => a.id)
}

export const selectUnarchivedApplications = (state) => {
    return selectApplications(state).filter(a => !a.isArchived)
}