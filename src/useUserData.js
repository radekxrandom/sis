import { useState, useEffect } from "react";
import { mainAxios } from "./axios/config";

export default function useUserData(err, setErr) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [userInfo, setUserInfo] = useState({});

  const fetchData = async () => {
    try {
      const result = await mainAxios.get("api/v1/user/basicinfo");

      console.log(result.data);
      const rawData = result.data;
      const userData = Object.fromEntries(
        Object.entries(rawData).map(([key, value]) => [key, value || ""])
      );
      setData(userData);
      setUserInfo({
        name: userData.name,
        surname: userData.surname
      });
      setLoading(false);
    } catch (err) {
      console.log("Server error?");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return [
    userInfo,
    fetchData,
    loading,
    data,
    function(e) {
      const { name, value } = e.target;
      err[name] = null;
      setErr(err);
      setData({
        ...data,
        [name]: value
      });
    }
  ];
}
