import { Button } from '@mui/material'
import { useEffect, useRef, useState } from 'react'

export default function FileManager() {

    const uploadFileInput = useRef()

    const [file, setFile] = useState(undefined)

    useEffect(() => {
        console.log(uploadFileInput.current?.value)
    }, [uploadFileInput.current?.value])

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
                />
            </Button>
            file:
        </div>
    )
}