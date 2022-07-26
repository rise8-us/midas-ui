import { Button, Stack, TextField, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestGetFile, requestGetFileNames, requestSaveFile } from 'Redux/FileManager/actions'
import { selectPortfolioById } from 'Redux/Portfolios/selectors'
import { selectProductById } from 'Redux/Products/selectors'

export default function FileManager({ id }) {
    const dispatch = useDispatch()

    const product = useSelector(state => selectProductById(state, id))
    const portfolio = useSelector(state => selectPortfolioById(state, product?.portfolioId))

    const [file, setFile] = useState(undefined)
    const [allFileNames, setAllFileNames] = useState([])

    const getAllFiles = () => {
        dispatch(requestGetFileNames({ portfolioName: portfolio.name, productName: product.name })).then(fileNames => {
            setAllFileNames(fileNames.payload)
        })
    }

    const handleDownloadFile = (fileName) => {
        dispatch(requestGetFile({ fileName: fileName.substring(fileName.lastIndexOf('/') + 1), filePath: fileName }))
    }

    const handleChange = (e) => {
        const formData = new FormData()
        formData.append('file', e.target.files[0])
        setFile(formData)
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
        <Stack direction = 'row' justifyContent = 'space-between'>
            <Stack direction = 'column'>
                <TextField
                    type = 'file'
                    onChange = {handleChange}
                />
                <Button variant = 'outlined' onClick = {handleSave}>
                    Save File
                </Button>
            </Stack>
            <Stack>
                {allFileNames?.map((filePath, index) =>{
                    return (
                        <Typography
                            key = {index}
                            sx = {{
                                cursor: 'pointer',
                                '&:hover': {
                                    color: 'primary.main',
                                    textDecoration: 'underline',
                                },
                            }}
                            onClick = {() => handleDownloadFile(filePath)}
                        >
                            {filePath.substring(filePath.lastIndexOf('/') + 1)}
                        </Typography>
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