import { selectTagsByIds } from '../Tags/selectors'

export const selectProjectById = (state, id) => {
    const project = state.projects[id]
    if (!project) return {
        name: '',
        description: '',
        gitlabProjectId: '',
        tags: []
    }

    const tags = selectTagsByIds(state, project.tagIds)

    return {
        ...project,
        tags,
        description: project.description ?? '',
        gitlabProjectId: project.gitlabProjectId ?? '',
    }
}

export const selectProjects = (state) => {
    const allProjects = state.projects
    if (!allProjects) return []

    return Object.keys(allProjects).map(id => selectProjectById(state, id))
}

export const selectUnarchivedProjects = (state) => {
    return selectProjects(state).filter(p => !p.isArchived)
}

export const selectProjectsWithNoProductId = (state) => {
    return selectProjects(state).filter(p => p.productId === null)
}

export const selectProjectsByProductId = (state, productId) => {
    return selectProjects(state).filter(p => p.productId === productId)
}