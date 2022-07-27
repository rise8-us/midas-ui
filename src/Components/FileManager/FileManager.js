import { Delete, Download } from '@mui/icons-material'
import { Button, Grid, Stack, TextField, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestDeleteFile, requestGetFile, requestGetFileNames, requestSaveFile } from 'Redux/FileManager/actions'
import { selectPortfolioById } from 'Redux/Portfolios/selectors'
import { selectProductById } from 'Redux/Products/selectors'

export default function FileManager({ productId }) {
    const dispatch = useDispatch()

    const inputRef = useRef(null)

    const product = useSelector(state => selectProductById(state, productId))
    const portfolio = useSelector(state => selectPortfolioById(state, product?.portfolioId))

    const [uploadFileSelected, setUploadFileSelected] = useState(null)
    const [uploadFileName, setUploadFileName] = useState('')
    const [allFileNames, setAllFileNames] = useState([])
    const [hasError, setHasError] = useState(false)
    const [helperText, setHelperText] = useState('')
    const [loading, setLoading] = useState(false)

    const getAllFiles = () => {
        setLoading(true)
        dispatch(requestGetFileNames({ portfolioName: portfolio.name, productName: product.name })).then(fileNames => {
            setAllFileNames(fileNames.payload)
            setLoading(false)
        })
    }

    const handleDownloadFile = (filePath) => {
        dispatch(requestGetFile({ fileName: filePath.substring(filePath.lastIndexOf('/') + 1), filePath: filePath }))
    }

    const handleUploadFileSelect = () => {
        inputRef.current.click()
        setHelperText('')
        setHasError(false)
    }

    const handleUploadChange = (e) => {
        const file = e.target.files[0]

        if (file === undefined) return

        if (file.size > 50000000) {
            setHasError(true)
            setUploadFileSelected(null)
            setUploadFileName('')
            setHelperText('File too large (Max 50MB)')
        } else {
            const formData = new FormData()
            formData.append('file', file)
            setHasError(false)
            setUploadFileSelected(formData)
            setUploadFileName(file.name)
        }
    }

    const handleSave = () => {
        if (uploadFileSelected === undefined) return

        const saveRequest = {
            portfolio: portfolio.name,
            product: product.name,
            file: uploadFileSelected
        }
        dispatch(requestSaveFile(saveRequest)).then(() => getAllFiles())
        setUploadFileSelected(null)
        setUploadFileName('')
        setHelperText('File Upload Success.')
    }

    const handleDelete = (filePath) => {
        dispatch(requestDeleteFile({ fileName: filePath.substring(filePath.lastIndexOf('/') + 1), filePath: filePath }))
            .then(() => getAllFiles())
    }

    useEffect(() => {
        getAllFiles()
    }, [JSON.stringify(portfolio), JSON.stringify(product)])

    return (
        <>
            <Grid container columnSpacing = {2} direction = 'row'>
                <Grid container item rowSpacing = {2} direction = 'column' xs = {6}>
                    <Grid item justifyContent = 'center' width = '80%'>
                        <TextField
                            fullWidth
                            label = {uploadFileName.length > 0 ? '' : 'Choose File'}
                            variant = 'outlined'
                            placeholder = 'Choose File'
                            onClick = {handleUploadFileSelect}
                            value = {uploadFileName}
                            error = {hasError}
                            helperText = {helperText}
                        />
                    </Grid>
                    <Grid item width = '80%'>
                        <input
                            type = 'file'
                            hidden
                            ref = {inputRef}
                            onChange = {handleUploadChange}
                        />
                        <Button
                            disabled = {uploadFileSelected === null}
                            variant = 'outlined'
                            onClick = {handleSave}
                            fullWidth
                            disableRipple
                        >
                            Upload
                        </Button>
                    </Grid>
                </Grid>
                <Grid container item rowSpacing = {2} direction = 'column' paddingTop = {2} paddingRight = {2} xs = {6}>
                    <Typography variant = 'h6'>Exisiting File Uploads</Typography>
                    {allFileNames.map((fileName, index) =>
                        <Grid item key = {index}>
                            <Stack direction = 'row' justifyContent = 'space-between'>
                                <Stack
                                    direction = 'row'
                                    onClick = {() => handleDownloadFile(fileName)}
                                    color = 'text.secondary'
                                    sx = {{
                                        cursor: 'pointer',
                                        '&:hover': { color: 'primary.main' }
                                    }}
                                >
                                    <Download />
                                    <Typography>{fileName.substring(fileName.lastIndexOf('/') + 1)}</Typography>
                                </Stack>
                                <Delete
                                    onClick = {() => handleDelete(fileName)}
                                    sx = {{
                                        color: 'text.secondary',
                                        cursor: 'pointer',
                                        '&:hover': { color: 'text.primary' }
                                    }}
                                />
                            </Stack>
                        </Grid>
                    )}
                </Grid>
            </Grid>
        </>
    )
}

FileManager.propTypes = {
    productId: PropTypes.number.isRequired,
}