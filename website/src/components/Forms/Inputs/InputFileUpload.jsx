import React, {useEffect, useState} from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const InputFileUpload = ({ name, coverLetter, setCoverLetter }) => {
    const [fileName, setFileName] = useState(coverLetter.name || '');

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            console.log("file : " + selectedFile)
            console.log("selected file : " + selectedFile.name)
            setFileName(selectedFile.name);
            setCoverLetter(selectedFile);
        }
    };

    useEffect(() => {
        console.log("coverLetter : " + coverLetter)
        console.log("setCoverLetter : " + coverLetter.name)
    }, [coverLetter]);

    const handleRemoveFile = () => {
        setFileName('');
        setCoverLetter(null);
    };

    return (
        <div className="flex flex-col items-center">
            <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
            >
                Upload file
                <VisuallyHiddenInput
                    type="file"
                    accept="image/*,.pdf,.doc,.docx"
                    onChange={handleFileChange}
                    name={name}
                />
            </Button>
            {fileName ? (
                <>
                    <span className="text-gray-500 my-4">{fileName}</span>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleRemoveFile}
                        className="mt-4"
                    >
                        Remove File
                    </Button>
                </>
            ) : (
                <span className="mt-4 text-gray-500">No file selected</span>
            )}
        </div>
    );
};

export default InputFileUpload;
