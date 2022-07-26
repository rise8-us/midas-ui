import { Button, Stack, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestGetFile, requestGetFileNames, requestSaveFile } from 'Redux/FileManager/actions'
import { selectProductById } from 'Redux/Products/selectors'

export default function FileManager({ id }) {
    const dispatch = useDispatch()

    const product = useSelector(state => selectProductById(state, id))

    const [file, setFile] = useState(undefined)
    const [allFileNames, setAllFileNames] = useState([])

    const handleDownloadFile = (fileName) => {
        dispatch(requestGetFile(fileName)).then((file) => {
            console.log(file)
        })
    }

    const handleChange = (e) => {
        const formData = new FormData()
        formData.append('file', e.target.files[0])
        setFile(formData)
    }

    const handleSave = () => {
        const saveRequest = {
            product: product.name,
            file: file
        }
        dispatch(requestSaveFile(saveRequest))
    }

    useEffect(() => {
        dispatch(requestGetFileNames(product.name)).then(fileNames => {
            setAllFileNames(fileNames.payload)
        })
    }, [])


    return (
        <div>
            <Button
                variant = 'outlined'
                component = 'label'
            >
                Upload File
                <input
                    type = 'file'
                    hidden
                    onChange = {handleChange}
                />
            </Button>
            <Button onClick = {handleSave}>
                Save File
            </Button>
            <Stack>
                {allFileNames?.map((filePath, index) =>{
                    console.log(filePath)
                    return (
                        <Typography key = {index} onClick = {() => handleDownloadFile(filePath)}>
                            {filePath.replace(`files/${product.name}/`, '')}
                        </Typography>
                    )
                }
                )}
            </Stack>
        </div>
    )
}

FileManager.propTypes = {
    id: PropTypes.number.isRequired
}