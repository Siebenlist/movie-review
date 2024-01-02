import { useParams } from "next/navigation";
import FollowBtn from "./FollowBtn";
import { getStorageData } from "@/controllers/localStorageController";
import { useEffect, useState } from "react";
import defaultUser from "@/assets/defaultUser.jpg";
import Image from "next/image";

const ProfileData = () => {
  const params = useParams();
  const userData = JSON.parse(getStorageData());
  const [isFollowing, setIsFollowing] = useState();
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [imagenURL, setImagenURL] = useState(null);
  const [image, setImage] = useState(null);
  const [prevImage, setPrevImage] = useState(null);

  const checkFollow = async () => {
    try {
      const results = await getFollow();
      setIsFollowing(results);
    } catch (error) {
      console.error("Error checking follow:", error);
    } finally {
      // Indicar que la carga ha finalizado, sin importar si hubo éxito o error
      setLoading(false);
    }
  };

  const getFollow = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${userData.token}`,
      },
    };
    try {
      const res = await fetch(
        `http://localhost:8080/getFollow?username=${userData.user}&followedUsername=${params.username}`,
        options
      );
      if (res.ok) {
        return true;
      }
      if (res.status === 404) {
        return false;
      }
    } catch (error) {
      console.error("Error in getFollow:", error);
      throw error;
    }
  };

  useEffect(() => {
    if (userData) {
      checkFollow();
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (e.target.files.length > 0) {
      // El usuario seleccionó al menos un archivo
      setPrevImage(image);
      setImage(file);
      setIsOpen(true);
    } else {
      // El usuario canceló la operación
      setImage(null);
      setIsOpen(false);
    }
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();

      formData.append("File", image);
      formData.append("usuario", params.username);

      // Puedes cambiar la URL por la de tu servidor
      const response = await fetch("http://localhost:8080/media/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
        body: formData,
      });

      const responseData = await response.json();
      // Realizar acciones adicionales según sea necesario
      setIsOpen(false);
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      // Manejar errores según sea necesario
    }
  };
  //---------------------------

  const getPfp = async () => {
    const options = {
      method: "GET",
    };
    const res = await fetch(
      `http://localhost:8080/media/${params.username}.jpg`,
      options
    );

    try {
      if (res.ok) {
        const data = await res.blob();
        const url = URL.createObjectURL(data);
        setImagenURL(url);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPfp();

    return () => {
      if (imagenURL) {
        URL.revokeObjectURL(imagenURL);
      }
    };
  }, [isOpen]);

  return (
    <div className="flex flex-col md:flex-row gap-3 md:gap-20 justify-between items-center w-full">
      <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-5">
        <div className="rounded-full border-2 border-white p-1 w-[150px] h-[150px]">
          <div className="relative w-full h-full rounded-full">
            {userData?.user === params.username && (
              <label className="bottom-0 right-0 w-full h-full text-2xl absolute group duration-200 ease-in-out hover:flex hover:cursor-pointer justify-center items-center hover:bg-black/60 rounded-full z-10">
                <p className="hidden group-hover:block">&#128247;</p>
                <input
                  className="w-full h-full rounded-full sr-only"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            )}

            {imagenURL ? (
              <img
                src={imagenURL}
                className="top-0 left-0 rounded-full w-full h-full aspect-square object-cover absolute -z-10"
                alt="Profile picture"
              />
            ) : (
              <Image
                className="top-0 left-0 rounded-full w-full h-full aspect-square object-cover absolute -z-10"
                src={defaultUser}
                alt="Profile picture"
              />
            )}
          </div>
        </div>
        <div className="flex flex-col items-center md:items-start gap-5 md:gap-3">
          <h3 className="text-2xl font-bold">{params.username}</h3>
          <div className="flex flex-row gap-5">
            <p>
              Favs <span className="font-bold">3.3k</span>
            </p>
            <p>
              Followers <span className="font-bold">3.3k</span>
            </p>
          </div>
          <button
            className={`duration-200 bg-[#8464a4] hover:bg-[#b88be6] hover:scale-105 py-3 px-4 rounded-lg ${
              isOpen ? "block" : "hidden"
            }`}
            onClick={handleUpload}
          >
            &#128190;
          </button>
        </div>
      </div>
      {userData ? (
        userData.user !== params.username && !loading ? (
          <FollowBtn
            initialIsFollowing={isFollowing}
            username={userData.user}
            followedUsername={params.username}
          />
        ) : (
          ""
        )
      ) : (
        ""
      )}
    </div>
  );
};

export default ProfileData;
