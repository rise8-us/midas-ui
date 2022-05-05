import * as selectors from './selectors'

const mockState = {
    deliverables: {
        2: {
            id: 2,
            productId: 1,
            title: 'title2',
            parentId: 2,
            capabilityId: 1
        },
        3: {
            id: 3,
            parentId: 3,
            productId: 1,
            title: 'title3',
            capabilityId: 1
        },
        4: {
            id: 4,
            productId: 6,
            title: 'title4',
            capabilityId: 2
        },
        5: {
            id: 5,
            productId: 1,
            title: 'title5',
            capabilityId: 3
        }
    },
}

describe('Deliverable selectors', () => {
    test('selectDeliverableById', () => {
        expect(selectors.selectDeliverableById(mockState, 2)).toEqual(mockState.deliverables[2])
        expect(selectors.selectDeliverableById(mockState, 99)).toEqual({ children: [] })
    })

    test('selectDeliverablesByCapabilityId - returns array of deliverables', () => {
        const deliverables = selectors.selectDeliverablesByCapabilityId(mockState, 1)

        expect(deliverables).toHaveLength(2)
    })

    test('selectDeliverableByParentId', () => {
        expect(selectors.selectDeliverableByParentId(mockState, 2)).toHaveLength(1)
    })

    test('selectDeliverablesByIds', () => {
        expect(selectors.selectDeliverablesByIds(mockState, [2, 3])).toHaveLength(2)
    })
})
