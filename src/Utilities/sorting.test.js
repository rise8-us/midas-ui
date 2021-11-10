import { sortArrayAlphabetically } from './sorting'

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
})