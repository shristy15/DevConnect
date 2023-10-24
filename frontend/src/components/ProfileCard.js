/* eslint-disable */
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function ProfileCard({ user, handleMatch, handleReject }) {
  const navigate = useNavigate();
  // console.log(user)
  const userAbout =
    user.about.length > 230 ? user.about.substring(0, 230) + "..." : user.about;
  const handleClick = (user_id) => {
    navigate(`/profile/${user_id}`);
  };

  return (
    <div className="snap-start lg:snap-center lg:min-w-[50vw] h-[100vh] flex justify-center items-center lg:ml-20 lg:mr-20 lg:mt-5">
      <div className="card bg-white drop-shadow-xl max-w-[340px] md:max-w-[400px] lg:max-w-[650px] h-[85vh] lg:h-[450px] mt-20 lg:mt-0 flex flex-row rounded-3xl">
        <div
          className="card-text flex flex-col lg:grid"
          style={{ gridTemplateColumns: "3fr 5fr" }}
        >
          {!user.img_url && (
            <div
              className="portada w-[100%] h-[100%] rounded-tl-3xl rounded-tr-3xl lg:rounded-bl-3xl lg:rounded-tr-none bg-center bg-cover"
              style={{ backgroundImage: 'url("../img/profuser.svg")' }}
            ></div>
          )}
          {user.img_url && (
            <div
              className="portada w-[100%] h-[100%] rounded-tl-3xl rounded-tr-3xl lg:rounded-bl-3xl lg:rounded-tr-none bg-center bg-cover"
              style={{ backgroundImage: `url(${user.img_url})` }}
            ></div>
          )}
          <div className="title-total lg:pt-10 pb-6 pr-4 pl-4">
            <div className="title p-4 text-right text-[#fd2f6e] font-semibold text-lg">
              {user.professional_title}
            </div>
            <h2 className="m-0 pr-4 pl-4 text-2xl font-bold md:mt-5">
              {user.name}
            </h2>
            <h3 className="m-0 pr-4 pl-4 text-base font-semibold text-[#fd2f6e] md:mt-1">
              Work experience: {user.years_of_experience}{" "}
              {user.years_of_experience === 1
                ? "year"
                : user.years_of_experience === 0
                ? ""
                : "years"}
            </h3>
            <div className="desc pt-2 pb-2 pr-4 pl-4 text-sm break-words max-w-[308px] md:max-w-[368px]">
              {userAbout}
            </div>
            <div className="actions flex flex-row justify-center align-center mt-3 lg:mt-6">
              <button
                className="bg-[#fe5740] pt-2 pb-2 lg:pl-4 lg:pr-4 pl-3 pr-3 text-white lg:text-lg rounded-full lg:mr-4 mr-3 text-base hover:bg-[#FFD9C0] hover:text-[#fe5740]"
                onClick={() => {
                  handleReject(user.user_id);
                }}
              >
                Pass
              </button>
              <button
                className="bg-[#fd2f6e] pt-2 pb-2 lg:pl-4 lg:pr-4 pl-3 pr-3 text-white lg:text-lg rounded-full lg:mr-4 mr-3 text-base hover:bg-[#FFD9C0] hover:text-[#fd2f6e]"
                onClick={() => {
                  handleMatch(user.user_id);
                }}
              >
                Collaborate
              </button>
              <button
                className="bg-[#fd2f6e] pt-2 pb-2 lg:pl-4 lg:pr-4 pl-3 pr-3 text-white lg:text-lg rounded-full lg:mr-4 mr-3 text-base hover:bg-[#FFD9C0] hover:text-[#fd2f6e]"
                onClick={() => handleClick(user.user_id)}
              >
                View
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
