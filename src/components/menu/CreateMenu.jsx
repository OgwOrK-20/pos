import { Button, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import "./CreateMenu.scss";
import { connect } from "react-redux";
import { toggleCreateMenuPage } from "../../actions";

const today = new Date();

const mapStateToProps = (state) => {
  return { isOpen: state.createMenu.isOpen };
};

function CreateMenu(props) {
  const userId = localStorage.getItem("userId");
  const { isOpen, toggleCreateMenuPage } = props;

  const [newMenu, setNewMenu] = useState({
    name: "",
    description: "",
    image: "https://placehold.co/600x400?text=No+Image",
    created_date: today.toLocaleDateString(),
    modified_date: today.toLocaleDateString(),
    creator: userId,
    dishes: [],
  });

  const [imgPreview, setImgPreview] = useState();

  const handleNameChange = (event) => {
    setNewMenu((prev) => ({
      ...prev,
      name: event.target.value,
    }));
  };

  const handleDescriptionChange = (event) => {
    setNewMenu((prev) => ({
      ...prev,
      description: event.target.value,
    }));
  };

  const handleImageChange = (event) => {
    if (!event.target.files[0]) return;
    setNewMenu((prev) => ({
      ...prev,
      image: event.target.files[0],
    }));
    event.target.value = "";
  };

  const handleImageDelete = () => {
    setNewMenu((prev) => ({
      ...prev,
      image: undefined,
    }));
  };

  const handleCreateMenu = async () => {
    try {
      const resp = await axios.post("http://localhost:4000/api/menu", newMenu);
      console.log(resp);
      if (resp) {
        console.log("jump to menu");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  //use ImgPreview to get a preview of the uploaded image
  //use UseEffect to avoid memory leak caused by URL.createObjectURL
  //https://stackoverflow.com/questions/38049966/get-image-preview-before-uploading-in-react/57781164#comment94991328_54060913
  useEffect(() => {
    if (
      newMenu.image === "https://placehold.co/600x400?text=No+Image" ||
      !newMenu.image
    ) {
      setImgPreview("https://placehold.co/600x400?text=No+Image");
      return;
    }
    const objectUrl = URL.createObjectURL(newMenu.image);
    setImgPreview(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [newMenu.image]);

  return (
    isOpen && (
      <React.Fragment>
        <div className="popup-mask"></div>
        <div className="create-menu-container">
          <div
            onClick={() => {
              toggleCreateMenuPage();
            }}
          >
            <CloseIcon
              className="create-menu-close"
              fontSize="large"
              color="inherit"
            ></CloseIcon>
          </div>
          <Typography variant="subtitle1" className="create-menu-title">
            New Menu
          </Typography>
          <TextField
            className="create-menu-name"
            required
            label="Name"
            value={newMenu.name}
            onChange={handleNameChange}
          />
          <TextField
            className="create-menu-descriptions"
            multiline
            minRows={4}
            label="Descriptions"
            value={newMenu.description}
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
            className="create-menu-create"
            size="large"
            onClick={handleCreateMenu}
          >
            Create
          </Button>
        </div>
      </React.Fragment>
    )
  );
}

export default connect(mapStateToProps, { toggleCreateMenuPage })(CreateMenu);
