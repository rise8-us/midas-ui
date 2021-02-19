import reducer, { toggleNavBarOpen } from './reducer'

const initialState = {
    navBarOpen: false
}

describe('AppSettings Reducer', () =>{
    it('should handle initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            navBarOpen: false
        })
    })

    it('should handle toggleNavBarOpen', () => {
        expect(
            reducer(initialState, { type: toggleNavBarOpen.type, payload: {} })
        ).toEqual({
            navBarOpen: true
        })
    })

})