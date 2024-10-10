"use client";

import { uRL_AUTH_api } from "@/utils/util";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

interface UserI {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
}

interface ContextI {
  user: UserI | null;
  setUser: React.Dispatch<React.SetStateAction<UserI | null>>;
  fetchUser: object;
}

export const UserContext = createContext<ContextI>({
  user: null,
  setUser: () => {},
  fetchUser: () => {},
});

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserI | null>(null);
  const [token, setToken] = useState("");
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      setToken(token || "");
      const response = await axios.get(
        "http://localhost:9000/api/v1/auth/currntuser",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        setUser(response.data.findCurrentU);
        console.log("contextiin data harah:", response.data);
      }
    } catch (error) {
      console.error("cant fetching user", error);
    }
  };
  useEffect(() => {
    fetchUser();
  }, [token]);

  return (
    <UserContext.Provider value={{ user, setUser, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};
export const useUser = () => {
  return useContext(UserContext);
};

export default UserProvider;
