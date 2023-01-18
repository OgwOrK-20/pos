import { Button, Paper } from "@mui/material";
import React from "react";
import CreateMenu from "./CreateMenu";
import { connect } from "react-redux";
import { toggleCreateMenuPage, getMenuDataFromDB } from "../../actions";
import "./Menu.scss";
import { useEffect } from "react";
import MenuTab from "./MenuTab";

const mapStateToProps = (state) => {
  return {
    createMenu: state.createMenu,
    menuData: state.menu.menuData,
  };
};

function Menu(props) {
  const userId = localStorage.getItem("userId");
  const { toggleCreateMenuPage, getMenuDataFromDB, menuData } = props;
  useEffect(() => {
    getMenuDataFromDB(userId);
  }, []);
  return (
    <React.Fragment>
      <div className="menu-container">
        <div className="menu-top-bar">
          <div>Menu</div>
          <Button onClick={() => toggleCreateMenuPage()}>Add</Button>
        </div>
        {menuData.map((menuPage) => {
          return <MenuTab key={menuPage._id} menuPage={menuPage}></MenuTab>;
        })}
      </div>
      <CreateMenu></CreateMenu>
    </React.Fragment>
  );
}

export default connect(mapStateToProps, {
  toggleCreateMenuPage,
  getMenuDataFromDB,
})(Menu);
