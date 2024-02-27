import { useAuth0 } from "@auth0/auth0-react";
import { BsPersonFill } from "react-icons/bs";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect()}><BsPersonFill style={{fontSize: "2.5rem", color: "#fff"}}/></button>;
};

export default LoginButton;
