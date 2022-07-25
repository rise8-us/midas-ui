import { Button } from '@mui/material'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { requestSaveFile } from 'Redux/FileManager/actions'

export default function FileManager() {

    const dispatch = useDispatch()

    const [file, setFile] = useState(undefined)

    const onChange = (e) => {
        const formData = new FormData()
        formData.append('file', e.target.files[0])
        setFile(formData)
    }

    const onSave = () => {
        dispatch(requestSaveFile(file))
    }

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
                    onChange = {onChange}
                />
            </Button>
            <Button onClick = {onSave}>
                Save File
            </Button>
        </div>
    )
}