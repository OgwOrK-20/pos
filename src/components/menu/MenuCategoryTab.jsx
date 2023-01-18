import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  TextField,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React from "react";
import "./MenuPage.scss";
import { useState } from "react";

function MenuCategoryTab() {
  const [categoryEditIsOpen, setCategoryEditIsOpen] = useState(false);
  const handleCategoryEditClick = () => {
    setCategoryEditIsOpen(!categoryEditIsOpen);
  };

  return (
    <React.Fragment>
      <ListItem
        button
        className="category-list-item"
        secondaryAction={
          <IconButton onClick={handleCategoryEditClick}>
            <MoreVertIcon></MoreVertIcon>
          </IconButton>
        }
      >
        <ListItemAvatar>
          <Avatar></Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Pizza"
          secondary="Very delicious pizza"
        ></ListItemText>
      </ListItem>
      {categoryEditIsOpen && (
        <form className="category-list-item-edit">
          <TextField
            label="Category Name"
            className="category-list-item-edit-item"
            variant="standard"
          ></TextField>
          <TextField
            label="Category Description"
            className="category-list-item-edit-item"
            variant="standard"
          ></TextField>
        </form>
      )}
    </React.Fragment>
  );
}

export default MenuCategoryTab;
