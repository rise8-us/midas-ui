export const getTextWidth = (id) => {
    const el = document.getElementById(id)
    const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement('canvas'))
    const context = canvas.getContext('2d')
    context.font = window.getComputedStyle(el, null).getPropertyValue('font')
    const metrics = context.measureText(el.value)

    return metrics.width + 8 + 'px'
}