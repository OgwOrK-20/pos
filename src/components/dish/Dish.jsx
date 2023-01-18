import { Button, Paper } from "@mui/material";
import { useState } from "react";
import React from "react";
import { connect } from "react-redux";
import "./Dish.scss";
import CreateDish from "./CreateDish";
import { toggleCreateDishPage, getDishDataFromDB } from "../../actions";
import { useEffect } from "react";
import DishTab from "./DishTab";

const mapStateToProps = (state) => {
  return {
    isOpen: state.popUp.createDishIsOpen,
    dishData: state.dish.dishData,
  };
};

function Dish(props) {
  const { isOpen, dishData, toggleCreateDishPage, getDishDataFromDB } = props;
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    getDishDataFromDB(userId);
  }, []);
  return (
    <React.Fragment>
      <div className="dish-container">
        <div className="dish-top-bar">
          {/* TODO: style the font here */}
          <div>Dish</div>
          <Button onClick={() => toggleCreateDishPage()}>Add</Button>
        </div>
        {dishData.map((dishPage) => (
          <DishTab key={dishPage.id} dishPage={dishPage}></DishTab>
        ))}
        <CreateDish isOpen={isOpen} toggle={toggleCreateDishPage}></CreateDish>
      </div>
    </React.Fragment>
  );
}

export default connect(mapStateToProps, {
  toggleCreateDishPage,
  getDishDataFromDB,
})(Dish);
