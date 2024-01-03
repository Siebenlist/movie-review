import Link from "next/link";
import { useParams } from "next/navigation";

const ProfileNav = () => {
  const params = useParams();

  return (
    <ul className="flex items-center bg-black gap-5 sm:gap-[50px] md:gap-[100px] rounded-md py-3 px-6 m-1 border border-gray text-slate font-semibold my-10">
      <li>
        <Link href={`/profile/${params.username}`}>Profile</Link>
      </li>
      <li>
        <Link href={`/profile/${params.username}/watchlist`}>Watchlist</Link>
      </li>
      <li>
        <Link href={`/profile/${params.username}/follow`}>Followers</Link>
      </li>
    </ul>
  );
};

export default ProfileNav;
