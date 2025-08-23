
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useDispatch} from 'react-redux';
import { signInStart,signInFailure, signInSuccess } from "../redux/user/user.slice";
import { useSelector } from "react-redux";


const Signin = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const {loading, error} = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      dispatch(signInStart());
    const res = await fetch('/api/auth/signin',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if(data.success === false) {
      dispatch(signInFailure(data.message));
      return;
    }
    dispatch(signInSuccess(data.user));
    navigate('/');
    }
    catch(err) {
      signInFailure(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/3 bg-white p-6 rounded-xl shadow-md">
        
        <div className="flex justify-center mb-6">
          <h1 className="text-black font-extrabold text-2xl">Signin Page</h1>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          
          <input
            type="email"
            placeholder="Email"
            className="border p-3 rounded-lg w-full"
            id="email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-3 rounded-lg w-full"
            id="password"
            value={formData.password}
            onChange={handleChange}
          />

          <button disabled={loading}
            type="submit"
            className="bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 hover:mt-4  transition-all duration-300"
          >
            {loading ? "Loading..." : "Signin"}
          </button>
        </form>

        <div className="mt-5">
          <span>
            Dont Have an Account?{" "}
            <a href="/sign-up" className="text-red-500">
              SignUp
            </a>
          </span>
        </div>
        {error && (
          <div className="mt-4 text-red-500">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Signin;
