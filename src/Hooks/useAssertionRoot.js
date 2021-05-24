import objectHash from 'object-hash'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectTreeByNodeId } from '../Redux/ModifiedAssertions/selectors'

function useAssertionRoot(value, type) {
    const [root, setRoot] = useState()

    const assertion = useSelector(state => selectTreeByNodeId(state, value, type ?? 'new'),
        (current, incoming) => objectHash(current) === objectHash(incoming))

    useEffect(() => {
        setRoot(assertion)
    }, [assertion])

    return root
}

export default useAssertionRoot