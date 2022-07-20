import { Button } from '@mui/material'
import { useState } from 'react'

export default function FileManager() {

    const [file, setFile] = useState(undefined)

    const onChange = (e) => {
        const formData = new FormData()
        const fileToAdd = new Blob(e.target.files)
        formData.append('file', fileToAdd)
        setFile(formData)

        console.log(e.target.files)
    }

    const onSave = () => {
        let url = 'http://localhost:8000/api/filemanager/upload'
        let request = new XMLHttpRequest()
        request.open('POST', url)
        request.send(file)
        console.log('onsaved')
        // axios.post('http://localhost:8000/api/filemanager/upload', file, config)
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