import React from "react";
import { useLocation } from "react-router-dom";

function DishPage() {
  const location = useLocation();
  return <React.Fragment>{location.state.dishPage.id}</React.Fragment>;
}

export default DishPage;
