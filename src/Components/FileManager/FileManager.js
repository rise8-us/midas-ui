import { Download } from '@mui/icons-material'
import { Button, Stack, TextField, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestGetFile, requestGetFileNames, requestSaveFile } from 'Redux/FileManager/actions'
import { selectPortfolioById } from 'Redux/Portfolios/selectors'
import { selectProductById } from 'Redux/Products/selectors'

export default function FileManager({ id }) {
    const dispatch = useDispatch()

    const inputRef = useRef(null)

    const product = useSelector(state => selectProductById(state, id))
    const portfolio = useSelector(state => selectPortfolioById(state, product?.portfolioId))

    const [file, setFile] = useState(undefined)
    const [fileName, setFileName ] = useState('')
    const [allFileNames, setAllFileNames] = useState([])

    const getAllFiles = () => {
        dispatch(requestGetFileNames({ portfolioName: portfolio.name, productName: product.name })).then(fileNames => {
            setAllFileNames(fileNames.payload)
        })
    }

    const handleDownloadFile = (filePath) => {
        dispatch(requestGetFile({ fileName: filePath.substring(filePath.lastIndexOf('/') + 1), filePath: filePath }))
    }

    const handleChange = (e) => {
        const formData = new FormData()
        formData.append('file', e.target.files[0])
        setFile(formData)
        setFileName(e.target.files[0].name)
    }

    const handleSave = () => {
        if (file === undefined)
            return

        const saveRequest = {
            portfolio: portfolio.name,
            product: product.name,
            file: file
        }
        dispatch(requestSaveFile(saveRequest)).then(() => {
            getAllFiles()
        })
    }

    useEffect(() => {
        getAllFiles()
    }, [])

    return (
        <Stack direction = 'row'>
            <Stack direction = 'column'>
                <TextField
                    autoFocus
                    fullWidth
                    label = {fileName.length > 0 ? '' : 'Choose File'}
                    variant = 'outlined'
                    placeholder = 'Choose File'
                    sx = {{ marginY: '16px' }}
                    onClick = {() => inputRef.current.click()}
                    value = {fileName}
                />
                <input type = 'file' hidden ref = {inputRef} onChange = {handleChange}/>
                <Button variant = 'outlined' onClick = {handleSave}>
                    Upload
                </Button>
            </Stack>
            <Stack marginLeft = {4}>
                <Typography variant = 'h5' marginY = {2}>Existing File Uploads from {product.name}</Typography>
                {allFileNames?.map((filePath, index) =>{
                    return (
                        <Stack
                            direction = 'row'
                            key = {index}
                            onClick = {() => handleDownloadFile(filePath)}
                            sx = {{
                                fontSize: '18px',
                                cursor: 'pointer',
                                '&:hover': {
                                    color: 'primary.main',
                                    textDecoration: 'underline',
                                },
                            }}>
                            <Download />
                            <Typography>
                                {filePath.substring(filePath.lastIndexOf('/') + 1)}
                            </Typography>
                        </Stack>
                    )
                }
                )}
            </Stack>
        </Stack>
    )
}

FileManager.propTypes = {
    id: PropTypes.number.isRequired
}