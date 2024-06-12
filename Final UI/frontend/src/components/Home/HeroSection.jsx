import React, { useEffect, useState } from "react";
import { FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";
import axios from "axios";

const HeroSection = () => {
  const [details, setDetails] = useState([
    {
      id: 1,
      title: "Loading...",
      subTitle: "Live Job",
      icon: <FaSuitcase />,
    },
    {
      id: 2,
      title: "Loading...",
      subTitle: "Job Seekers",
      icon: <FaUsers />,
    },
    {
      id: 3,
      title: "Loading...",
      subTitle: "Employers",
      icon: <FaUserPlus />,
    },
  ]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const [jobsRes, jobSeekersRes, employersRes] = await Promise.all([
          axios.get("http://localhost:4000/api/v1/job/gettotal"),
          axios.get("http://localhost:4000/api/v1/user/totaljobseekers"),
          axios.get("http://localhost:4000/api/v1/user/totalemployers"),
        ]);

        setDetails([
          {
            id: 1,
            title: jobsRes.data.totalJobs,
            subTitle: "Live Job",
            icon: <FaSuitcase />,
          },
          {
            id: 2,
            title: jobSeekersRes.data.totalJobSeekers,
            subTitle: "Job Seekers",
            icon: <FaUsers />,
          },
          {
            id: 3,
            title: employersRes.data.totalEmployers,
            subTitle: "Employers",
            icon: <FaUserPlus />,
          },
        ]);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchDetails();
  }, []);

  return (
    <div className="heroSection">
      <div className="container">
        <div className="title">
          <h1>Find a job that suits</h1>
          <h1>your interests and skills</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
            voluptate repellat modi quidem aliquid eaque ducimus ipsa et,
            facere mollitia!
          </p>
        </div>
        <div className="image">
          <img src="/heroS.jpg" alt="hero" />
        </div>
      </div>
      <div className="details">
        {details.map((element) => (
          <div className="card" key={element.id}>
            <div className="icon">{element.icon}</div>
            <div className="content">
              <p>{element.title}</p>
              <p>{element.subTitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
