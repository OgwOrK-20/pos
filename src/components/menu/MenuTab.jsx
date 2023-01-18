import { Paper } from "@mui/material";
import React from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";

function MenuTab(props) {
  const { menuPage } = props;
  return (
    <Paper
      className="display-tab"
      component={Link}
      to={menuPage._id}
      state={{ menuPage: menuPage }}
    >
      <div className="image-holder"></div>
      <div>{menuPage.name}</div>
      <div>{format(new Date(menuPage.created_date), "MM/dd/yyyy")}</div>
    </Paper>
  );
}

export default MenuTab;
