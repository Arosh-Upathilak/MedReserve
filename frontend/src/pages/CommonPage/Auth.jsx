import React, { useEffect, useContext } from 'react'
import { useLocation } from "react-router-dom";
import { AuthContext } from '../../context/useContext';
import Login from './Login';
import SignUp from './SignUp';
import ForgotPassword from './ForgotPasswod';
import ResetPassword from './ResetPassword'

const Auth = () => {
  const location = useLocation();
  const { authStep, setAuthStep } = useContext(AuthContext);

  useEffect(() => {
    if (location.pathname === "/login") setAuthStep("login");
    if (location.pathname === "/signup") setAuthStep("signup");
    if (location.pathname === "/reset-password") setAuthStep("reset");
    if (location.pathname === "/forgot-password") setAuthStep("forgot");
    if (location.pathname === "/verify") setAuthStep("verify");
  }, [location.pathname, setAuthStep]);

  return (
    <div>
      {authStep === "login" && <Login/>}
      {authStep === "signup" && <SignUp />}
      {authStep === "reset" && <ResetPassword />}
      {authStep === "forgot" && <ForgotPassword />}
      {authStep === "verify" && <h1>Verify Code Form</h1>}
    </div>
  );
};

export default Auth;