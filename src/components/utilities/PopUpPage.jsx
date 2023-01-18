import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import "./PopUpPage.scss";

//mask:z-index:1300
// A template popup window
// The inside content is rendered by {props.children}
function PopUpPage(props) {
  return (
    props.isOpen && (
      <React.Fragment>
        <div className="popup-mask"></div>
        <div
          className="popup-container"
          style={{ width: props.width, height: props.height }}
        >
          <div onClick={() => props.toggle()}>
            <CloseIcon
              className="popup-close"
              fontSize="large"
              color="inherit"
            ></CloseIcon>
          </div>
          {props.children}
        </div>
      </React.Fragment>
    )
  );
}

export default PopUpPage;
