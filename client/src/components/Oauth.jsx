import React from "react";
import { FcGoogle } from "react-icons/fc";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInStart, signInFailure, signInSuccess } from "../redux/user/user.slice.js";
import { useNavigate } from "react-router-dom";


const Oauth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = async () => {
    dispatch(signInStart());
    try {
      const provider = new GoogleAuthProvider();
      provider.addScope("email"); // Ensure email is returned
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      if (!result.user.email) {
        throw new Error("Google account does not provide an email");
      }

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });

      const data = await res.json();
      console.log(data);
      dispatch(signInSuccess(data.user));
      navigate("/");
    } catch (err) {
      console.error(err);
      dispatch(signInFailure());
    }
  };

  return (
    <button
      onClick={handleClick}
      className="w-full mt-2 flex items-center justify-center gap-3 bg-white hover:bg-gray-100 transition-colors border-2 border-gray-300 rounded-xl py-2.5 px-4 shadow-sm"
    >
      <FcGoogle className="text-2xl" />
      <span className="text-red-500 font-semibold text-sm">
        Continue with Google
      </span>
    </button>
  );
};

export default Oauth;
