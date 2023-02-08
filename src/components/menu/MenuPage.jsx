import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  TextField,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  CardMedia,
  CardContent,
  Typography,
  Card,
  DialogActions,
  Fade,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import React, { useState } from "react";
import "./MenuPage.scss";
import MenuCategoryTab from "./MenuCategoryTab";
import MenuDishTab from "./MenuDishTab";
import { useEffect } from "react";
import { connect } from "react-redux";
import {
  getDishCategoryFromDB,
  getDishDataFromDB,
  setFeedback,
} from "../../actions/index";
import axios from "axios";
import { useLocation } from "react-router-dom";
import DishTab from "../dish/DishTab";
import { v4 as uuidv4, v4 } from "uuid";
import FeedbackModal from "../utilities/FeedbackModal";

const mapStateToProps = (state) => {
  return {
    dishCategoryData: state.dishCategory.dishCategoryData,
    dishData: state.dish.dishData,
  };
};

function MenuPage(props) {
  const {
    dishCategoryData,
    getDishCategoryFromDB,
    dishData,
    getDishDataFromDB,
    setFeedback,
  } = props;
  useEffect(() => {
    getDishDataFromDB(userId);
    getDishCategoryFromDB(menuId);
  }, []);

  const userId = localStorage.getItem("userId");
  const [addFormIsOpen, setAddFormIsOpen] = useState(false);
  const [dishSelectionIsOpen, setDishSelectionIsOpen] = useState(false);
  const [selectedDishCategory, setSelectedDishCategory] = useState(null);
  const [selectedDish, setSelectedDish] = useState(null);
  const [customFeedback, setCustomFeedback] = useState({
    trigger: false,
    type: null,
    hasError: null,
    message: null,
  });
  const location = useLocation();
  const { menuPage } = location.state;
  const menuId = menuPage.id;
  //add dish category
  const submitAddDishCategory = async (event) => {
    event.preventDefault();
    const data = {
      name: event.target.name.value,
      description: event.target.description.value,
      image: "",
      parent_menu: menuId,
    };
    try {
      await axios.post("http://localhost:4000/api/dishCategory", data);
      setAddFormIsOpen(false);
      getDishCategoryFromDB(menuId);
      setFeedback(false, "Successfully added dish category");
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
  //add dish into a category
  const handleAddDish = async () => {
    const data = {
      dishCategoryId: selectedDishCategory.id,
      dishId: selectedDish.id,
    };
    try {
      await axios.post("http://localhost:4000/api/dishCategory/addDish", data);
      setFeedback(false, "Successfully add dish to menu");
      getDishCategoryFromDB(menuId);
      setDishSelectionIsOpen(false);
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

  //Edit dish category information this is for MenuCategoryTab
  const submitEditCategory = async (event, id, setCategoryEditIsOpen) => {
    event.preventDefault();
    console.log(123);
    const data = {
      name: event.target.name.value,
      description: event.target.description.value,
    };
    try {
      await axios.patch(`http://localhost:4000/api/dishCategory/${id}`, data);
      setCategoryEditIsOpen(false);
      getDishCategoryFromDB(menuId);
      setFeedback(false, "Successfully edit dish category information");
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

  //delete dish category information this is for MenuCategoryTab
  const submitDeleteCategory = async (id, setCategoryDeleteIsOpen) => {
    try {
      await axios.delete(`http://localhost:4000/api/dishCategory/${id}`);
      setCategoryDeleteIsOpen(false);
      getDishCategoryFromDB(menuId);
      setFeedback(false, "Successfully delete dish category");
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

  //Delete dish in the dish category This is for MenuDishTab
  const submitDeleteDishInMenu = async (
    dishId,
    dishCategoryId,
    setDeleteWindowIsOpen
  ) => {
    const data = {
      dishId: dishId,
      dishCategoryId: dishCategoryId,
    };
    try {
      axios.post("http://localhost:4000/api/dishCategory/deleteDish", data);
      setDeleteWindowIsOpen(false);
      getDishCategoryFromDB(menuId);
      setFeedback(false, "Successfully delete dish");
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

  return (
    <React.Fragment>
      <div className="menuPage-container">
        <div className="category-container">
          <List className="category-list">
            {dishCategoryData.map((dishCategory) => (
              <MenuCategoryTab
                dishCategory={dishCategory}
                key={dishCategory.id}
                selectedDishCategory={selectedDishCategory}
                setSelectedDishCategory={setSelectedDishCategory}
                submitEditCategory={submitEditCategory}
                submitDeleteCategory={submitDeleteCategory}
              ></MenuCategoryTab>
            ))}
            <Button onClick={() => setAddFormIsOpen(!addFormIsOpen)}>
              Add new category
            </Button>
            {addFormIsOpen && (
              <form
                className="category-list-item-edit"
                onSubmit={submitAddDishCategory}
              >
                <TextField
                  label="Category Name"
                  name="name"
                  className="category-list-item-edit-item"
                  variant="standard"
                ></TextField>
                <TextField
                  name="description"
                  label="Category Description"
                  className="category-list-item-edit-item"
                  variant="standard"
                ></TextField>
                <div className="category-list-item-edit-item-buttons">
                  <Button type="submit">Yes</Button>
                  <Button onClick={() => setAddFormIsOpen(!addFormIsOpen)}>
                    Cancel
                  </Button>
                </div>
              </form>
            )}
          </List>
        </div>
        <div className="category-dish-container">
          {selectedDishCategory
            ? selectedDishCategory.dishes.map((dish) => {
                return (
                  <MenuDishTab
                    key={uuidv4()}
                    dish={dish}
                    selectedDishCategory={selectedDishCategory}
                    submitDeleteDishInMenu={submitDeleteDishInMenu}
                  ></MenuDishTab>
                );
              })
            : ""}
          <Paper className="add-display-tab display-tab">
            <IconButton
              className="display-tab-add-icon"
              onClick={() => setDishSelectionIsOpen(!dishSelectionIsOpen)}
            >
              <AddIcon sx={{ fontSize: 60 }} color="action"></AddIcon>
            </IconButton>
          </Paper>
          <Dialog
            className="dish-selection-page"
            open={dishSelectionIsOpen}
            onClose={() => setDishSelectionIsOpen(!dishSelectionIsOpen)}
            maxWidth="lg"
          >
            <FeedbackModal
              customError={customFeedback}
              setCustomError={setCustomFeedback}
            ></FeedbackModal>
            <DialogTitle>Menu Selection</DialogTitle>
            <DialogContent className="dish-display-container">
              {dishData.map((dishPage) => (
                <Card
                  className={
                    "dish-display-tab " +
                    (selectedDish
                      ? selectedDish.id === dishPage.id
                        ? "selected-display-tab"
                        : ""
                      : "")
                  }
                  key={dishPage.id}
                  sx={{ marginTop: "6px" }}
                  onClick={() => setSelectedDish(dishPage)}
                >
                  <CardMedia
                    component="img"
                    image="/pizza.jpg"
                    sx={{ height: 95 }}
                  ></CardMedia>
                  <CardContent>
                    <Typography sx={{ fontSize: 17 }} gutterBottom>
                      {dishPage.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {dishPage.description}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </DialogContent>
            <DialogActions
              sx={{ justifyContent: "center", marginBottom: "10px" }}
            >
              <Button size="large" onClick={handleAddDish}>
                Select
              </Button>
              <Button
                size="large"
                onClick={() => setDishSelectionIsOpen(!dishSelectionIsOpen)}
              >
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </React.Fragment>
  );
}

export default connect(mapStateToProps, {
  getDishCategoryFromDB,
  getDishDataFromDB,
  setFeedback,
})(MenuPage);
