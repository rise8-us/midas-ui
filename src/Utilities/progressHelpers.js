export const normalise = (value, target) => (
    ((isNaN(value) || isNaN(target)) || (value === 0 || target === 0)) ? 0 : (value / target) * 100
)

export const roundedPercent = (value, target) => (Math.round(normalise(value, target) * 100) / 100) + '% completed'
