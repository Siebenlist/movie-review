"use client";

import { saveLocalStorageData } from "@/controllers/localStorageController";
import { useRouter } from "next/navigation";

import { userContext } from "@/context/propContext";
import { useContext } from "react";

import { useState } from "react";

const Login = () => {
  const [errors, setErrors] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { setUserLogged } = useContext(userContext);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("username:", username);
    console.log("pass:", password);
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        let error;
        try {
          const errorData = await response.json();
          error = errorData.message || "Error desconocido";
        } catch (e) {
          error = await response.text();
        }

        setErrors(error);
      }
      const data = await response.json();
      console.log(data);
      const datatoken = data.token.split(".")[1];
      const tokendecrypt = atob(datatoken);
      const tokenparsed = JSON.parse(tokendecrypt);
      const userLogged = {
        token: data.token,
        user: tokenparsed.sub,
      };
      saveLocalStorageData(userLogged);
      setUserLogged(userLogged);
      console.log("Login exitoso");

      router.push("/");
      router.refresh();
    } catch (error) {}
  };

  return (
    <div className="flex flex-col max-w-[400px] p-10 bg-primary gap-5 m-auto">
      <h1 className="text-4xl font-bold">Login</h1>
      <form
        className="flex flex-col gap-10  text-black"
        onSubmit={handleSubmit}
      >
        <input
          type="username"
          name="username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="py-2 px-4 rounded-sm bg-input placeholder:bg-input"
        />
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="py-2 px-4 rounded-sm bg-input placeholder:bg-input"
        />
        {errors && <p>{errors}</p>}
        <button
          type="submit"
          className="text-white text-center rounded-sm font-bold px-4 py-2 bg-button duration-300 hover:bg-buttonHover"
        >
          Login
        </button>
      </form>

      <a href="#" className="text-button duration-300 hover:text-buttonHover">
        Forgot password?
      </a>
      <p>
        Don&#39;t have an account?{" "}
        <a
          href="/register"
          className="text-button duration-300 hover:text-buttonHover"
        >
          Create one!
        </a>
      </p>
    </div>
  );
};

export default Login;
