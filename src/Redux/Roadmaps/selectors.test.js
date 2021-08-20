import * as selectors from './selectors'

const mockState = {
    roadmaps: {
        2: {
            id: 2,
            productId: 1,
            title: 'title',
            description: 'description',
            status: 'FUTURE',
            targetDate: '12/20/2021'
        },
        3: {
            id: 3,
            productId: 1
        },
        4: {
            id: 4,
            productId: 6
        },
        5: {
            id: 5,
            productId: 1
        }
    },
}

test('selectRoadmapById - returns default roadmap object', () => {
    const roadmaps = selectors.selectRoadmapById({ roadmaps: {} }, 1)

    expect(roadmaps).toEqual({
        title: '',
        description: '',
        status: 'FUTURE'
    })
})

test('selectRoadmapById - returns roadmap object', () => {
    const roadmap = selectors.selectRoadmapById(mockState, 2)

    expect(roadmap).toEqual(mockState.roadmaps[2])
})


test('selectRoadmapsByProductId - returns empty array', () => {
    const roadmaps = selectors.selectRoadmapsByProductId({}, 1)

    expect(roadmaps).toHaveLength(0)
})

test('selectRoadmapsByProductId - returns array of roadmaps', () => {
    const roadmaps = selectors.selectRoadmapsByProductId(mockState, 1)

    expect(roadmaps).toHaveLength(3)
})
