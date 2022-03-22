import { selectRolesAsArrayMock } from 'Utilities/test-utils'
import * as selectors from './selectors'

const mockState = {
    users: {
        42: {
            id: 42,
            username: 'yoda',
            roles: 2
        },
        43: {
            id: 43,
            username: 'luke',
            roles: 0
        }
    }
}

const expectedUser = {
    id: 42,
    username: 'yoda',
    roles: { PORTFOLIO_LEAD: true, ADMIN: false }
}

beforeEach(() => {
    selectRolesAsArrayMock()
})

test('selectUserById - should return object', () => {
    const user = selectors.selectUserById(mockState, 42)

    expect(user).toBeInstanceOf(Object)
})

test('selectUserById - should return empty object', () => {
    const user = selectors.selectUserById(mockState, 43)

    expect(user).toBeInstanceOf(Object)
})

test('selectUserById - should have data', () => {
    const user = selectors.selectUserById(mockState, 42)
    expect(user).toMatchObject(expectedUser)
})

describe('selectTotalRoleCountsByUserIds', () => {
    test('selectTotalRoleCountByUserIds - Should return an object with unassigned: 0', () => {
        expect(selectors.selectTotalRoleCountByUserIds(mockState, [])).toEqual({ unassigned: [] })
    })

    test('selectTotalRoleCountByUserIds - Should return an object map with unassigned: 1', () => {
        expect(selectors.selectTotalRoleCountByUserIds(mockState, [43])).toEqual({ unassigned: [43] })
    })

    test('selectTotalRoleCountByUserIds - Should return an object map with correct roles', () => {
        expect(selectors.selectTotalRoleCountByUserIds(mockState, [42, 43]))
            .toEqual({ portfolioLead: [42], unassigned: [43] })
    })
})