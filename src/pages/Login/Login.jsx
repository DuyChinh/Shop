import classes from "./Login.module.css"
import { FaShopify } from "react-icons/fa6";
import { Link } from "react-router-dom";
// import { TiShoppingCart } from "react-icons/ti";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { useAuth0 } from "@auth0/auth0-react";
import Footer from "../../components/Footer/Footer";
const Login = ()=> {
     const { loginWithRedirect } = useAuth0();
  return (
    <div>
      <div className={classes.row}>
        <div className={classes.container}>
          <Link to={"/"} className={classes.title}>
            <FaShopify />
            Shopping
          </Link>

          {/* <div className={classes.cart}>
          <Link to={"/cart"}>
            <TiShoppingCart
              className={classes.cartBtn}
              // style={{ fontSize: "3.7rem", cursor: "pointer", color: "#000" }}
            />
          </Link>
        </div> */}
        </div>
      </div>
      <div className={classes.login}>
        <h1 className={`text-center ${classes.titleLogin}`}>Đăng nhập</h1>
        <form action="" className={classes.form}>
          <input
            type="text"
            className={classes.formEmail}
            name="email"
            placeholder="Email..."
          />
          <input
            type="password"
            className={classes.formPassword}
            name="password"
            placeholder="Password..."
          />
          <button
            onClick={() => loginWithRedirect()}
            className={`${classes.btnLogin}`}
          >
            Đăng nhập
          </button>
          <div
            className={`d-flex justify-content-between ${classes.media}`}
          >
            <button
              onClick={() => loginWithRedirect()}
              className={`d-flex align-items-center gap-2 justify-content-center ${classes.btnMedia} `}
            >
              <FaFacebook style={{ fontSize: "2rem", color: "blue" }} />{" "}
              Facebook
            </button>

            <button
              onClick={() => loginWithRedirect()}
              className={`d-flex align-items-center gap-2 justify-content-center ${classes.btnMedia}`}
            >
              <FcGoogle style={{ fontSize: "2rem" }} /> Google
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Login