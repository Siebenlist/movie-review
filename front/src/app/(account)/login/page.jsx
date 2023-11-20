"use client";

import { useState } from "react";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("email:", email);
    console.log("pass:", password);
    try {
      const response = await fetch("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Successful login, you may redirect or perform other actions
        console.log("Login exitoso");
      } else {
        // Handle login failure
        console.error("Fallo el login");
      }
    } catch (error) {
      console.error("Error al iniciar sesion");
    }
  };

  return (
    <main className="">
      <div className="flex flex-col max-w-[400px] p-10 bg-primary gap-5 mx-auto">
        <h1 className="text-4xl font-bold">Login</h1>
        <form
          className="flex flex-col gap-10  text-black"
          action=""
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
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
    </main>
  );
};

export default Login;
