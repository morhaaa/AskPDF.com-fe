"use client";
import toastError from "@/utils/toast-error";
import axios from "axios";
import { useRef, useState, useEffect } from "react";
import toast from "react-hot-toast";

interface RegisterProps {
  showLoginForm: () => void;
}

const Register: React.FC<RegisterProps> = ({ showLoginForm }) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/; // from 3 to 20
  const pswRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;

  const userMailRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const pswRef = useRef<HTMLInputElement>(null);
  const confirmPswRef = useRef<HTMLInputElement>(null);

  const [userMail, setUserMail] = useState("");
  const [isValidMail, setIsValidMail] = useState<boolean>(false);
  const [userMailFocus, setUserMailFocus] = useState<boolean>(false);

  const [username, setUsername] = useState("");
  const [isValidUsername, setIsValidUsername] = useState<boolean>(false);
  const [usernameFocus, setUsernameFocus] = useState<boolean>(false);

  const [psw, setPsw] = useState("");
  const [isValidPsw, setIsValidPsw] = useState<boolean>(false);
  const [pswFocus, setPswFocus] = useState<boolean>(false);

  const [confirmPsw, setConfirmPsw] = useState("");
  const [isValidConfirmPsw, setIsValidConfirmPsw] = useState<boolean>(false);
  const [confirmPswFocus, setConfirmPswFocus] = useState<boolean>(false);

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
    const isValidUsername = usernameRegex.test(username);
    setIsValidUsername(isValidUsername);
  }, [username]);

  useEffect(() => {
    const isValidPsw = pswRegex.test(psw);
    setIsValidPsw(isValidPsw);
  }, [psw]);

  useEffect(() => {
    const isValidConfirmPsw = pswRegex.test(confirmPsw);
    setIsValidConfirmPsw(isValidConfirmPsw);
  }, [confirmPsw]);

  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setUserMail(value);
  };

  const handleUsernameInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = e.target.value;
    setUsername(value);
  };

  const handlePswInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setPsw(value);
  };

  const handleConfirmPswInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = e.target.value;
    setConfirmPsw(value);
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    let errors: string[] = [];

    if (!isValidMail) {
      errors.push("Invalid email");
    }

    if (!isValidUsername) {
      errors.push(
        "Invalid username. It must contain between 3 and 20 characters"
      );
    }

    if (!isValidPsw) {
      errors.push(
        "Invalid password. It must contain:\n" +
          "- At least 6 characters long\n" +
          "- Must contain at least one letter (uppercase or lowercase)\n" +
          "- Must contain at least one digit\n"
      );
    }

    if (!isValidConfirmPsw) {
      errors.push("Passwords do not match");
    }

    if (isValidMail && isValidUsername && isValidPsw && isValidConfirmPsw) {
      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_BE_URL}/v1/register`,
          JSON.stringify({
            email: userMail,
            username: username,
            password: psw,
          }),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
      } catch (e) {
        toast.error("Error during registration");
      }
    } else {
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

  return (
    <form onSubmit={handleSubmit} className="w-96">
      <h1 className="text-3xl font-bold mb-4">Sign up</h1>

      <div className="mb-2">
        <label
          htmlFor="email"
          className="block text-md font-semibold text-gray-600"
        >
          Email
        </label>
        <input
          type="text"
          id="email"
          placeholder="Insert your email"
          autoComplete="off"
          onChange={(e) => handleEmailInput(e)}
          required
          onFocus={() => setUserMailFocus(true)}
          onBlur={() => setUserMailFocus(false)}
          ref={userMailRef}
          className={`w-full px-4 py-3 border ${
            userMailFocus ? "border-blue-500" : "border-gray-300"
          } rounded-lg focus:outline-none focus:shadow-outline-blue placeholder:text-sm`}
        />
      </div>

      <div className="mb-2">
        <label
          htmlFor="username"
          className="block text-md font-semibold text-gray-600"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          placeholder="Choose your username (3-20 characters)"
          autoComplete="off"
          onChange={(e) => handleUsernameInput(e)}
          required
          onFocus={() => setUsernameFocus(true)}
          onBlur={() => setUsernameFocus(false)}
          ref={usernameRef}
          className={`w-full px-4 py-3 border ${
            usernameFocus ? "border-blue-500" : "border-gray-300"
          } rounded-lg focus:outline-none focus:shadow-outline-blue placeholder:text-sm`}
        />
      </div>

      <div className="mb-2">
        <label
          htmlFor="password"
          className="block text-md font-semibold text-gray-600"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="Enter a secure password"
          autoComplete="off"
          onChange={(e) => handlePswInput(e)}
          required
          onFocus={() => setPswFocus(true)}
          onBlur={() => setPswFocus(false)}
          ref={pswRef}
          className={`w-full px-4 py-3 border ${
            pswFocus ? "border-blue-500" : "border-gray-300"
          } rounded-lg focus:outline-none focus:shadow-outline-blue placeholder:text-sm`}
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="confirmPassword"
          className="block text-md font-semibold text-gray-600"
        >
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          placeholder="Confirm your password"
          autoComplete="off"
          onChange={(e) => handleConfirmPswInput(e)}
          required
          onFocus={() => setConfirmPswFocus(true)}
          onBlur={() => setConfirmPswFocus(false)}
          ref={confirmPswRef}
          className={`w-full px-4 py-3 border ${
            confirmPswFocus ? "border-blue-500" : "border-gray-300"
          } rounded-lg focus:outline-none focus:shadow-outline-blue placeholder:text-sm`}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-3 rounded-xl hover:bg-blue-600 transition duration-300"
      >
        Submit
      </button>

      <div className="flex gap-1 w-full items-center justify-center pt-5">
        <p className="text-sm text-center ">Have an account?</p>
        <p
          onClick={showLoginForm}
          className="text-sm text-center text-blue-500 font-medium cursor-pointer hover:underline"
        >
          Log in
        </p>
      </div>
    </form>
  );
};

export default Register;
