import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Form from "../components/Form";
import { mainAxios } from "../axios/config";

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
      <Navbar />
      <Form userData={data} openAlert={props.openAlert} />
    </>
  );
};

export default Main;
