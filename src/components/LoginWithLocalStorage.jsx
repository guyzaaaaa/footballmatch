import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import AdminPage from "./AdminPage";

function LoginWithLocalStorage() {
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const getEmail = localStorage.getItem("emailData");
  const getPassword = localStorage.getItem("passwordData");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.current.value === "1" && password.current.value === "1") {
      localStorage.setItem("emailData", "1");
      localStorage.setItem("passwordData", "1");
      navigate('/AdminPage'); // Redirect to the admin page after successful login
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {getEmail && getPassword ? (
        <div className="min-h-screen flex items-top justify-center bg-gray-100 mx-auto">
          <AdminPage />
        </div>
      ) : (
        <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md">
          <img
            src="https://img.freepik.com/free-vector/logo-template-design_1195-105.jpg?size=338&ext=jpg&ga=GA1.1.632798143.1705276800&semt=ais"
            alt="Logo"
            className="mb-4"
          />
          <h1 className="text-2xl font-bold mb-4"></h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                อีเมล
              </label>
              <input
                type="text"
                ref={email}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                รหัสผ่าน
              </label>
              <input
                type="password"
                ref={password}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex items-center justify-center mt-6">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                ล็อกอิน
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default LoginWithLocalStorage;
