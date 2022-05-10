import { sortArrayAlphabetically, sortArrayByDateAndTitle, sortArrayByStartDate } from './sorting'

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
            { startDate: new Date(2019, 1, 1), title: 'v2 O6' },
            { startDate: new Date(2020, 1, 1), title: 'v1 O3' },
            { startDate: new Date(2020, 1, 1), title: 'v1 O2' },
            { startDate: new Date(2020, 1, 1), title: 'v21 O3' },
            { startDate: new Date(2020, 1, 1), title: 'v2 O4' },
            { startDate: new Date(2020, 1, 1), title: 'v1 O1' },
            { startDate: new Date(2023, 1, 1), title: 'v99 O99' },
            { startDate: new Date(2022, 1, 1), title: 'No version number' },
            { startDate: new Date(2024, 1, 1), title: 'AAA000' },
            { startDate: new Date(2020, 1, 1), title: 'v10 O1' },
        ]

        const sorted = [
            { startDate: new Date(2019, 1, 1), title: 'v2 O6' },
            { startDate: new Date(2020, 1, 1), title: 'v1 O1' },
            { startDate: new Date(2020, 1, 1), title: 'v1 O2' },
            { startDate: new Date(2020, 1, 1), title: 'v1 O3' },
            { startDate: new Date(2020, 1, 1), title: 'v2 O4' },
            { startDate: new Date(2020, 1, 1), title: 'v10 O1' },
            { startDate: new Date(2020, 1, 1), title: 'v21 O3' },
            { startDate: new Date(2022, 1, 1), title: 'No version number' },
            { startDate: new Date(2022, 1, 1) },
            { startDate: new Date(2023, 1, 1), title: 'v99 O99' },
            { startDate: new Date(2024, 1, 1), title: 'AAA000' }
        ]

        expect([...unsorted].sort(sortArrayByDateAndTitle)).toEqual(sorted)
    })
})