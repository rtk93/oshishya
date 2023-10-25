import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import './Home.css'

const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
      }
      const { data } = await axios.post(
        "http://localhost:3300",  //server home url
        {},
        { withCredentials: true }
      );
      const { status, user } = data;
      setUsername(user);
      return status
        ? console.log(`Hello ${user}`)
        : (removeCookie("token"), navigate("/login"));
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  const Logout = () => {
    removeCookie("token");
    navigate("/signup");
  };

  return (
    <>
      <div className="homepage col-12">
        <div className="home-sidenav col-2">
          <div className="home-sidenav-menu">
          <button onClick={Logout}>Logout</button> 
          </div>
        </div>
        <div className="home-content col-10">
          <div className="home-header"> Welcome <span>{username}</span></div>
          <div className="home-components"></div>
        </div>
        <div>

        </div>
      </div>
    </>
  );
};

export default Home;