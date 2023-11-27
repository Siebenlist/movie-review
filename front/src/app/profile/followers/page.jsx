import UserInfo from "@/components/UserInfo";
import { users } from "@/data/users";

const Followers = () => {
  return (
    <section>
      <div className="relative overflow-x-auto max-w-[1000px] mx-auto">
        <div className="w-full">
          <p className="text-slate uppercase">Fav films</p>
          <div className="max-w-full h-[1px] bg-gray"></div>
        </div>
        <div>
          {users.map((user) => {
            return (
              <UserInfo
                username={user.username}
                pfp={user.pfp}
                id={user.id}
                favs={user.favs}
                followers={user.followers}
                following={user.following}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Followers;
