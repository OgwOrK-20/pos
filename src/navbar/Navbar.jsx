import React from "react";
import "./navbar.scss";

function Navbar() {
  return (
    <div className="topbar">
      <div className="restaurant topbar-item">Restaurant Name</div>
      <div className="user topbar-item">
        <div className="user-name">FirstName LastName</div>
        <div className="user-email">test123@test.com</div>
      </div>
    </div>
  );
}

export default Navbar;
