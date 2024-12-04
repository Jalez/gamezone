//Create a simple login button that will log the user in

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext";
// import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
  // const { loginWithRedirect } = useAuth0();
//   const { setUser } = useUserStore();
  const [isLogin, setIsLogin] = useState(true);
  const { login, logout, user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [user]);
    

  const handleLogin = () => {
    const username = "user1";
    const password = "password1";

    login(username, password);
    setIsLogin(false);
  };

  const handleLogout = () => {
    logout();
    setIsLogin(true);
  };
  return (
    <button onClick={isLogin ? handleLogin : handleLogout}>
      {isLogin ? "Login" : "Logout"} ({user?.username})
    </button>
  );
};

export default LoginButton;
