import { store } from "@/containers/store";

export const isAuthenticated = store.getState().user.data;
export const userInfo = store.getState().user.data as IUser;
