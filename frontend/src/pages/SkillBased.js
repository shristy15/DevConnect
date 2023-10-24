/* eslint-disable */
import Multiselect from "multiselect-react-dropdown";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { api } from "../api";

export default function SkillBased() {
  const [reqSkills, setReqSkills] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    // console.log('here');
    let isSubscribed = true;
    const fetchData = async () => {
      let data;
      if (reqSkills.length === 0) {
        const params = {
          user_id: cookies["UserId"],
        };
        data = await api.getAllUsers(params);
      } else {
        const params = {
          user_id: cookies["UserId"],
          skill_required: reqSkills,
        };
        data = await api.getSkillBasedUsers(params);
      }

      if (isSubscribed) {
        const shuffledUsers = data.data.sort(() => Math.random() - 0.5);
        setUsers(shuffledUsers);
      }
    };
    fetchData().catch(console.error);

    return () => (isSubscribed = false);
  }, [reqSkills]);

  const updateSkills = (e) => {
    setReqSkills(e);
  };
  console.log(reqSkills);
  console.log(users);
  return (
    <div className="flex flex-col items-center bg-[#FFD9C0] bg-opacity-25 h-[100vh]">
      <div className="mt-24 w-1/3">
        <Multiselect
          displayValue="key"
          className="dropdown"
          groupBy="cat"
          onKeyPressFn={function noRefCheck() {}}
          onRemove={updateSkills}
          onSearch={function noRefCheck() {}}
          onSelect={updateSkills}
          options={[
            { cat: "Programming Languages", key: "C or C++" },
            { cat: "Programming Languages", key: "Java" },
            { cat: "Programming Languages", key: "Python" },
            { cat: "Programming Languages", key: "Rust" },

            { cat: "Web (Frontend)", key: "HTML5" },
            { cat: "Web (Frontend)", key: "CSS3" },
            { cat: "Web (Frontend)", key: "Javascript" },
            { cat: "Web (Frontend)", key: "ReactJS" },
            { cat: "Web (Frontend)", key: "AngularJS" },
            { cat: "Web (Frontend)", key: "VueJS" },
            { cat: "Web (Frontend)", key: "Typescript" },
            { cat: "Web (Frontend)", key: "TailwindCSS" },
            { cat: "Web (Frontend)", key: "Bootstrap" },

            { cat: "App", key: "ReactNative" },
            { cat: "App", key: "Kotlin" },
            { cat: "App", key: "Flutter" },
            { cat: "App", key: "Swift" },

            { cat: "Backend", key: "NodeJS" },
            { cat: "Backend", key: "ExpressJS" },
            { cat: "Backend", key: "Django" },
            { cat: "Backend", key: "Flask" },
            { cat: "Backend", key: "Php" },

            { cat: "Databases", key: "Firebase" },
            { cat: "Databases", key: "MySQL" },
            { cat: "Databases", key: "MongoDB" },

            { cat: "Web3", key: "Ethereum" },
            { cat: "Web3", key: "Solidity" },
          ]}
          // selectionLimit={6}
          placeholder="Skills"
          style={{
            chips: {
              background: "#fd2f6e",
            },
            searchBox: {
              border: "2px solid #2f2e41",
              borderRadius: "8px",
              padding: "10px",
              marginTop: "0.625rem",
              marginBottom: "0.625rem",
            },
          }}
        />
      </div>
      <div></div>
    </div>
  );
}
