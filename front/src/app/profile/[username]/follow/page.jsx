"use client";

import FollowBtn from "@/components/FollowBtn";
import UserInfo from "@/components/UserInfo";
import { getStorageData } from "@/controllers/localStorageController";
import { useEffect, useState } from "react";

const Followers = ({ params }) => {
  const [followToggle, setFollowToggle] = useState(false);
  const [followersList, setFollowersList] = useState([]);
  const [followingList, setFollowingList] = useState([]);

  const userData = JSON.parse(getStorageData());

  const setFollowers = () => {
    if (followToggle !== false) {
      setFollowToggle(false);
    }
  };

  const setFollowing = () => {
    if (followToggle !== true) {
      setFollowToggle(true);
    }
  };

  const fetchFollowList = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${userData.token}`,
      },
    };
    try {
      const res = await fetch(
        `http://localhost:8080/getFollowList?username=${params.username}`,
        options
      );
      if (res.ok) {
        const data = await res.json();
        setFollowingList(data.followerList);
        setFollowersList(data.followedList);
        console.log(data);
      }
    } catch {
      console.log(params.username);
    }
  };

  useEffect(() => {
    fetchFollowList();
  }, [followToggle]);

  return (
    <section>
      <div className="relative overflow-x-auto max-w-[1000px] mx-auto">
        <div className="flex justify-center items-center gap-5 ">
          <button
            className={`px-3 duration-200 ${
              followToggle == false ? "font-bold" : "font-base"
            }`}
            onClick={() => setFollowers()}
          >
            Followers
          </button>
          <button
            className={`px-3 duration-200 ${
              followToggle == true ? "font-bold" : "font-base"
            }`}
            onClick={() => setFollowing()}
          >
            Following
          </button>
        </div>

        <div>
          {followToggle
            ? followingList.map((follow) => {
                return (
                  <div
                    className="flex justify-between items-center"
                    key={follow.id}
                  >
                    <UserInfo
                      id={follow.followed.id}
                      username={follow.followed.username}
                    />
                    <FollowBtn
                      initialIsFollowing={true}
                      followedId={follow.followed.id}
                      username={follow.follower.username}
                    />
                    <button
                      onClick={() => {
                        console.log(follow.id);
                      }}
                    >
                      console.log
                    </button>
                  </div>
                );
              })
            : followersList.map((follow) => {
                return (
                  <div
                    className="flex justify-between items-center"
                    key={follow.id}
                  >
                    <UserInfo
                      id={follow.follower.id}
                      username={follow.follower.username}
                    />
                    <FollowBtn
                      username={follow.followed.username}
                      followedId={follow.follower.id}
                      initialIsFollowing={true}
                    />
                    <button
                      onClick={() => {
                        console.log(follow.id);
                      }}
                    >
                      console.log
                    </button>
                  </div>
                );
              })}
        </div>
      </div>
    </section>
  );
};

export default Followers;
