export const getMeasureStatus = (measure) => {
    const start = new Date(measure.startDate).valueOf()
    const due = new Date(measure.dueDate).valueOf()

    const timeAvailable = due - start
    const timeLeft = due - Date.now()
    const percentTimeLeft = (timeLeft / timeAvailable) * 100
    const percentCompletion = (measure.value / measure.target) * 100

    if (!measure.startDate) return 'NOT_STARTED'
    if (measure.completedAt) return 'COMPLETED'
    if (due && due < Date.now()) return 'BLOCKED'
    if (due && percentTimeLeft < 10 && percentCompletion < 90) return 'AT_RISK'

    return 'ON_TRACK'

}