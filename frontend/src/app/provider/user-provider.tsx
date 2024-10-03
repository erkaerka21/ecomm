"use client";

import { uRL_AUTH_api } from "@/utils/util";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

interface UserI {
  firstname: string;
  lastname: string;
  email: string;
}

interface ContextI {
  user: UserI | null;
  setUser: React.Dispatch<React.SetStateAction<UserI | null>>;
}

export const UserContext = createContext<ContextI>({
  user: null,
  setUser: () => {},
});

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserI | null>(null);
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:9000/api/v1/auth/currntuser",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        setUser(response.data);
        console.log("contextiin data harah:", response.data);
      }
    } catch (error) {
      console.error("cant fetching user", error);
    }
  };
  useEffect(() => {
    fetchUser();
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
export const useUser = () => {
  return useContext(UserContext);
};

export default UserProvider;
