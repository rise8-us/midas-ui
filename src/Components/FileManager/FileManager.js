import { Autocomplete, Button, Grid, TextField } from '@mui/material'
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

    const [uploadFileSelected, setUploadFileSelected] = useState(null)
    const [uploadFileName, setUploadFileName ] = useState('')
    const [selectedFileName, setSelectedFileName] = useState('')
    const [allFileNames, setAllFileNames] = useState([])
    const [hasError, setHasError] = useState(false)
    const [helperText, setHelperText] = useState('')

    const getAllFiles = () => {
        dispatch(requestGetFileNames({ portfolioName: portfolio.name, productName: product.name })).then(fileNames => {
            setAllFileNames(fileNames.payload)
        })
    }

    const handleSelectFileToDownload = (e) => {
        const fullPath = 'uploads/' + portfolio.name + '/' + product.name + '/' + e.target.innerHTML
        setSelectedFileName(fullPath)
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
        if (uploadFileSelected === undefined)
            return

        const saveRequest = {
            portfolio: portfolio.name,
            product: product.name,
            file: uploadFileSelected
        }
        dispatch(requestSaveFile(saveRequest)).then(getAllFiles)
        setUploadFileSelected(null)
        setUploadFileName('')
        setHelperText('File Upload Success.')
    }

    const handleDelete = (filePath) => {
        dispatch(requestDeleteFile({ fileName: filePath.substring(filePath.lastIndexOf('/') + 1), filePath: filePath }))
            .then(getAllFiles).then(() => {
                setSelectedFileName('')
            })
    }

    useEffect(() => {
        getAllFiles()
    }, [])

    return (
        <>
            <Grid container rowSpacing = {2} direction = 'column'>
                <Grid item justifyContent = 'center' flexGrow = {1} width = '375px'>
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
                <Grid item width = '375px'>
                    <Autocomplete
                        options = {allFileNames.sort()}
                        getOptionLabel = {(option) => option.split('/')[3]}
                        onChange = {handleSelectFileToDownload}
                        inputValue = {selectedFileName}
                        loadingText = 'Retrieving files...'
                        noOptionsText = 'No files.'
                        ListboxProps = {{ style: { fontFamily: 'monospace' } }}
                        renderInput = {(params) =>
                            <TextField
                                {...params}
                                fullWidth
                                variant = 'outlined'
                                label = {`Select existing file from ${product.name}`}
                            />
                        }
                    />
                </Grid>
                <Grid container item justifyContent = 'center' width = '375px' columnGap = {2}>
                    <Grid item xs>
                        <input type = 'file' hidden ref = {inputRef} onChange = {handleUploadChange}/>
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
                    <Grid item xs>
                        <Button
                            disabled = {selectedFileName === ''}
                            variant = 'outlined'
                            onClick = {() => handleDownloadFile(selectedFileName)}
                            disableRipple
                            fullWidth
                        >
                            download
                        </Button>
                    </Grid>
                    <Grid item xs>
                        <Button
                            disabled = {selectedFileName === ''}
                            variant = 'outlined'
                            onClick = {() => handleDelete(selectedFileName)}
                            disableRipple
                            fullWidth
                        >
                            delete
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

FileManager.propTypes = {
    id: PropTypes.number.isRequired
}