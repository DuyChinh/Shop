import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../Loading/Loading";
import classes from "./profile.module.css"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const apiKey = import.meta.env.VITE_API_KEY;

const Profile = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      axios
        .post(`${apiKey}/customers`, {
          id: user?.sub,
          name: user?.name || user?.nickname,
          email: user?.email,
        })
        .then(() => {})
        .catch((error) => {
          // console.error(error);
        });
    }
  }, [isAuthenticated]);


  // console.log(user);

  if (isLoading) {
    return <Loading/>;
  }

  // console.log(user);
  return (
    isAuthenticated && (
      <div
        className={`${classes.profile} d-flex`}
        
      >
        <img
          src={user.picture}
          alt={user.name}
          className={`${classes.imgAvatar}`}
        />
        {user.name ? (
          <h2 className={classes.username}>{user.name}</h2>
        ) : (
          <h2 className={classes.username}>{user.nickname}</h2>
        )}
        <div className={classes.triangle}></div>
        <ul className={classes.menu}>
          <li>
            <Link to={"/"}>Tài Khoản của tôi</Link>
          </li>
          <li>
            <Link to={"/cart"}>Đơn mua</Link>
          </li>
          <li>
            <a
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
            >
              Đăng xuất
            </a>
          </li>
        </ul>
        {/* <p>{user.email}</p> */}
      </div>
    )
  );
};

export default Profile;
