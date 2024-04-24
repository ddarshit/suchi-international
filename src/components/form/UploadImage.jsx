import React, { useState } from 'react';
import { IoMdCloseCircle } from 'react-icons/io'

const UploadImage = ({ multiple, name, handleChange }) => {
    // const [file, setFile] = useState([]);
    const [images, setImages] = useState([]);

    // const uploadMultipleFiles = (e) => {
    //     const files = e.target.files;
    //     setImages([]);
    //     for (let i = 0; i < files.length; i++) {
    //         setImages((prevImages) => [...prevImages, URL.createObjectURL(files[i])]);
    //     }
    //     setFile(files);
    // };

    const uploadFiles = (e) => {
        e.preventDefault();
        handleChange("image", images);
        console.log(images);
    };

    const removeImage = (index) => {
        const updatedImages = [...images];
        updatedImages.splice(index, 1);
        setImages(updatedImages);
        // console.log(images);
    }

    return (
        <div className='ml-4 mt-2 col-span-2'>
            <div className="form-group">
                <label className="block mb-2 text-base font-medium text-gray-900" htmlFor="file_input">Upload {name} :</label>
                <input className="block w-full text-base text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-gray-50 focus:outline-none" id="file_input"
                    type="file" onChange={(e) => { setImages(e.target.files[0]) }} multiple={multiple} accept="image/*"
                />

            </div>
            <div className="flex flex-wrap mt-4">
                {
                    // Array.from is required since images are object and map function work on array
                    images && Array.from(images).map((item, index) => {
                        return (
                            <div className='relative'>
                                <img key={item} src={item ? URL.createObjectURL(item) : null} alt='...' className='w-56 mr-2 mb-2' />
                                <button type="button" onClick={() => { removeImage(index) }} className='absolute top-1 right-3'>
                                    <IoMdCloseCircle className='text-red-500 text-2xl' />
                                </button>
                            </div>
                        )
                    })
                }
            </div>

            
            <button type="button" onClick={uploadFiles} className="text-white bg-suchi hover:bg-suchi-hover focus:ring-1 focus:ring-purple-300 font-medium rounded-md text-base px-5 py-2 mb-2 mt-4">
                Upload
            </button>
        </div>
    );
};

export default UploadImage;
