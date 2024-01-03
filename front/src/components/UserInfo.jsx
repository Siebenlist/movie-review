import Image from "next/image";
import FollowBtn from "./FollowBtn";
import Link from "next/link";

const UserInfo = ({ id, username, pfp }) => {
  return (
    <article className="flex justify-between items-center p-5 mx-20" key={id}>
      <div className="flex items-center gap-5">
        <div className="w-[70px] rounded-full">
          <img
            className="rounded-full aspect-square w-[70px] h-[70px]"
            src={`http://localhost:8080/media/${username}.jpg`}
            alt={`${username}'s profile picture`}
          />
        </div>
        <Link href={`/profile/${username}`} className="font-bold">
          {username}
        </Link>
      </div>
    </article>
  );
};

export default UserInfo;
