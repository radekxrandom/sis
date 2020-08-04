import React from "react";
import Navbar from "../components/Navbar";
import UserDataForm from "../components/UserDataForm";

const Main = props => {
  return (
    <>
      <Navbar />
      <UserDataForm openAlert={props.openAlert} />
    </>
  );
};

export default Main;
