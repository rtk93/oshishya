import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import './Home.css'

const Home = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const verifyUser = async () => {
      const { data } = await axios.post(
        "https://api-oshishya.onrender.com"
      );
      const { status, user } = data;
      setUsername(user);
    };
    verifyUser();
  }, [cookies, navigate, removeCookie]);

  const Logout = () => {
    navigate("/login");
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
