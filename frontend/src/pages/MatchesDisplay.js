/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Oval } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import maleUser from "../img/profuser.svg";

export default function MatchesDisplay({ setClickedUser }) {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [users, setUsers] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // console.log('here');
    let isSubscribed = true;
    const fetchData = async () => {
      const params = {
        user_id: cookies["UserId"],
      };
      const data = await api.getMatchedUsers(params);
      // console.log('here');
      // console.log(data);

      if (isSubscribed) {
        setUsers(data.data);
      }
    };
    fetchData().catch(console.error);

    return () => (isSubscribed = false);
  }, []);
  //   console.log(users);
  if (!users) {
    return (
      <div className="flex justify-center items-center h-[75%]">
        <Oval color="#fd2f6e" height={80} width={80} />
      </div>
    );
  }

  return (
    <div className="h-[100%] overflow-y-auto flex flex-col items-center mt-6">
      {users.map((user, _index) => (
        <div className="flex flex-col items-center justify-center" key={_index}>
          <div className="flex flex-row items-center justify-between h-24 w-[290px] md:h-16 md:w-[420px] bg-white rounded-lg">
            <div className="h-[100%] flex flex-row items-center justify-center ml-4">
              <img
                src={user.img_url ? user.img_url : maleUser}
                className="h-[50%] md:h-[70%] rounded-full cursor-pointer"
                onClick={() => {
                  navigate(`/profile/${user.user_id}`);
                }}
              />
              <div className="ml-2">
                <h2 className="text-base">{user.name}</h2>
                <h4 className=" text-xs opacity-70">
                  {user.professional_title}
                </h4>
              </div>
            </div>
            <i
              className="fa-regular fa-comment text-2xl mr-6 opacity-30 cursor-pointer hover:text-[#fd2f6e] hover:opacity-80"
              onClick={() => {
                setClickedUser(user);
              }}
            ></i>
          </div>
          <div className=" h-[1px] bg-slate-700 mt-2 mb-2 opacity-20 w-[290px] md:w-[420px]"></div>
        </div>
      ))}
    </div>
  );
}
