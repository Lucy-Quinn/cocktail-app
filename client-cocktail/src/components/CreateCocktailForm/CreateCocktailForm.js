import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import {
  CreateFormWrapper,
  CreateCocktailButton,
} from "./CreateCocktailForm.styled";
import UploadImage from "./UploadImage";

const CreateCocktailForm = ({ getAuthRoute }) => {
  const [values, setValues] = useState({ name: "", ingredients: "" });
  const [uploadedImage, setUploadedImage] = useState({});
  const [isReady, setIsReady] = useState(false);

  const history = useHistory();
  const { name, ingredients } = values;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleCocktailFormSubmit = (event) => {
    event.preventDefault();
    const { image } = uploadedImage;

    fetch(`${process.env.REACT_APP_API_URL}/api/cocktails/create-cocktail`, {
      method: "POST",
      withCredentials: true,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        name,
        ingredients,
        image,
      }),
    })
      .then(() => {
        getAuthRoute();
        history.push("/cocktails");
      })
      .catch((error) => {
        if (error.request) {
          console.log("REQUEST", error.request);
        }
        if (error.response) {
          console.log("RESPONSE", error.response);
        }
      });
  };

  return (
    <CreateFormWrapper onSubmit={handleCocktailFormSubmit}>
      <input
        type="text"
        value={name}
        name="name"
        placeholder="Cocktail name"
        onChange={handleChange}
      />
      <input
        type="text"
        value={ingredients}
        name="ingredients"
        placeholder="Cocktail ingredients"
        onChange={handleChange}
      />
      <UploadImage
        setUploadedImage={setUploadedImage}
        isReady={isReady}
        setIsReady={setIsReady}
      />
      <CreateCocktailButton disabled={!isReady}>
        Make your magic
      </CreateCocktailButton>
    </CreateFormWrapper>
  );
};

export default CreateCocktailForm;
