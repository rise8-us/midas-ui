import { lazy, Suspense, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectOpenPopups } from 'Redux/Popups/selectors'

const importPopup = componentName => lazy(() => {
    const cleanComponentName = componentName.replace(/[^a-z0-9]/gi, '')

    // eslint-disable-next-line no-unsanitized/method
    return import(`../Popups/${cleanComponentName}/${cleanComponentName}`)
})

function PopupManager() {
    const [popups, setPopups] = useState([])
    const [currentPopups, setCurrentPopups] = useState([])
    const allPopups = useSelector(selectOpenPopups)

    useEffect(() => {
        if (allPopups.length !== currentPopups.length) {
            setCurrentPopups(allPopups)
        } else {
            for (let i = 0; i <= allPopups.length; i++) {
                const incomingPopup = allPopups[i]
                const currentPopup = currentPopups[i]

                for (const propertyName in incomingPopup) {
                    if (incomingPopup[propertyName] !== currentPopup[propertyName]) {
                        setCurrentPopups(allPopups)
                        break
                    }
                }
            }
        }
    })

    useEffect(() => {
        const loadPopups = async() => {
            const componentPromises = currentPopups.map((popup, index) => {
                const Popup = importPopup(popup.componentName)
                return <Popup key = {index} {...popup.props} />
            })
            Promise.all(componentPromises).then(setPopups)
        }
        loadPopups()
    }, [currentPopups])

    return (
        <Suspense fallback = {<div data-testid = 'PopupManager__wrap-fallback'/>}>{popups}</Suspense>
    )
}

export default PopupManager