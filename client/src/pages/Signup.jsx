
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OAuth from "../components/Oauth";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      setLoading(true);
    const res = await fetch('/api/auth/signup',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if(data.success === false) {
      setError(data.message);
      setLoading(false);
      return;
    }
    setLoading(false);
    setError(null);
    navigate('/sign-in');
    }
    catch(err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/3 bg-white p-6 rounded-xl shadow-md">
        
        <div className="flex justify-center mb-6">
          <h1 className="text-black font-extrabold text-2xl">Signup Page</h1>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            className="border p-3 rounded-lg w-full"
            id="username"
            value={formData.username}
            onChange={handleChange}
          />
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
            {loading ? "Loading..." : "Signup"}
          </button>
          <OAuth/>
        </form>

        <div className="mt-5">
          <span>
            Have an Account?{" "}
            <a href="/sign-in" className="text-red-500">
              Signin
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

export default Signup;
