"use client";
import { login } from "@/containers/authSlice";
import { AppDispatch } from "@/containers/store";
import toastError from "@/utils/toast-error";
import { useRef, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const Login: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const pswRegex = /^.{6,}$/;

  const userMailRef = useRef<HTMLInputElement>(null);
  const pswRef = useRef<HTMLInputElement>(null);

  const [userMail, setUserMail] = useState("");
  const [isValidMail, setIsValidMail] = useState<boolean>(false);
  const [userMailFocus, setUserMailFocus] = useState<boolean>(false);

  const [psw, setPsw] = useState("");
  const [isValidPsw, setIsValidPsw] = useState<boolean>(false);
  const [pswFocus, setPswFocus] = useState<boolean>(false);

  useEffect(() => {
    if (userMailRef.current) {
      userMailRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const isValidMail = emailRegex.test(userMail);
    setIsValidMail(isValidMail);
  }, [userMail]);

  useEffect(() => {
    const isValidPsw = pswRegex.test(psw);
    setIsValidPsw(isValidPsw);
  }, [psw]);

  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setUserMail(value);
  };

  const handlePswInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setPsw(value);
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (isValidMail && isValidPsw) {
      try {
        dispatch(login({ email: userMail, psw: psw }))
          .unwrap()
          .then(() => router.push("/dashboard"))
          .catch((error) => console.error("rejected", error));
      } catch (e) {
        console.log(e);
        toast.error("error");
      }
    } else {
      let errors: string[] = [];

      if (!isValidMail) {
        errors.push("Invalid email");
      }

      if (!isValidPsw) {
        errors.push("Invalid password. It must contain at least 6 characters");
      }

      toastError(
        <ul className="list-disc pl-4 flex flex-col gap-2">
          {errors.map((error, index) => (
            <li key={index} className="text-red-600">
              {error}
            </li>
          ))}
        </ul>
      );
    }
  };

  const showRegister = () => {
    router.push("/sign-up");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">Login</h1>

      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-md font-semibold text-gray-600"
        >
          Email
        </label>
        <input
          type="text"
          id="email"
          autoComplete="off"
          onChange={(e) => handleEmailInput(e)}
          placeholder="Insert your email"
          required
          onFocus={() => setUserMailFocus(true)}
          onBlur={() => setUserMailFocus(false)}
          ref={userMailRef}
          className={`w-full px-4 py-3 border ${
            userMailFocus ? "border-blue-500" : "border-gray-300"
          } rounded-lg focus:outline-none focus:shadow-outline-blue`}
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="password"
          className="block text-md font-semibold text-gray-600"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          autoComplete="off"
          onChange={(e) => handlePswInput(e)}
          placeholder="Insert your password"
          required
          onFocus={() => setPswFocus(true)}
          onBlur={() => setPswFocus(false)}
          ref={pswRef}
          className={`w-full px-4 py-3 border ${
            pswFocus ? "border-blue-500" : "border-gray-300"
          } rounded-lg focus:outline-none focus:shadow-outline-blue`}
        />
      </div>

      <Button type="submit" className="w-full py-6">
        <span className="font-bold text-medium"> Submit</span>
      </Button>

      <div className="flex flex-col md:flex-row gap-1 items-center justify-center pt-5">
        <p className="text-sm text-center md:text-left">
          Don&apos;t have an account?
        </p>
        <p
          onClick={showRegister}
          className="text-sm text-center md:text-right text-blue-500 font-medium cursor-pointer hover:underline"
        >
          Sign Up
        </p>
      </div>
    </form>
  );
};

export default Login;
