import React, { useState } from 'react';

const ImageInput = ({name,value, formData, setFormData}) => {
    const [imagePreview, setImagePreview] = useState(value);

    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setFormData({ ...formData, coverLetter: reader.result });
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleRemoveImage = () => {
        setImagePreview(null);
        setFormData({ ...formData, coverLetter: "" });
    };

    return (
        <div className="flex flex-col items-center">
            <label className="block mb-2 text-sm font-medium text-gray-700">Upload Image</label>
            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="fileInput"
                name={name}
            />
            <label
                htmlFor="fileInput"
                className="cursor-pointer flex items-center justify-center border border-dashed border-gray-300 rounded-lg p-6 hover:bg-gray-50"
            >
                {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="max-h-48 object-cover rounded-md"/>
                ) : (
                    <span className="text-gray-500">Click to upload image</span>
                )}
            </label>
            {imagePreview && (
                <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                >
                    Remove Image
                </button>
            )}
        </div>
    );
};

export default ImageInput;
