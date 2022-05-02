import { sortArrayAlphabetically, sortArrayByStartDate } from './sorting'

describe('sorting', () => {
    test('sortArrayAlphabetically', () => {
        const unsorted = [
            { name: 'bravo' },
            { name: 'alpha' },
            {},
            { name: 'charlie' },
            { name: 'delta' },
        ]

        const sorted = [
            {},
            { name: 'alpha' },
            { name: 'bravo' },
            { name: 'charlie' },
            { name: 'delta' },
        ]

        expect(sortArrayAlphabetically(unsorted, 'name')).toEqual(sorted)
    })

    test('sortArrayByStartDate', () => {
        const unsorted = [
            { startDate: new Date(2022, 1, 1) },
            { startDate: new Date(2020, 1, 1) },
            { startDate: new Date(2021, 1, 1) },
            { startDate: null }
        ]

        const sorted = [
            { startDate: null },
            { startDate: new Date(2020, 1, 1) },
            { startDate: new Date(2021, 1, 1) },
            { startDate: new Date(2022, 1, 1) },
        ]

        expect([...unsorted].sort(sortArrayByStartDate)).toEqual(sorted)
    })

    test('sortArrayByStartDateAndTitle', () => {
        const unsorted = [
            { startDate: new Date(2022, 1, 1) },
            { startDate: new Date(2020, 1, 1), title: '2' },
            { startDate: new Date(2020, 1, 1), title: '1' },
        ]

        const sorted = [
            { startDate: new Date(2020, 1, 1), title: '1' },
            { startDate: new Date(2020, 1, 1), title: '2' },
            { startDate: new Date(2022, 1, 1) },
        ]

        expect([...unsorted].sort(sortArrayByStartDate)).toEqual(sorted)
    })
})