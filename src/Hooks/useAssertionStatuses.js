import objectHash from 'object-hash'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

function useAssertionStatuses() {
    const [options, setOptions] = useState([])

    const allStatuses = useSelector(state => state?.app?.assertionStatus,
        (current, incoming) => objectHash(current) === objectHash(incoming))

    useEffect(() => {
        setOptions(Object.values(allStatuses))
    }, [allStatuses])

    return options
}

export default useAssertionStatuses