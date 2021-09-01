import React, { useState } from "react";
import axios from "axios";

const UploadImage = ({ setUploadedImage, setIsReady, isReady }) => {
  const [previewSource, setPreviewSource] = useState();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    previewFile(file);
    const uploadData = new FormData();
    uploadData.append("image", file);
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/cocktails/upload-image`,
        uploadData,
        { withCredentials: true }
      )
      .then((response) => {
        setUploadedImage({ image: response.data.secure_url });
        setIsReady(true);
      })
      .catch((err) => {
        console.log("Error while uploading the file: ", err);
      });
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  return (
    <div>
      <span>
        <img
          style={{ width: "100px" }}
          src={isReady.toString() && previewSource}
          alt=""
        ></img>
      </span>
      <input
        id="image-upload"
        name="image"
        type="file"
        onChange={handleFileUpload}
        required
      ></input>
    </div>
  );
};

export default UploadImage;
