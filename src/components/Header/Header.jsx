import { TiShoppingCart } from "react-icons/ti";
import { FaShopify } from "react-icons/fa6";
import classes from "./Header.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
import LoginButton from "../Auth/login"
import LogoutButton from "../Auth/logout"
import Profile from "../Auth/profile"
import { useAuth0 } from "@auth0/auth0-react";
import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaBell } from "react-icons/fa6";
import { IoMdHelpCircle } from "react-icons/io";
import { GrLanguage } from "react-icons/gr";
import Mode from "../ModeToggle/Mode";
// import { Link } from "react-router-dom";

const apiKey = import.meta.env.VITE_API_KEY;

const Header = () => {
    const dispatch = useDispatch();
    const { user, isAuthenticated } = useAuth0();
    //  console.log(user);
     const userId = user?.sub;
 

    useEffect(() => {
      async function fetchData() {
        try {
          const response = await axios.get(`${apiKey}/carts/${user?.sub}`);
          const data = response.data.data;
          // const dataCarts = data.filter(
          //   (product) => product.user_id === userId
          // );
            // console.log("dataCarts", dataCarts);
          dispatch({
            type: "UPDATE_CARTS_DATA",
            payload: data,
          });
  
          // setData(data);
        } catch (error) {
          // console.error(error);
        } 
      }
      fetchData();
    }, [isAuthenticated]);
   
  
    const carts = useSelector((state) => state.carts);
    
  return (
    <div style={{ position: "relative" }}>
      <div className={classes.action}>
        <div
          className={`${classes.actionContainer} d-flex justify-content-between`}
        >
          <div
            className={`${classes.actionContact} d-flex text-white align-items-center gap-3`}
          >
            <div className={classes.actionContactP}>Kết nối</div>
            <a
              href="https://www.facebook.com/doanchinhit2102"
              target="blank"
              style={{ color: "#fff" }}
            >
              <FaFacebook style={{ fontSize: "1.9rem" }} />
            </a>
            <Link to={"/"} style={{ color: "#fff" }} className={classes.instagram}>
              <FaInstagramSquare style={{ fontSize: "1.9rem" }} />
            </Link>
          </div>

          <div className={`${classes.auth} d-flex align-items-center`}>
            <div className={classes.notice}>
              <FaBell style={{ fontSize: "1.9rem", color: "#fff" }} />
              <span>Thông báo</span>
            </div>

            <div className={classes.help}>
              <IoMdHelpCircle style={{ fontSize: "2.2rem", color: "#fff" }} />
              <span>Hỗ trợ</span>
            </div>

            <div className={classes.language}>
              <GrLanguage style={{ fontSize: "1.9rem", color: "#fff" }} />
              <span>Tiếng Việt</span>
            </div>

            {!isAuthenticated ? <LoginButton /> : <LogoutButton />}
            <Profile />
            <Mode/>
          </div>
        </div>
      </div>

      <div className={classes.row}>
        <div className={classes.container}>
          <Link to={"/"} className={classes.title}>
            <FaShopify />
            Shopping 
          </Link>
          <SearchBar className={classes.searchBar} />

          <div className={classes.cart}>
            <Link to={isAuthenticated ? "/cart" : "/login"}>
              <TiShoppingCart className={classes.cartBtn} />
            </Link>
            <Link
              to={isAuthenticated ? "/cart" : "/login"}
              className={classes.amountCart}
            >
              {carts.length}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
