import { Alert, AlertTitle, Collapse, Fade, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import "./FeedbackModal.scss";
import { connect } from "react-redux";
import { setFeedback, resetFeedback } from "../../actions";

const mapStateToProps = (state) => {
  return {
    trigger: state.feedback.trigger,
    hasError: state.feedback.hasError,
    message: state.feedback.message,
  };
};

function FeedbackModal(props) {
  const { trigger, hasError, message, resetFeedback } = props;
  return (
    <div className="alert-popup-container">
      {hasError ? (
        <Collapse in={trigger}>
          <Alert
            className="alert-popup"
            severity="error"
            action={
              <IconButton onClick={resetFeedback}>
                <CloseIcon />
              </IconButton>
            }
          >
            <AlertTitle>Error</AlertTitle>
            {message}
          </Alert>
        </Collapse>
      ) : (
        <Collapse in={trigger}>
          <Alert
            className="alert-popup"
            severity="success"
            action={
              <IconButton onClick={resetFeedback}>
                <CloseIcon />
              </IconButton>
            }
          >
            <AlertTitle>Success</AlertTitle>
            {message}
          </Alert>
        </Collapse>
      )}
    </div>
  );
}

export default connect(mapStateToProps, { setFeedback, resetFeedback })(
  FeedbackModal
);
