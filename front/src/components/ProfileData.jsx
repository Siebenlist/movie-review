import { useParams } from "next/navigation";
import FollowBtn from "./FollowBtn";
import { getStorageData } from "@/controllers/localStorageController";
import { useEffect, useState } from "react";

const pfp =
    "https://images.mubicdn.net/images/cast_member/2552/cache-207-1524922850/image-w856.jpg?size=800x";

const ProfileData = () => {
  const params = useParams();
  const userData = JSON.parse(getStorageData());
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);

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
        const data = await res.json();
        return data.id !== null;
      } else {
        throw new Error("Response not ok");
      }
    } catch (error) {
      console.error("Error in getFollow:", error);
      throw error;
    }
  };

  useEffect(() => {
    checkFollow();
  }, []);

  return (
      <div className="flex flex-col md:flex-row gap-3 md:gap-0 justify-center md:justify-between items-center w-full">
        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-5">
          <div className="rounded-full border-2 border-white p-1 w-[150px]">
            <img
                className="rounded-full max-w-full max-h-full aspect-square object-cover"
                src={pfp}
                alt="brad pitt pfp"
            />
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
          </div>
        </div>
        { userData.user !== params.username && !loading ? <FollowBtn
            initialIsFollowing={isFollowing}
            username={userData.user}
            followedUsername={params.username}
        /> : ""}
      </div>
  );
};

export default ProfileData;
