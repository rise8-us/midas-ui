import { Button } from '@mui/material'
import { useRef, useState } from 'react'

export default function FileManager() {

    const uploadFileInput = useRef()

    const [file, setFile] = useState(undefined)

    const onChange = (e) => {
        console.log('onChange: ', uploadFileInput.current?.value)
        setFile(e.target.value)
        console.log('e: ', e.target.value)
    }

    return (
        <div>
            <Button
                variant = 'outlined'
                component = 'label'
            >
                Upload File
                <input
                    ref = {uploadFileInput}
                    type = 'file'
                    hidden
                    onChange = {onChange}
                />
            </Button>
            {file}
        </div>
    )
}