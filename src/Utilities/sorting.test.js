import {
    sortArrayAlphabetically,
    sortArrayByDateAndTitle,
    sortArrayByStartDate,
    sortByStateAndTitle
} from './sorting'

describe('sorting', () => {
    const unsorted = [
        { startDate: null, state: 'closed' },
        { startDate: new Date(2019, 1, 1), title: 'v2 O6', state: 'opened' },
        { startDate: new Date(2020, 1, 1), title: 'v1 O3', state: 'closed' },
        { startDate: new Date(2020, 1, 1), title: 'v1 O2', state: 'opened' },
        { startDate: new Date(2020, 1, 1), title: 'v21 O3', state: 'closed' },
        { startDate: new Date(2020, 1, 1), title: 'v2 O4', state: 'opened' },
        { startDate: new Date(2020, 1, 1), title: 'v1 O1', state: 'closed' },
        { startDate: new Date(2023, 1, 1), title: 'v99 O99', state: 'opened' },
        { startDate: new Date(2022, 1, 1), title: 'No version number', state: 'closed' },
        { startDate: new Date(2024, 1, 1), title: 'AAA000', state: 'opened' },
        { startDate: new Date(2020, 1, 1), title: 'v10 O1', state: 'closed' },
    ]

    test('sortArrayAlphabetically', () => {
        const expectedSorted =  [
            {},
            { title: 'AAA000' },
            { title: 'No version number' },
            { title: 'v1 O1' },
            { title: 'v1 O2' },
            { title: 'v1 O3' },
            { title: 'v2 O4' },
            { title: 'v2 O6' },
            { title: 'v10 O1' },
            { title: 'v21 O3' },
            { title: 'v99 O99' }
        ]

        const actualSorted = sortArrayAlphabetically([...unsorted], 'title')

        actualSorted.forEach((item, index) => {
            expect(item).toMatchObject(expectedSorted[index])
        })
    })

    test('sortArrayByStartDate', () => {
        const sorted = [
            { startDate: null },
            { startDate: new Date(2019, 1, 1) },
            { startDate: new Date(2020, 1, 1) },
            { startDate: new Date(2020, 1, 1) },
            { startDate: new Date(2020, 1, 1) },
            { startDate: new Date(2020, 1, 1) },
            { startDate: new Date(2020, 1, 1) },
            { startDate: new Date(2020, 1, 1) },
            { startDate: new Date(2022, 1, 1) },
            { startDate: new Date(2023, 1, 1) },
            { startDate: new Date(2024, 1, 1) },
        ];

        [...unsorted].sort(sortArrayByStartDate).forEach((item, index) => {
            expect(item).toMatchObject(sorted[index])
        })
    })

    test('sortArrayByStartDateAndTitle', () => {
        const sorted = [
            { startDate: null },
            { startDate: new Date(2019, 1, 1), title: 'v2 O6' },
            { startDate: new Date(2020, 1, 1), title: 'v1 O1' },
            { startDate: new Date(2020, 1, 1), title: 'v1 O2' },
            { startDate: new Date(2020, 1, 1), title: 'v1 O3' },
            { startDate: new Date(2020, 1, 1), title: 'v2 O4' },
            { startDate: new Date(2020, 1, 1), title: 'v10 O1' },
            { startDate: new Date(2020, 1, 1), title: 'v21 O3' },
            { startDate: new Date(2022, 1, 1), title: 'No version number' },
            { startDate: new Date(2023, 1, 1), title: 'v99 O99' },
            { startDate: new Date(2024, 1, 1), title: 'AAA000' },
            { startDate: new Date(2022, 1, 1) }
        ];

        [...unsorted].sort(sortArrayByDateAndTitle).forEach((item, index) => {
            expect(item).toMatchObject(sorted[index])
        })
    })

    test('sortByStateAndTitle', () => {
        const sorted = [
            { state: 'opened', title: 'AAA000' },
            { state: 'opened', title: 'v1 O2' },
            { state: 'opened', title: 'v2 O4' },
            { state: 'opened', title: 'v2 O6' },
            { state: 'opened', title: 'v99 O99' },
            { state: 'closed', title: 'No version number' },
            { state: 'closed' },
            { state: 'closed', title: 'v1 O1' },
            { state: 'closed', title: 'v1 O3' },
            { state: 'closed', title: 'v10 O1' },
            { state: 'closed', title: 'v21 O3' },
        ];

        [...unsorted].sort(sortByStateAndTitle).forEach((item, index) => {
            expect(item).toMatchObject(sorted[index])
        })
    })
})
