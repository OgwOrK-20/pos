import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Modal,
  Popover,
  TextField,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React from "react";
import "./MenuPage.scss";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PopUpPage from "../utilities/PopUpPage";
import axios from "axios";
import { useSubmitForm } from "../../hooks";

// the tab in the left part of menu detail page
function MenuCategoryTab(props) {
  const { name, description, id } = props.dishCategory; // the id here is dishCategory id
  const {
    setSelectedDishCategory,
    selectedDishCategory,
    dishCategory,
    submitEditCategory,
    submitDeleteCategory,
  } = props;
  const [categoryEditIsOpen, setCategoryEditIsOpen] = useState(false);
  const [categoryDeleteIsOpen, setCategoryDeleteIsOpen] = useState(false);
  const [popOverIsOpen, setPopOverIsOpen] = useState(false);
  const [anchorEl, setAnchorEL] = useState(null);

  const handlePopOverClick = (event) => {
    !anchorEl ? setAnchorEL(event.currentTarget) : setAnchorEL(null);
    setPopOverIsOpen(!popOverIsOpen);
  };

  return (
    <React.Fragment>
      <ListItem
        selected={dishCategory === selectedDishCategory}
        button
        className="category-list-item"
        secondaryAction={
          <React.Fragment>
            <IconButton onClick={handlePopOverClick}>
              <MoreVertIcon></MoreVertIcon>
            </IconButton>
            <Popover
              open={popOverIsOpen}
              onClose={handlePopOverClick}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <div className="menu-category-popover">
                <Button
                  onClick={() => setCategoryEditIsOpen(!categoryEditIsOpen)}
                  size="small"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => setCategoryDeleteIsOpen(!categoryDeleteIsOpen)}
                  size="small"
                  color="error"
                >
                  Delete
                </Button>
              </div>
            </Popover>
          </React.Fragment>
        }
        onClick={() => setSelectedDishCategory(dishCategory)}
      >
        <Dialog
          open={categoryDeleteIsOpen}
          onClose={() => setCategoryDeleteIsOpen(!categoryDeleteIsOpen)}
        >
          <DialogTitle>Delete the category?</DialogTitle>
          <DialogContent>
            The menu category along with all the menus in it will be deleted.
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => submitDeleteCategory(id, setCategoryDeleteIsOpen)}
            >
              Yes
            </Button>
            <Button
              onClick={() => setCategoryDeleteIsOpen(!categoryDeleteIsOpen)}
              autoFocus
            >
              No
            </Button>
          </DialogActions>
        </Dialog>
        <ListItemAvatar>
          <Avatar></Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={`${name}`}
          secondary={`${description}`}
        ></ListItemText>
      </ListItem>
      {categoryEditIsOpen && (
        <form
          className="category-list-item-edit"
          onSubmit={(event) =>
            submitEditCategory(event, id, setCategoryEditIsOpen)
          }
        >
          <TextField
            label="Category Name"
            className="category-list-item-edit-item"
            variant="standard"
            name="name"
            defaultValue={name}
          ></TextField>
          <TextField
            label="Category Description"
            className="category-list-item-edit-item"
            variant="standard"
            name="description"
            defaultValue={description}
          ></TextField>
          <div className="category-list-item-edit-item-buttons">
            <Button type="submit">Yes</Button>
            <Button onClick={() => setCategoryEditIsOpen(!categoryEditIsOpen)}>
              Cancel
            </Button>
          </div>
        </form>
      )}
    </React.Fragment>
  );
}

export default MenuCategoryTab;
