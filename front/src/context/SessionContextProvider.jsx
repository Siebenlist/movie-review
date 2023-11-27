"use client";

import { useEffect, useState } from "react";
import { userContext } from "./propContext";

import { getStorageData } from "@/controllers/localStorageController";

const SessionContextProvider = ({ children }) => {
  const [userLogged, setUserLogged] = useState({});

  useEffect(() => {
    const userData = getStorageData();
    if (userData) {
      setUserLogged(JSON.parse(userData));
      console.log("The user is logged", userData);
    } else {
      console.log("There is no user");
    }
  }, []);

  return (
    <userContext.Provider value={{ userLogged, setUserLogged }}>
      {children}
    </userContext.Provider>
  );
};

export default SessionContextProvider;
