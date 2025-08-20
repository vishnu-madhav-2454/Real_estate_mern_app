import React from "react";

const Signup = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/3 bg-white p-6 rounded-xl shadow-md">
        
        <div className="flex justify-center mb-6">
          <h1 className="text-black font-extrabold text-2xl">Signup Page</h1>
        </div>

        
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            className="border p-3 rounded-lg w-full"
            id="username"
          />
          <input
            type="email"
            placeholder="Email"
            className="border p-3 rounded-lg w-full"
            id="email"
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-3 rounded-lg w-full"
            id="password"
          />

          <button
            type="submit"
            className="bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 hover:m-5 hover:p-5 transition-all duration-300"
          >
            Signup
          </button>
        </form>
        <div className="mt-5"><span>Have an Account? <a href="/sign-in" className="text-red-500">Signin</a></span></div>
      </div>
    </div>
  );
};

export default Signup;
