import toastError from "@/utils/toast-error";
import axios from "axios";

const url = `${process.env.NEXT_PUBLIC_BE_URL}/v1`;

export const logOut = async (): Promise<void> => {
  try {
    const res = await axios.get(`${url}/logout`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    console.log(res);
  } catch (e) {
    toastError("Error");
  }
};
