"use client";
import { setCredentials } from "@/containers/authSlice";
import { StoreType } from "@/containers/store";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toastError from "@/utils/toast-error";
import { getCookies, setCookie, deleteCookie, getCookie } from "cookies-next";

const url = `${process.env.NEXT_PUBLIC_BE_URL}/v1/auth`;

const useAuth = () => {
  const [userInfo, setUserInfo] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  //Redux
  const user = useSelector((store: StoreType) => store.user.data);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setIsLoading(true);
      setUserInfo(user);
      setIsLoading(false);
    } else {
      setIsLoading(true);
      const authUser = async () => {
        try {
          const result = await axios.get(url, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          });

          if (result.data) {
            const info: IUser = {
              username: result.data.user.username,
              email: result.data.user.email,
              memberShip: result.data.user.membership,
              role: result.data.user.role,
            };
            setUserInfo(info);
            dispatch(setCredentials(info));
          } else {
            setUserInfo(null);
            dispatch(setCredentials(null));
          }
        } catch (error) {
          toastError(`Error: ${error}`);
        } finally {
          setIsLoading(false);
        }
      };
      authUser();
    }
  }, [dispatch]);

  return { userInfo, isLoading };
};

export default useAuth;
