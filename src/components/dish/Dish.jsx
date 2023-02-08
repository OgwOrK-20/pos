import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { useState } from "react";
import React from "react";
import { connect } from "react-redux";
import "./Dish.scss";
import {
  toggleCreateDishPage,
  getDishDataFromDB,
  setFeedback,
} from "../../actions";
import { useEffect } from "react";
import { useSubmitForm } from "../../hooks";
import axios from "axios";

import DishTab from "./DishTab";

const mapStateToProps = (state) => {
  return {
    isOpen: state.popUp.createDishIsOpen,
    dishData: state.dish.dishData,
  };
};

function Dish(props) {
  const { dishData, getDishDataFromDB, setFeedback } = props;
  const userId = localStorage.getItem("userId");
  const today = new Date();

  const [imgPreview, setImgPreview] = useState();
  const [imgSelected, setImgSelected] = useState(null);
  const [createWindowIsOpen, setCreateWindowIsOpen] = useState(false);

  const handleImageChange = (event) => {
    if (!event.target.files[0]) return;
    setImgSelected(event.target.files[0]);
  };

  const handleImageDelete = () => {
    setImgPreview(null);
    setImgSelected(null);
  };

  const submitCreateDish = async (event) => {
    event.preventDefault();
    try {
      const data = {
        name: event.target.name.value,
        description: event.target.description.value,
        image: null,
        price: event.target.price.value,
        created_date: today.toLocaleDateString(),
        modified_date: today.toLocaleDateString(),
        creator: userId,
      };
      const resp = await axios.post("http://localhost:4000/api/dish", data);
      setFeedback(false, "Successfully created dish");
      getDishDataFromDB(userId);
      setCreateWindowIsOpen(false);
    } catch (error) {
      let message;
      try {
        message = error.response.data.message;
      } catch (e) {
        message = "Something is wrong right now, please try again later";
      }
      setFeedback(true, message);
    }
  };

  const submitDeleteDish = async (dishId, setDeleteWindowIsOpen) => {
    try {
      await axios.delete(`http://localhost:4000/api/dish/${dishId}`);
      getDishDataFromDB(userId);
      setDeleteWindowIsOpen(false);
      setFeedback(false, `Successfully deleted dish`);
    } catch (error) {
      let message;
      try {
        message = error.response.data.message;
      } catch (e) {
        message = "Something is wrong right now, please try again later";
      }
      setFeedback(true, message);
    }
  };

  const submitUpdateDish = async (event, dishId, setEditWindowIsOpen) => {
    event.preventDefault();
    try {
      //TODO implement file upload
      const data = {
        name: event.target.name.value,
        description: event.target.description.value,
        price: event.target.price.value,
      };
      await axios.patch(`http://localhost:4000/api/dish/${dishId}`, data);
      getDishDataFromDB(userId);
      setEditWindowIsOpen(false);
      setFeedback(false, "Successfully updated dish");
    } catch (error) {
      let message;
      try {
        message = error.response.data.message;
      } catch (e) {
        message = "Something is wrong right now, please try again later";
      }
      setFeedback(true, message);
    }
  };

  useEffect(() => {
    getDishDataFromDB(userId);
  }, []);
  return (
    <React.Fragment>
      <div className="dish-container">
        <div className="dish-top-bar">
          {/* TODO: style the font here */}
          <div>Dish</div>
          <Button onClick={() => setCreateWindowIsOpen(true)}>Add</Button>
        </div>
        {dishData.map((dishPage) => (
          <DishTab
            key={dishPage.id}
            dishPage={dishPage}
            displayMode={false}
            submitDeleteDish={submitDeleteDish}
            submitUpdateDish={submitUpdateDish}
          ></DishTab>
        ))}

        <Dialog //edit window
          open={createWindowIsOpen}
          onClose={() => setCreateWindowIsOpen(!createWindowIsOpen)}
          maxWidth="lg"
        >
          <DialogTitle
            variant="h6"
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            New Menu
          </DialogTitle>
          <form onSubmit={submitCreateDish}>
            <DialogContent className="menu-edit-form">
              <div>
                <TextField
                  className="menu-edit-form-item-name menu-edit-form-item"
                  required
                  label="Name"
                  name="name"
                ></TextField>
                <TextField
                  className="menu-edit-form-item-name menu-edit-form-item"
                  required
                  label="Price"
                  name="price"
                ></TextField>
              </div>
              <TextField
                className="menu-edit-form-item"
                multiline
                minRows={4}
                label="Description"
                name="description"
              ></TextField>
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
                    className={"delete-menu-pic"}
                    variant="outlined"
                    color="error"
                    onClick={handleImageDelete}
                  >
                    Delete Image
                  </Button>
                </div>
                <img
                  className="preview-image"
                  src={
                    imgPreview || "https://placehold.co/600x400?text=No+Image"
                  }
                ></img>
              </div>
            </DialogContent>
            <DialogActions
              sx={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "20px",
              }}
            >
              <Button size="large" type="submit">
                Yes
              </Button>
              <Button
                size="large"
                onClick={() => setCreateWindowIsOpen(!createWindowIsOpen)}
              >
                Cancel
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    </React.Fragment>
  );
}

export default connect(mapStateToProps, {
  toggleCreateDishPage,
  getDishDataFromDB,
  setFeedback,
})(Dish);
