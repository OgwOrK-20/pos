import React from "react";
import { BrowserRouter } from "react-router-dom";
// import "./App.scss";
import Dashboard from "./dashboard/Dashboard";
import "./App.scss"
import router from "./router";
import { connect } from "react-redux";
import SignIn from "./starter/Signin";
import FeedbackModal from "./components/utilities/FeedbackModal";

const mapStateToProps = (state) => {
  return { user: state.user }
}


function App(props) {
  const isLogin = localStorage.getItem('token') !== null
  console.log(isLogin)
  return (
    isLogin ? <BrowserRouter>
      <Dashboard>
        {router}
        <FeedbackModal></FeedbackModal>
      </Dashboard>
    </BrowserRouter> : <SignIn>
    </SignIn>)
}

export default connect(mapStateToProps, {})(App);
