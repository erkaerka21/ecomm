"use client";

import { toast } from "@/hooks/use-toast";

import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, use, useContext, useEffect, useState } from "react";

interface UserI {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  profile_image: string;
}

interface ContextI {
  user: UserI | null;
  setUser: React.Dispatch<React.SetStateAction<UserI | null>>;
  fetchUser: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const UserContext = createContext<ContextI>({
  user: null,
  setUser: () => {},
  fetchUser: async () => {},
  signOut: async () => {},
});

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserI | null>(null);
  const [token, setToken] = useState("");
  const router = useRouter();
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
  const signOut = async () => {
    await localStorage.removeItem("token");
    toast({ description: "Хэрэглэгч та системээс амжилттай гарлаа." });
    router.push("/");
  };
  useEffect(() => {
    fetchUser();
  }, [token]);

  return (
    <UserContext.Provider value={{ user, setUser, fetchUser, signOut }}>
      {children}
    </UserContext.Provider>
  );
};
export const useUser = () => {
  return useContext(UserContext);
};

export default UserProvider;
