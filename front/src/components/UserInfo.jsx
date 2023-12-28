import FollowBtn from "./FollowBtn";

const UserInfo = ({ id, username, pfp }) => {
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
        <h3 className="font-bold">{username}</h3>
      </div>
    </article>
  );
};

export default UserInfo;
