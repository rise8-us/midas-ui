import * as selectors from './selectors'

const mockState = {
    modifiedAssertions: {
        foo: {
            id: 1,
            parentKey: null,
            linkKey: 'foo',
            children: []
        },
        bar: {
            id: 2,
            parentKey: 'foo',
            linkKey: 'foo-bar',
            children: []
        },
        fizz: {
            id: 3,
            parentKey: 'foo-bar',
            linkKey: 'foo-bar-fizz',
            children: []
        },
        bizz: {
            parentKey: 'foo-bar',
            linkKey: 'foo-bar-bizz',
            children: []
        },
        foobar: {
            parentKey: 'foo',
            linkKey: 'foo-foobar',
            children: []
        }
    }
}

test('selectTreeByNodeId - should return all children', () => {
    const tree = selectors.selectTreeByNodeId(mockState, 'foo')

    expect(tree).toEqual({
        id: 1,
        parentKey: null,
        linkKey: 'foo',
        children: [
            {
                id: 2,
                parentKey: 'foo',
                linkKey: 'foo-bar',
                children: [
                    {
                        id: 3,
                        parentKey: 'foo-bar',
                        linkKey: 'foo-bar-fizz',
                        children: []
                    }, {
                        parentKey: 'foo-bar',
                        linkKey: 'foo-bar-bizz',
                        children: []
                    }
                ]
            }, {
                parentKey: 'foo',
                linkKey: 'foo-foobar',
                children: []
            }
        ]
    })
})

test('selectTreeByNodeId - should return only current', () => {
    const tree = selectors.selectTreeByNodeId(mockState, 'foo', 'current')

    expect(tree).toEqual({
        id: 1,
        parentKey: null,
        linkKey: 'foo',
        children: [{
            id: 2,
            parentKey: 'foo',
            linkKey: 'foo-bar',
            children: [{
                id: 3,
                parentKey: 'foo-bar',
                linkKey: 'foo-bar-fizz',
                children: []
            }]
        }]
    })
})

test('selectTreeByNodeId - should return only new children', () => {
    const tree = selectors.selectTreeByNodeId(mockState, 'bar', 'new')

    expect(tree).toEqual({
        id: 2,
        parentKey: 'foo',
        linkKey: 'foo-bar',
        children: [{
            parentKey: 'foo-bar',
            linkKey: 'foo-bar-bizz',
            children: []
        }]
    })
})

test('selectTreeByNodeId - should return only new children and not new grandchildren under existing children', () => {
    const tree = selectors.selectTreeByNodeId(mockState, 'foo', 'new')

    expect(tree).toEqual({
        id: 1,
        parentKey: null,
        linkKey: 'foo',
        children: [{
            parentKey: 'foo',
            linkKey: 'foo-foobar',
            children: []
        }]
    })
})