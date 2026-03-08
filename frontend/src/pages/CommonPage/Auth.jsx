import React, { useEffect } from 'react'
import { useLocation } from "react-router-dom";
import { useAuthStore } from '../../store/useAuthStore';
import Login from './Login';
import SignUp from './SignUp';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword'

const Auth = () => {
  const location = useLocation();
  const authStep = useAuthStore((state) => state.authStep);
  const setAuthStep = useAuthStore((state) => state.setAuthStep);

  useEffect(() => {

    if (location.pathname === "/login") setAuthStep("login");
    if (location.pathname === "/signup") setAuthStep("signup");
    if (location.pathname === "/forgot-password") setAuthStep("forgot");
    if (location.pathname === "/verify") setAuthStep("verify");
  }, [location.pathname, setAuthStep]);

  return (
    <div>
      {authStep === "login" && <Login />}
      {authStep === "signup" && <SignUp />}
      {authStep === "forgot" && <ForgotPassword />}
      {authStep === "verify" && <h1>Verify Code Form</h1>}
    </div>
  );
};

export default Auth;