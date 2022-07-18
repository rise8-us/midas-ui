import { Card } from '@mui/material'
import { unwrapResult } from '@reduxjs/toolkit'
import { CollapsableRow } from 'Components/Cards/CollapsableRow'
import { EpicListItem } from 'Components/Epics/EpicListItem'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestFetchSearchEpics } from 'Redux/Epics/actions'
import { selectPortfolioById } from 'Redux/Portfolios/selectors'
import { selectProductsByPortfolioId } from 'Redux/Products/selectors'

export default function SearchEpicsDropdown({ portfolioId, linkedEpicIds, handleOnSelect, handleOnDeselect }) {

    const dispatch = useDispatch()

    const [epics, setEpics] = useState([])

    const portfolio = useSelector(state => selectPortfolioById(state, portfolioId))
    const products = useSelector(state => selectProductsByPortfolioId(state, portfolioId))

    useEffect(() => {
        dispatch(requestFetchSearchEpics())
            .then(unwrapResult)
            .then((data) => {
                setEpics(data)
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
                {epics.filter(e => e.portfolioId === portfolio.id).map((epic, index) =>
                    <EpicListItem
                        key = {index}
                        epic = {epic}
                        epicIds = {linkedEpicIds}
                        handleOnSelect = {handleOnSelect}
                        handleOnDeselect = {handleOnDeselect}
                    />
                )}
            </CollapsableRow>
            {products.filter(p => epics.filter(e => e.productId === p.id).length !== 0).map((product, index) => (
                <CollapsableRow
                    key = {index}
                    headerText = {product.name}
                    typeText = {'(Product)'}
                    styles = {{
                        paddingLeft: '10px',
                    }}
                >
                    {epics.filter(e => e.productId === product.id).map((epic, idx) =>
                        <EpicListItem
                            key = {idx}
                            epic = {epic}
                            epicIds = {linkedEpicIds}
                            handleOnSelect = {handleOnSelect}
                            handleOnDeselect = {handleOnDeselect}
                        />
                    )}
                </CollapsableRow>
            ))}
        </Card>
    )
}

SearchEpicsDropdown.propTypes = {
    portfolioId: PropTypes.number.isRequired,
    linkedEpicIds: PropTypes.arrayOf(PropTypes.number).isRequired,
    handleOnSelect: PropTypes.func.isRequired,
    handleOnDeselect: PropTypes.func.isRequired,
}