import { Box } from '@mui/material'
import { PortfolioCard } from 'Components/Cards'
import { FloatingActionButton } from 'Components/FloatingActionButton'
import { Page } from 'Components/Page'
import { useDispatch, useSelector } from 'react-redux'
import { isPortfolioCreator } from 'Redux/Auth/selectors'
import { openPopup } from 'Redux/Popups/actions'
import PortfolioConstant from 'Redux/Portfolios/constants'
import { selectUnarchivedPortfolios } from 'Redux/Portfolios/selectors'

function Portfolios() {
    const dispatch = useDispatch()

    const allPortfolios = useSelector(selectUnarchivedPortfolios)
    const isCreator = useSelector(isPortfolioCreator)

    const create = () => dispatch(openPopup(PortfolioConstant.CREATE_PORTFOLIO, 'PortfolioPopup'))

    return (
        <Page>
            <>
                <Box style = {{ padding: '20px 40px' }}>
                    <Box
                        display = 'grid'
                        justifyContent = 'center'
                        gridTemplateColumns = 'repeat(auto-fit, 450px)'
                        gridAutoRows = '2px'
                        gap = '0 10px'
                        gridAutoFlow = 'row'
                        style = {{ marginBottom: '40px', padding: '0 30px' }}
                    >
                        {allPortfolios.map((portfolio) => (
                            <PortfolioCard key = {portfolio.id} id = {portfolio.id}/>
                        ))}
                    </Box>
                </Box>
                {isCreator && <FloatingActionButton onClick = {create} />}
            </>
        </Page>
    )
}

export default Portfolios