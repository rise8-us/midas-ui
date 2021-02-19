import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(() => ({
    typography: {
        margin: 'auto 0 auto auto'
    },
    link: {
        margin: 'auto auto auto 2px',
        '&:hover': {
            cursor: 'pointer'
        }
    }
}))

export { useStyles }
