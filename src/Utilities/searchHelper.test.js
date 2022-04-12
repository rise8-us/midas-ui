import { searchHelper } from './searchHelper'

const search = 'test search'

test('should return search', () => {
    expect(searchHelper(search)).toEqual(search)
})

test('should return null', () => {
    expect(searchHelper()).toEqual('')
})