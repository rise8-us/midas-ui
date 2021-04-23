import { getUrlParam } from './queryParams'

test('should return url param', () => {
    delete window.location
    window.location = { pathname: '/test/products/1' }

    expect(getUrlParam('products')).toEqual((1).toString())
})