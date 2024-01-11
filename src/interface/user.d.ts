interface IUser {
  email: string;
  username: string;
  memberShip: string;
  role: "user" | "admin";
  password?: string;
  accessToken?: string;
}
