"use client";

import { getStorageData } from "@/controllers/localStorageController";
import { useEffect, useState } from "react";

const Settings = () => {
  const [userInfo, setUserInfo] = useState({
    username: null,
    email: null,
    password: null,
  });

  const userData = JSON.parse(getStorageData());

  //Agarrar los datos del usuario (username, email y password) que esta iniciado sesion
  const getUserInfo = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${userData.token}`,
      },
    };

    try {
      const res = await fetch(
        `http://localhost:8080/getUserInfo?username=${userData.user}`,
        options
      );
      if (res.ok) {
        const data = await res.json();
        console.log("Bien el fetcheo de userInfo", data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Actualizar los datos de userInfo (username, email y password) que se actualizan
  const updateUserInfo = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userData.token}`,
      },
      body: JSON.stringify({
        username: userInfo.username,
        email: userInfo.email,
        password: userInfo.password,
      }),
    };

    try {
      const res = await fetch(
        `http://localhost:8080/updateUserInfo?username=${userData.user}`,
        options
      );
      if (res.ok) {
        console.log("la userInfo se ha actualizado correctamente");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e, fieldName) => {
    setUserInfo({ ...userInfo, [fieldName]: e.target.value });
    console.log(userInfo);
  };

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);

  return (
    <section className="flex flex-col justify-center mx-auto max-w-[900px]">
      <h1 className="text-4xl font-bold mt-5 mb-10 text-gray">
        Account Settings.
      </h1>
      <div className="flex flex-col gap-10 w-[500px] md:w-[900px]">
        <div className="max-w-sm mx-auto">
          <label className="block mb-2 font-medium text-gray-900">
            Change your username
          </label>
          <div className="inline-flex items-start gap-3">
            <input
              type="username"
              className="bg-input border border-gray-300 text-white placeholder:text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
              placeholder="username"
              onChange={(e) => handleChange(e, "username")}
            />
            <button
              type="submit"
              className="text-white bg-button hover:bg-buttonHover focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center"
            >
              Update
            </button>
          </div>
          <p className="mt-2 text-sm">
            Current email: <span className="font-bold text-green">sieben</span>
          </p>
        </div>
        <div className="max-w-sm mx-auto">
          <label className="block mb-2 font-medium text-gray-900">
            Change your email
          </label>
          <div className="inline-flex items-start gap-3">
            <input
              type="email"
              className="bg-input border border-gray-300 text-white placeholder:text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
              placeholder="email@email.com"
              onChange={(e) => handleChange(e, "email")}
            />
            <button
              type="submit"
              className="text-white bg-button hover:bg-buttonHover focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center"
            >
              Update
            </button>
          </div>
          <p className="mt-2 text-sm">
            Current email:{" "}
            <span className="font-bold text-green">email@email.com</span>
          </p>
        </div>
        <div className="max-w-sm mx-auto">
          <label className="block mb-2 font-medium text-gray-900">
            Change your password
          </label>
          <div className="inline-flex gap-3">
            <input
              type="password"
              className="bg-input border border-gray-300 text-white placeholder:text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
              placeholder="password"
              onChange={(e) => handleChange(e, "password")}
            />
            <button
              type="submit"
              className="text-white bg-button hover:bg-buttonHover focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Settings;
