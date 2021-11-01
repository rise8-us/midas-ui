import { createTheme } from '@mui/material/styles'
import { createStyled } from '@mui/system'

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#D4AF37'
        },
        secondary: {
            main: '#818B98'
        },
        text: {
            primary: '#DDDDDD',
            secondary: '#797979'
        },
        background: {
            paper: '#24292E',
            default: '#161A1D'
        },
        classification: {
            UNCLASS: '#5BAD76',
            CUI: '#2849B8',
            NOFORN: '#BE4242',
            SCI: '#EFF01A'
        },
        divider: '#3E4548',
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
    components: {
        MuiTabs: {
            defaultProps: {
                indicatorColor: 'secondary',
                textColor: 'inherit'
            }
        },
        MuiTab: {
            defaultProps: {
                disableRipple: true
            }
        },
        MuiButton: {
            defaultProps: {
                color: 'inherit'
            }
        },
        MuiTextField: {
            defaultProps: {
                variant: 'standard'
            }
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#24292E'
                }
            }
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    backgroundColor: '#FFFFFF0A'
                },
                defaultProps: {
                    elevation: 0
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                },
                outlined: {
                    backgroundImage: 'none',
                    border: '2px solid black'
                }
            }
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    backgroundColor: '#24292E',
                    fontSize: '14px',
                    padding: '8px 10px',
                    boxShadow: '0 0 1em #000000AA'
                },
                arrow: {
                    color: '#24292E'
                }
            }
        },
        MuiAutocomplete: {
            styleOverrides: {
                popper: {
                    borderLeft: '1em solid #24292E',
                    borderRight: '1em solid #24292E',
                    borderBottom: '1em solid #24292E',
                }
            }
        }
    }
})

const styled = createStyled({ defaultTheme: theme })

export { styled, theme }
