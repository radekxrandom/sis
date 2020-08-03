import React, { useEffect, useState } from "react";
import AuthNavbar from "../components/AuthNavbar";
import Form from "../components/Form";
import { mainAxios } from "../axios/config";
import withInput from "../withInput";
const WrapForm = withInput(Form);

const Main = props => {
  const [data, setData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const result = await mainAxios.get("api/v1/user/basicinfo");
      console.log(result.data);
      setData(result.data);
    };
    fetchData();
  }, []);
  return (
    <>
      <AuthNavbar />
      <WrapForm userData={data} openAlert={props.openAlert} />
    </>
  );
};

export default Main;
