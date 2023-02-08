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
import React from "react";
import { connect } from "react-redux";
import { getMenuDataFromDB, setFeedback } from "../../actions";
import "./Menu.scss";
import { useEffect } from "react";
import MenuTab from "./MenuTab";
import { useState } from "react";
import { useSubmitForm } from "../../hooks";
import axios from "axios";

const mapStateToProps = (state) => {
  return {
    createMenu: state.createMenu,
    menuData: state.menu.menuData,
  };
};

function Menu(props) {
  const userId = localStorage.getItem("userId");
  const today = new Date();
  const { getMenuDataFromDB, menuData, setFeedback } = props;
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

  const submitCreateMenu = async (event) => {
    try {
      const data = {
        name: event.target.name.value,
        description: event.target.description.value,
        image: null,
        created_date: today.toLocaleDateString(),
        modified_date: today.toLocaleDateString(),
        creator: userId,
      };
      const resp = await axios.post("http://localhost:4000/api/menu", data);
      setFeedback(false, "Successfully created menu");
      setCreateWindowIsOpen(false);
      getMenuDataFromDB(userId);
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
    getMenuDataFromDB(userId);
  }, []);

  useEffect(() => {
    if (!imgSelected) return;
    const imgPreviewURL = URL.createObjectURL(imgSelected);
    setImgPreview(imgPreviewURL);
    return () => {
      URL.revokeObjectURL(imgPreviewURL);
    };
  }, [imgSelected]);

  return (
    <React.Fragment>
      <div className="menu-container">
        <div className="menu-top-bar">
          <div>Menu</div>
          <Button onClick={() => setCreateWindowIsOpen(true)}>Add</Button>
        </div>
        {menuData.map((menuPage) => {
          return <MenuTab key={menuPage.id} menuPage={menuPage}></MenuTab>;
        })}
      </div>
      <Dialog //edit window
        open={createWindowIsOpen}
        onClose={() => setCreateWindowIsOpen(!createWindowIsOpen)}
        maxWidth="lg"
      >
        <DialogTitle
          variant="h6"
          sx={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
        >
          New Menu
        </DialogTitle>
        <form onSubmit={submitCreateMenu}>
          <DialogContent className="menu-edit-form">
            <TextField
              className="menu-edit-form-item-name menu-edit-form-item"
              required
              label="Name"
              name="name"
            ></TextField>
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
                src={imgPreview || "https://placehold.co/600x400?text=No+Image"}
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
      {/* <CreateMenu></CreateMenu> */}
    </React.Fragment>
  );
}

export default connect(mapStateToProps, {
  getMenuDataFromDB,
  setFeedback,
})(Menu);
