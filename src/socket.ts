import { io } from "socket.io-client";

const URL = `${process.env.NEXT_PUBLIC_BE_URL}` || "";

export const socket = io(URL);
