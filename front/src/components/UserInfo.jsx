import FollowBtn from "./FollowBtn";

const UserInfo = ({ id, username, pfp, favs, followers, following }) => {
  return (
    <article className="flex justify-between items-center p-5" key={id}>
      <div className="flex items-center gap-5">
        <div className="w-[70px] rounded-full">
          <img
            className="rounded-full aspect-square"
            src={pfp}
            alt={`${username}'s profile picture`}
          />
        </div>
        <div className="flex flex-col md:flex-row md:gap-5">
          <h3 className="font-bold">{username}</h3>
          <div className="flex gap-3">
            <p>{favs}k</p>
            <p>{followers}k</p>
          </div>
        </div>
      </div>
      <div>
        <FollowBtn initialIsFollowing={following} />
      </div>
    </article>
  );
};

export default UserInfo;
