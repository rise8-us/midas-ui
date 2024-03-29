import objectHash from 'object-hash'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

function useSonarqubeRatings() {
    const [sonarqubeRatings, setSonarqubeRatings] = useState({
        maintainabilityRating: {},
        securityRating: {},
        reliabilityRating: {},
    })

    const maintainabilityRating = useSelector(state => state.app?.sonarqubeMaintainability,
        (current, incoming) => objectHash(current) === objectHash(incoming))
    const securityRating = useSelector(state => state.app?.sonarqubeSecurity,
        (current, incoming) => objectHash(current) === objectHash(incoming))
    const reliabilityRating = useSelector(state => state.app?.sonarqubeReliability,
        (current, incoming) => objectHash(current) === objectHash(incoming))

    useEffect(() => {
        setSonarqubeRatings({
            maintainabilityRating,
            securityRating,
            reliabilityRating,
        })
    }, [maintainabilityRating, securityRating, reliabilityRating])

    return sonarqubeRatings
}

export default useSonarqubeRatings