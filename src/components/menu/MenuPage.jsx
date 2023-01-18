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
import { useLocation } from "react-router-dom";
import "./MenuPage.scss";
import MenuCategoryTab from "./MenuCategoryTab";
import MenuDishTab from "./MenuDishTab";

function MenuPage() {
  const location = useLocation();
  console.log(location);
  const { name, dishes } = location.state.menuPage;
  const dummyList = [1, 1, 1, 1, 1, 1];
  return (
    <div className="menuPage-container">
      <div className="category-container">
        <List className="category-list">
          {dummyList.map(() => (
            <MenuCategoryTab></MenuCategoryTab>
          ))}
        </List>
      </div>
      <div className="category-dish-container">
        {dummyList.map(() => (
          <MenuDishTab></MenuDishTab>
        ))}
      </div>
    </div>
  );
}

export default MenuPage;
