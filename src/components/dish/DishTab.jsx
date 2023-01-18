import { Paper, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function DishTab(props) {
  const { dishPage } = props;
  return (
    <Paper
      className="dish-tab"
      component={Link}
      to={dishPage.id}
      state={{ dishPage: dishPage }}
    >
      <Typography>{dishPage.name}</Typography>
    </Paper>
  );
}

export default DishTab;
