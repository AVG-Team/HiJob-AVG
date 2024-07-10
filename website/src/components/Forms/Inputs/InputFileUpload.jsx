import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

const InputFileUpload = ({ name, input, setInput }) => {
    const [fileName, setFileName] = useState(input.name || "");

    InputFileUpload.propTypes = {
        name: PropTypes.string,
        input: PropTypes.object,
        setInput: PropTypes.func,
    };
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFileName(selectedFile.name);
            setInput(selectedFile);
        }
    };

    useEffect(() => {}, [input]);

    const handleRemoveFile = () => {
        setFileName("");
        setInput(null);
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
                    <span className="my-4 text-gray-500">{fileName}</span>
                    <Button variant="contained" color="error" onClick={handleRemoveFile} className="mt-4">
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
