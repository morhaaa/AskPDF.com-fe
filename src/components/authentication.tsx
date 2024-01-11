"use client";
import { useState } from "react";
import Login from "./login";
import Register from "./register";

const Auth: React.FC = () => {
  const [form, setForm] = useState<"Login" | "Register">("Register");

  const showLoginForm = () => {
    setForm("Login");
  };

  const showRegisterForm = () => {
    setForm("Register");
  };

  return (
    <div className="bg-slate-100 h-screen w-full flex items-center justify-center">
      <div className="w-full h-full bg-white rounded shadow-md flex sm:flex-row">
        <div className="w-full md:w-2/3 flex items-center justify-center">
          {form === "Register" ? (
            <Register showLoginForm={showLoginForm} />
          ) : (
            <Login showRegisterForm={showRegisterForm} />
          )}
        </div>
        <div className="hidden md:inline md:w-1/3 bg-red-300"></div>
      </div>
    </div>
  );
};
export default Auth;
