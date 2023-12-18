"use client";

import FollowBtn from "@/components/FollowBtn";
import UserInfo from "@/components/UserInfo";
import { getStorageData } from "@/controllers/localStorageController";
import { useEffect, useState } from "react";

const Followers = ({ params }) => {
  const [followToggle, setFollowToggle] = useState(false);
  const [followersList, setFollowersList] = useState([]);
  const [followingList, setFollowingList] = useState([]);
  const [isFollowing, setIsFollowing] = useState([]);
  const userData = JSON.parse(getStorageData());

  const inverseFollow = async (follow) => {
    return new Promise((resolve, reject) => {
      const found = followingList.some((followCheck) => {
        return followCheck.followed.id === follow.follower.id && followCheck.follower.id === follow.followed.id;
      });
      resolve(found);
    });
  };
  

  const checkFollow = async (follow) => {
    try {
      const result = await inverseFollow(follow);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

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
        setFollowingList(data.followedList);
        setFollowersList(data.followerList);
      }
    } catch {
      console.log(params.username);
    }
  };

  useEffect(() => {
    fetchFollowList();
  }, [followToggle]);

  useEffect(() => {
    const fetchIsFollowing = async () => {
      const promises = followersList.map(follow => checkFollow(follow));
      const results = await Promise.all(promises);
      setIsFollowing(results);
    };
  
    fetchIsFollowing();
  }, [followersList]);


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
                    {userData.user === params.username && (<FollowBtn
                      initialIsFollowing={true}
                      followedUsername={follow.followed.username}
                      username={follow.follower.username}
                  />)}
                  </div>
                );
              })
            : followersList.map((follow, index) => {
                return (
                  <div
                    className="flex justify-between items-center"
                    key={follow.id}
                  >
                    <UserInfo
                      id={follow.follower.id}
                      username={follow.follower.username}
                    />
                    {userData.user === params.username && (
                    <FollowBtn
                        username={follow.followed.username}
                        followedUsername={follow.follower.username}
                        initialIsFollowing={isFollowing[index]}
                    />)}
                  </div>
                );
              })}
        </div>
      </div>
    </section>
  );
};

export default Followers;
