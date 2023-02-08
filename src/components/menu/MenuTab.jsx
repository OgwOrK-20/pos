import { format } from "date-fns";
import { Link } from "react-router-dom";
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
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React, { useState, useEffect } from "react";
import "./MenuTab.scss";
import axios from "axios";

function MenuTab(props) {
  const { menuPage } = props;
  const [deleteWindowIsOpen, setDeleteWindowIsOpen] = useState(false);
  const [editWindowIsOpen, setEditWindowIsOpen] = useState(false);
  const [imgPreview, setImgPreview] = useState(menuPage.image);
  const [imgSelected, setImgSelected] = useState(null);

  const menuId = menuPage.id;

  // call the delete API submit deleting
  const submitDeleteMenu = async () => {
    try {
      await axios.delete(`http://localhost:4000/api/menu/${menuId}`);
    } catch (error) {
      console.log(error);
    }
    window.location.reload();
  };

  // call patch api submit editing the menu
  const submitUpdateMenu = async (event) => {
    event.preventDefault();
    try {
      //TODO implement file upload
      const data = {
        name: event.target.name.value,
        description: event.target.description.value,
      };
      await axios.patch(`http://localhost:4000/api/menu/${menuId}`, data);
    } catch (error) {
      console.log(error);
    }
    window.location.reload();
  };

  const handleImageChange = (event) => {
    if (!event.target.files[0]) return;
    setImgSelected(event.target.files[0]);
  };

  const handleImageDelete = () => {
    setImgPreview(null);
    setImgSelected(null);
  };

  useEffect(() => {
    if (!imgSelected) return;
    const imgPreviewURL = URL.createObjectURL(imgSelected);
    setImgPreview(imgPreviewURL);
    return () => {
      URL.revokeObjectURL(imgPreviewURL);
    };
  }, [imgSelected]);

  return (
    <Card className="display-tab">
      <Link to={menuPage.id} state={{ menuPage: menuPage }}>
        <CardMedia
          component="img"
          image="/pizza.jpg"
          sx={{ height: 110 }}
        ></CardMedia>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {menuPage.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {menuPage.description}
          </Typography>
        </CardContent>
      </Link>
      <CardActions
        sx={{ justifyContent: "space-between", paddingLeft: "15px" }}
      >
        <Typography variant="caption">
          {format(new Date(menuPage.created_date), "MM/dd/yyyy")}
        </Typography>
        <div>
          <IconButton onClick={() => setEditWindowIsOpen(!editWindowIsOpen)}>
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => setDeleteWindowIsOpen(!deleteWindowIsOpen)}
          >
            <DeleteIcon></DeleteIcon>
          </IconButton>
        </div>
      </CardActions>
      <Dialog //edit window
        open={editWindowIsOpen}
        onClose={() => setEditWindowIsOpen(!editWindowIsOpen)}
        maxWidth="lg"
      >
        <DialogTitle
          variant="h6"
          sx={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
        >
          Menu Editing
        </DialogTitle>
        <form onSubmit={submitUpdateMenu}>
          <DialogContent className="menu-edit-form">
            <TextField
              className="menu-edit-form-item-name menu-edit-form-item"
              required
              label="Name"
              name="name"
              defaultValue={menuPage.name}
            ></TextField>
            <TextField
              className="menu-edit-form-item"
              multiline
              minRows={4}
              label="Description"
              name="description"
              defaultValue={menuPage.description}
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
              onClick={() => setEditWindowIsOpen(!editWindowIsOpen)}
            >
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <Dialog // delete window
        open={deleteWindowIsOpen}
        onClose={() => setDeleteWindowIsOpen(!deleteWindowIsOpen)}
      >
        <DialogTitle variant="h6">
          Are you sure to delete this menu?
        </DialogTitle>
        {/* <DialogContent>This menu will be deleted from the</DialogContent> */}
        <DialogActions>
          <Button onClick={submitDeleteMenu}>Yes</Button>
          <Button onClick={() => setDeleteWindowIsOpen(!deleteWindowIsOpen)}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

export default MenuTab;
