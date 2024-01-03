"use client";

import {
  deleteStorageData,
  getStorageData,
} from "@/controllers/localStorageController";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { userContext } from "@/context/propContext";

const Settings = () => {
  // const [userInfo, setUserInfo] = useState({
  //   newUsername: null,
  //   email: null,
  //   password: null,
  // });
  const [newUsername, setNewUsername] = useState();
  const [newEmail, setNewEmail] = useState();
  const [newPassword, setNewPassword] = useState();

  const { userLogged, setUserLogged } = useContext(userContext);

  const router = useRouter();

  const [activeField, setActiveField] = useState(null);

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
        actualUsername: "sieben",
        newUsername: newUsername,
        email: newEmail,
        password: newPassword,
      }),
    };

    try {
      const res = await fetch(`http://localhost:8080/userInfo`, options);
      if (res.ok) {
        const data = await res.json();
        console.log("la userInfo se ha actualizado correctamente", data);

        router.push("/login");
      }
    } catch (error) {
      console.log("este es el error", error);
      console.log(newUsername);
    }
  };

  // const handleChange = (e, fieldName) => {
  //   // Verificar si hay otro campo de entrada activo y restablecerlo a null
  //   if (activeField && activeField !== fieldName) {
  //     setUserInfo((prevUserInfo) => ({
  //       ...prevUserInfo,
  //       [activeField]: null,
  //     }));
  //   }

  //   // Actualizar el campo de entrada activo
  //   setActiveField(fieldName);

  //   // Actualizar el estado con la nueva entrada del usuario
  //   setUserInfo((prevUserInfo) => ({
  //     ...prevUserInfo,
  //     [fieldName]: e.target.value,
  //   }));
  // };

  const handlePost = (fieldName, valueSetter) => (e) => {
    valueSetter(e.target.value);
  };

  useEffect(() => {
    console.log(newUsername);
  }, [newUsername]);

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
              type="text"
              className="bg-input border border-gray-300 text-white placeholder:text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
              placeholder="username"
              onChange={handlePost("newUsername", setNewUsername)}
            />
            <button
              type="submit"
              className="text-white bg-button hover:bg-buttonHover focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center"
              onClick={() => updateUserInfo()}
            >
              Update
            </button>
          </div>
          <p className="mt-2 text-sm">
            Current username:{" "}
            <span className="font-bold text-green">{userLogged.user}</span>
          </p>
        </div>
        <div className="max-w-sm mx-auto">
          <label className="block mb-2 font-medium text-gray-900">
            Change your email
          </label>
          <div className="inline-flex items-start gap-3">
            <input
              type="email"
              value={newEmail || ""}
              className="bg-input border border-gray-300 text-white placeholder:text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
              placeholder="email@email.com"
              onChange={(e) => handlePost(e, "Email")}
            />
            <button
              type="submit"
              className="text-white bg-button hover:bg-buttonHover focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center"
              onClick={() => updateUserInfo()}
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
              value={newPassword || ""}
              className="bg-input border border-gray-300 text-white placeholder:text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
              placeholder="password"
              onChange={(e) => handlePost(e, "Password")}
            />
            <button
              type="submit"
              className="text-white bg-button hover:bg-buttonHover focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center"
              onClick={() => updateUserInfo()}
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
