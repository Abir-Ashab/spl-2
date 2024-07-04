import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
import "./design.css"

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/user/logout",
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response.data.message), setIsAuthorized(true);
    }
  };

  return (
    <nav className={isAuthorized ? "navbarShow" : "navbarHide"}>
      <div className="container">
        <div className="logo">
          <img src="/RecruitEase.png" alt="logo" />
        </div>
        <ul className={!show ? "menu" : "show-menu menu"}>
          <li>
            <Link to={"/"} onClick={() => setShow(false)}>
              HOME
            </Link>
          </li>
          <li>
            <Link to={"/job/getall"} onClick={() => setShow(false)}>
              ALL JOBS
            </Link>
          </li>
          {user && user.role === "Employer" ? (
            <>
             <li class="dropdown">
            <a href="#">FILTER</a>
            <ul class="dropdown-content">
              <li><Link to="http://localhost:4000/api/v1/resume/skill" onClick={() => setShow(false)}>
                SE GRADUATE
              </Link></li>
              <li>
              <Link to="http://localhost:4000/api/v1/resume/cp" onClick={() => setShow(false)}>
                COMPETITIVE PROGRAMMER
              </Link>
              </li>
              <li>
              <Link to="http://localhost:4000/api/v1/resume/cg" onClick={() => setShow(false)}>
                BEST CV
              </Link>
              </li>    
              <li>
                <Link to={"http://localhost:5173/getData"} onClick={() => setShow(false)}>
                  OTHERS
                </Link>
              </li>             
            </ul>
          </li>
            </>
          ) : (
            <></>
          )}
          <li>
            <Link to={"/applications/me"} onClick={() => setShow(false)}>
              {user && user.role === "Employer"
                ? "APPLICATIONS"
                : "MY APPLICATIONS"}
            </Link>
          </li>
          {user && user.role === "Employer" ? (
            <>
             <li>
                <Link to={"/job/post"} onClick={() => setShow(false)}>
                  POST JOB
                </Link>
              </li>
            </>
          ) : (
            <></>
          )}

          <button onClick={handleLogout}>LOGOUT</button>
        </ul>
        <div className="hamburger">
          <GiHamburgerMenu onClick={() => setShow(!show)} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;