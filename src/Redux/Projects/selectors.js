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

    const updatedProject = {
        ...project,
        tags,
        description: project.description ?? '',
        gitlabProjectId: project.gitlabProjectId ?? '',
    }

    return updatedProject
}

export const selectProjects = (state) => {
    const allProjects = state.projects
    if (!allProjects) return []

    return Object.keys(allProjects).map(id => {
        return selectProjectById(state, id)
    })
}

export const selectUnarchivedProjects = (state) => {
    return selectProjects(state).filter(p => !p.isArchived)
}

export const selectNoAppIdProjects = (state) => {
    return selectProjects(state).filter(p => p.productId === null)
}