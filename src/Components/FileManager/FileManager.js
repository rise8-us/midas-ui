import { Delete } from '@mui/icons-material'
import { Button, IconButton, Stack, TextField, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestDeleteFile, requestGetFile, requestGetFileNames, requestSaveFile } from 'Redux/FileManager/actions'
import { selectPortfolioById } from 'Redux/Portfolios/selectors'
import { selectProductById } from 'Redux/Products/selectors'

export default function FileManager({ id }) {
    const dispatch = useDispatch()

    const inputRef = useRef(null)

    const product = useSelector(state => selectProductById(state, id))
    const portfolio = useSelector(state => selectPortfolioById(state, product?.portfolioId))

    const [fileSelected, setFileSelected] = useState(undefined)
    const [fileName, setFileName ] = useState('')
    const [allFileNames, setAllFileNames] = useState([])
    const [hasError, setHasError] = useState(false)

    const getAllFiles = () => {
        dispatch(requestGetFileNames({ portfolioName: portfolio.name, productName: product.name })).then(fileNames => {
            setAllFileNames(fileNames.payload)
        })
    }

    const handleDownloadFile = (filePath) => {
        dispatch(requestGetFile({ fileName: filePath.substring(filePath.lastIndexOf('/') + 1), filePath: filePath }))
    }

    const handleChange = (e) => {
        const file = e.target.files[0]
        if (file.size > 50000000) {
            setHasError(true)
            setFileSelected(null)
            setFileName('')
        } else {
            const formData = new FormData()
            formData.append('file', file)
            setHasError(false)
            setFileSelected(formData)
            setFileName(file.name)
        }
    }

    const handleDelete = (filePath) => {
        dispatch(requestDeleteFile({ fileName: filePath.substring(filePath.lastIndexOf('/') + 1), filePath: filePath }))
            .then(getAllFiles)
    }

    const handleSave = () => {
        if (fileSelected === undefined)
            return

        const saveRequest = {
            portfolio: portfolio.name,
            product: product.name,
            file: fileSelected
        }
        dispatch(requestSaveFile(saveRequest)).then(getAllFiles)
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
                    onClick = {() => inputRef.current.click()}
                    value = {fileName}
                    error = {hasError}
                    helperText = {hasError ? 'File too large (Max 50MB)' : ''}
                    sx = {{
                        marginY: '16px',
                    }}
                />
                <input type = 'file' hidden ref = {inputRef} onChange = {handleChange}/>
                <Button variant = 'outlined' onClick = {handleSave}>
                    Upload
                </Button>
            </Stack>
            <Stack marginLeft = {4}>
                <Typography variant = 'h5' marginY = {2}>Existing File Uploads from {product.name}</Typography>
                {allFileNames?.map((filePath, index) => {
                    return (
                        <Stack direction = 'row' key = {index} justifyContent = 'space-between'>
                            <Typography
                                marginLeft = {1}
                                onClick = {() => handleDownloadFile(filePath)}
                                sx = {{
                                    fontSize: '18px',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        color: 'primary.main',
                                        textDecoration: 'underline',
                                    },
                                }}>
                                {filePath.substring(filePath.lastIndexOf('/') + 1)}
                            </Typography>
                            <IconButton onClick = {() => handleDelete(filePath)}>
                                <Delete/>
                            </IconButton>
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