"use client";
import { setCredentials } from "@/containers/authSlice";
import { StoreType } from "@/containers/store";
import toastError from "@/utils/toast-error";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const url = `${process.env.NEXT_PUBLIC_BE_URL}/v1/auth`;

const useAuth = () => {
  const [userInfo, setUserInfo] = useState<IUser | null>(null);

  //Redux
  const user = useSelector((store: StoreType) => store.user.data);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setUserInfo(user);
    } else {
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
          }
        } catch (error) {
          toastError(`Error: ${error}`);
        }
      };
      authUser();
    }
  }, [dispatch, user]);

  return userInfo;
};

export default useAuth;
