import { selectTagsByIds } from '../Tags/selectors'

export const getProjectById = (state, id) => {
    const project = state.projects[id]
    if (!project) return {}

    const tags = selectTagsByIds(state, project.tagIds)
    const updatedProject = { ...project, tags }

    return updatedProject
}

export const getProjects = (state) => {
    const allProjects = state.projects
    if (!allProjects) return []

    return Object.values(state.projects).map(project => {
        return { ...project, tags: selectTagsByIds(state, project.tagIds) }
    })
}