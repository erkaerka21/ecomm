"use client";

import { createContext, useState } from "react";

export const UserContext = createContext() || "";

export const UserProvider = ({ children }) => {
  const [userContextData, setUserContextData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phoneNumber: "",
    profile_image: "",
    address: "",
  });
  const fetchUserConData = async () => {
    try {
    } catch {}
  };
};
