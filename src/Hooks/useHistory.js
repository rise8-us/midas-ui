import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function useHistory() {
    const navigate = useNavigate()
    const location = useLocation()

    const [listener, setListener] = useState(null)

    useEffect(() => {
        if (listener !== null) {
            listener(location)
        }
    }, [location])

    return {
        push: navigate,
        go: navigate,
        goBack: () => navigate(-1),
        goForward: () => navigate(1),
        listen: (newListener) => setListener(() => newListener),
        location,
    }
}

export default useHistory