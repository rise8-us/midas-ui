import { Card, Typography } from '@mui/material'
import { unwrapResult } from '@reduxjs/toolkit'
import { CollapsableRow } from 'Components/Cards/CollapsableRow'
import { EpicListItem } from 'Components/Epics/EpicListItem'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestFetchSearchEpics } from 'Redux/Epics/actions'
import { selectPortfolioById } from 'Redux/Portfolios/selectors'
import { selectProductsByPortfolioId } from 'Redux/Products/selectors'
import { sortByStateAndTitle } from '../../../Utilities/sorting'

export default function SearchEpicsDropdown({ portfolioId, selectedEpicIds, handleOnSelect, handleOnDeselect }) {

    const dispatch = useDispatch()

    const [portfolioEpics, setPortfolioEpics] = useState([])

    const portfolio = useSelector(state => selectPortfolioById(state, portfolioId))
    const products = useSelector(state => selectProductsByPortfolioId(state, portfolioId)).reduce(function(map, obj) {
        map[obj.id] = { name: obj.name, epics: [] }
        return map
    }, {})
    const [displayProducts, setDisplayProducts] = useState(products)

    useEffect(() => {
        dispatch(requestFetchSearchEpics())
            .then(unwrapResult)
            .then((data) => {
                const [portEpics] = data.reduce(([port], e) => {
                    if (e.portfolioId === portfolio.id) return [[...port, e]]
                    const product = products[e.productId]
                    if (product) products[e.productId] = { ...product, epics: [...product.epics, e] }
                    return [port]
                }, [[]])
                setPortfolioEpics(portEpics.sort(sortByStateAndTitle))
                setDisplayProducts(products)
            })
    }, [])


    return (
        <Card>
            <CollapsableRow
                headerText = {portfolio.name}
                typeText = {'(Portfolio)'}
                styles = {{
                    paddingLeft: '10px',
                }}
            >
                {portfolioEpics.map((epic, index) =>
                    <EpicListItem
                        key = {index}
                        epic = {epic}
                        isEpicSelected = {selectedEpicIds.includes(epic.id)}
                        handleOnSelect = {handleOnSelect}
                        handleOnDeselect = {handleOnDeselect}
                    />
                )}
            </CollapsableRow>
            {Object.entries(displayProducts).map((p, index) => {
                const product = p[1]
                return (<CollapsableRow
                    key = {index}
                    headerText = {product.name}
                    typeText = {'(Product)'}
                    styles = {{
                        paddingLeft: '10px',
                    }}
                >
                    {product.epics.length > 0 ? product.epics.sort(sortByStateAndTitle).map((epic, idx) =>
                        <EpicListItem
                            key = {idx}
                            epic = {epic}
                            isEpicSelected = {selectedEpicIds.includes(epic.id)}
                            handleOnSelect = {handleOnSelect}
                            handleOnDeselect = {handleOnDeselect}
                        />
                    ) :
                        <Typography color = {'text.secondary'}>No Epics Found</Typography>}
                </CollapsableRow>
                )
            })}
        </Card>
    )
}

SearchEpicsDropdown.propTypes = {
    portfolioId: PropTypes.number.isRequired,
    selectedEpicIds: PropTypes.arrayOf(PropTypes.number).isRequired,
    handleOnSelect: PropTypes.func.isRequired,
    handleOnDeselect: PropTypes.func.isRequired,
}
