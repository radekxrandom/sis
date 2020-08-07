import { useState } from "react";
import { mainAxios } from "../axios/config";

export default function useSubmitHook(openAlert) {
  const [animation, setAnimation] = useState("");

  const displayErrAlert = text => {
    openAlert(text, "info");
    setAnimation("shake-horizontal");
    setTimeout(() => setAnimation(""), 300);
  };

  const submit = async (method, url, form) => {
    try {
      const post = await mainAxios[method](url, form);
      return post;
    } catch (err) {
      if (err.response) {
        displayErrAlert(err.response.data[0]?.message?.text);
      } else {
        displayErrAlert("Nieokreślony problem");
      }
      return false;
    }
  };

  return [animation, submit, displayErrAlert];
}
