import React, { useState } from "react";
import Layout from "./Layout";

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <Layout>
      
      <div className="max-w-md mx-auto mt-20 p-6 shadow-lg border border-gray-200 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        <form className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-2 border rounded"
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="bg-[#135B3A] text-white px-4 py-2 rounded"
          >
            {isLogin ? "Login" : "Create Account"}
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button onClick={toggleForm} className="text-[#A37E2C] ml-1">
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
     
    </Layout>
  );
};

export default LoginSignup;
