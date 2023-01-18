import { Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import "./CreateDish.scss";
import PopUpPage from "../utilities/PopUpPage";

const today = new Date();

function CreateDish(props) {
  const userId = localStorage.getItem("userId");
  const [newDish, setNewDish] = useState({
    name: "",
    description: "",
    image: "",
    price: 0,
    created_date: today.toLocaleDateString("en-CA"),
    modified_date: today.toLocaleDateString("en-CA"),
    creator: userId,
  });

  const [imgPreview, setImgPreview] = useState();

  const handleNameChange = (event) => {
    setNewDish((prev) => ({
      ...prev,
      name: event.target.value,
    }));
  };

  const handleDescriptionChange = (event) => {
    setNewDish((prev) => ({
      ...prev,
      description: event.target.value,
    }));
  };

  const handleImageChange = (event) => {
    if (!event.target.files[0]) return;
    setNewDish((prev) => ({
      ...prev,
      image: event.target.files[0],
    }));
    event.target.value = "";
  };

  const handleImageDelete = () => {
    setNewDish((prev) => ({
      ...prev,
      image: undefined,
    }));
  };

  const handlePriceChange = (event) => {
    setNewDish((prev) => ({
      ...prev,
      price: event.target.value,
    }));
  };

  const handleCreateMenu = async () => {
    try {
      const resp = await axios.post("http://localhost:4000/api/dish", newDish);
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  };

  //use ImgPreview to get a preview of the uploaded image
  //use UseEffect to avoid memory leak caused by URL.createObjectURL
  //https://stackoverflow.com/questions/38049966/get-image-preview-before-uploading-in-react/57781164#comment94991328_54060913
  useEffect(() => {
    if (
      newDish.image === "https://placehold.co/600x400?text=No+Image" ||
      !newDish.image
    ) {
      setImgPreview("https://placehold.co/600x400?text=No+Image");
      return;
    }
    const objectUrl = URL.createObjectURL(newDish.image);
    setImgPreview(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [newDish.image]);

  return (
    <PopUpPage
      isOpen={props.isOpen}
      toggle={props.toggle}
      height="75vh"
      width="60vw"
    >
      <Typography variant="subtitle1" className="create-dish-title">
        New Dish
      </Typography>
      <div className="dish-first-row">
        <TextField
          className="create-dish-name"
          required
          label="Name"
          value={newDish.name}
          onChange={handleNameChange}
        />
        <TextField
          className="create-dish-price"
          required
          label="Price"
          value={newDish.price}
          onChange={handlePriceChange}
        ></TextField>
      </div>
      <TextField
        className="create-dish-descriptions"
        multiline
        minRows={4}
        label="Descriptions"
        value={newDish.description}
        onChange={handleDescriptionChange}
      />
      <div className="image-selection">
        <div className="image-selection-buttons">
          <Button
            className="create-menu-pic"
            variant="outlined"
            component="label"
          >
            Select Image
            {/* input type="file" can only be uncontrolled component due to security issue */}
            <input
              hidden
              accept="image/*"
              type="file"
              name="image"
              onChange={handleImageChange}
            ></input>
          </Button>
          <Button
            className={
              imgPreview ? "delete-menu-pic" : "delete-menu-pic hidden"
            }
            variant="outlined"
            color="error"
            onClick={handleImageDelete}
          >
            Delete Image
          </Button>
        </div>
        <img className="preview-image" src={imgPreview}></img>
      </div>
      <Button
        variant="outlined"
        color="success"
        className="create-dish-create"
        size="large"
        onClick={handleCreateMenu}
      >
        Create
      </Button>
    </PopUpPage>
  );
}

export default CreateDish;
