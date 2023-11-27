import Link from "next/link";

const ProfileNav = () => {
  return (
    <ul className="flex items-center bg-black gap-5 sm:gap-[50px] md:gap-[100px] rounded-md py-3 px-6 m-1 border border-gray text-slate font-semibold my-10">
      <li>
        <Link href="/profile">Profile</Link>
      </li>
      <li>
        <Link href="/profile/watchlist">Watchlist</Link>
      </li>
      <li>
        <Link href="/profile/followers">Followers</Link>
      </li>
      <li>
        <Link href="/profile/settings">My account</Link>
      </li>
    </ul>
  );
};

export default ProfileNav;
