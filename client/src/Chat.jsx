import React, { useState, useEffect } from "react";
import axios from "axios";
import { /*Link,*/ useNavigate } from "react-router-dom";
import Nav from "./components/MainNav";

function Chat() {
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      if (!localStorage.getItem("metchat-user")) {
        navigate("/");
      } else {
        const data = await JSON.parse(localStorage.getItem("metchat-user"));
      }
    }
    fetchData();
  }, [navigate]);

  return (
    <>
      <Nav />
    </>
  );
}

export default Chat;
