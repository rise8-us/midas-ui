import React, { lazy, Suspense, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getOpenPopups } from '../../Redux/Popups/selectors'

const importPopup = componentName => lazy(() => import(`../Popups/${componentName}/${componentName}`))

function PopupManager() {
    const [popups, setPopups] = useState([])
    const [currentPopups, setCurrentPopups] = useState([])
    const allPopups = useSelector(state => getOpenPopups(state))

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