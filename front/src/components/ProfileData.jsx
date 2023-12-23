"use client";
import { useParams } from "next/navigation";
import FollowBtn from "./FollowBtn";
import { getStorageData } from "@/controllers/localStorageController";
import { useState } from "react";



const ProfileData = () => {
  const params = useParams();
  const userData = JSON.parse(getStorageData());

  //Codigo para subir imagenes
  const [image, setImage] = useState(null);
  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    console.log("imagen cargada: ", file);
    console.log("imagen cargada: ", image);
    console.log('Tipo de image:', typeof image);
    console.log(userData.token);

   

  };

  const handleUpload = async () => {
   

    try {
      const formData = new FormData();
      
      
      formData.append('File', image);
      formData.append('usuario', params.username);

      console.log("get de la imagen ", formData.get("File"));
      console.log("get del usuario ", formData.get("usuario"));

      console.log('formdata: ', formData);

      // Puedes cambiar la URL por la de tu servidor
      const response = await fetch('http://localhost:8080/media/upload', {
        method: 'POST',
        headers: {
          
          Authorization: `Bearer ${userData.token}`,
        },
        body: formData,
      });
      
      const responseData = await response.json();
      console.log('Respuesta del servidor:', responseData);
      console.log(formData)
      // Realizar acciones adicionales según sea necesario

    } catch (error) {
      console.error('Error al subir la imagen:', error);
      // Manejar errores según sea necesario
    }
  };
  //---------------------------

  return (
    <div className="flex flex-col md:flex-row gap-3 md:gap-0 justify-center md:justify-between items-center w-full">
      <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-5">
        <div className="rounded-full border-2 border-white p-1 w-[150px]">
          <img
            className="rounded-full max-w-full max-h-full aspect-square object-cover"
            src={`http://localhost:8080/media/${params.username}.jpg`}
            alt="brad pitt pfp"
          />
        </div>
        <div className="flex flex-col items-center md:items-start gap-5 md:gap-3">
          <h3 className="text-2xl font-bold">{params.username}</h3>
          <div className="flex flex-row gap-5">
            {
              //Aca estoy poniendo las cosas de la subida de imagenes
            }
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <button className="bg-white text-black" onClick={handleUpload}>Subir la imagen</button>
            
            <p>
              Favs <span className="font-bold">3.3k</span>
            </p>
            <p>
              Followers <span className="font-bold">3.3k</span>
            </p>
          </div>
        </div>
      </div>
      {userData.user !== params.username && <FollowBtn />}
    </div>
  );
};

export default ProfileData;
