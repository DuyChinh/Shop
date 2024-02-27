import { useAuth0 } from "@auth0/auth0-react";
import { IoMdLogOut } from "react-icons/io";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
    >
      <IoMdLogOut style={{fontSize: "2.5rem", color: "#fff"}}/>
    </button>
  );
};

export default LogoutButton;
