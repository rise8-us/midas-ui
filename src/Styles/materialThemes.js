import { createMuiTheme } from '@material-ui/core/styles'

// Generated using https://bareynol.github.io/mui-theme-creator/

export const darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#26c6da',
        },
        secondary: {
            main: '#818b98',
        },
        background: {
            default: '#161a1d',
            paper: '#24292e',
        },
        error: {
            main: '#d45555',
        },
        success: {
            main: '#46b058',
        },
        warning: {
            main: '#f7b500',
        },
        info: {
            main: '#26c6da',
        },
        divider: '#778175',
        subtext: '#778185',
        classification: {
            UNCLASS: '#5bad76',
            CUI: '#2849b8',
            NOFORN: '#be4242',
            SCI: '#eff01a'

        },
        status: {
            success: '#46b058',
            error: '#d45555',
            warning: '#f7b500',
            info: '#26c6da'
        }
    },
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
    overrides: {
        MuiPaper: {
            outlined: {
                border: '2px solid black'
            }
        },
        MuiDialog: {
            paper: {
                minWidth: '350px'
            }
        },
        MuiTooltip: {
            tooltip: {
                backgroundColor: '#3e4548',
                fontSize: '14px',
                padding: '8px 10px'
            },
            arrow: {
                color: '#3e4548'
            }
        },
        MuiTabs: {
            indicator: {
                display: 'none'
            },
        }
    },
    accordion: {
        accordionPadding: {
            margin: '20px',
            padding: '10px'
        },
        accordionFlex: {
            flexGrow: 1
        }
    }
})