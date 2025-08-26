import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/inputs/Input";

import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

import { UserContext } from "../../context/userContext";

const Login = () => {
  // State untuk email, password, dan error
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // Mengupdate konteks
  const { updateUser } = useContext(UserContext);

  // Menavigasi rute atau path
  const navigate = useNavigate();

  // Fungsi untuk menghandle login akun
  const handleLogin = async (e) => {
    // Mencegah reload halaman saat form disubmit
    e.preventDefault();

    // Validasi input
    if (!validateEmail(email)) {
      setError("Tolong masukkan email anda yang valid.");
      return;
    }

    if (!password) {
      setError("Tolong masukkan password anda.");
      return;
    }

    setError(""); // Reset error

    // Request ke endpoint Login untuk mengambil response dari database
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token, role } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
      }

      // Diarahkan ke rute admin atau user dashboard
      navigate(role === "admin" ? "/admin/dashboard" : "/user/dashboard");
    } catch (error) {
      // Menangani error dari server
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Ada sesuatu yang salah. Tolong coba lagi.");
      }
    }
  };
  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Please enter your details to log in
        </p>

        <form onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={(value) => setEmail(value)}
            label="Email Address"
            placeholder="jhon@example.com"
            type="text"
          />

          <Input
            value={password}
            onChange={(value) => setPassword(value)}
            label="password"
            placeholder="Min 8 characters"
            type="password"
          />

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          <button type="submit" className="btn-primary">
            LOGIN
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            Don't have an account?{" "}
            <Link className="font-medium text-primary underline" to="/signup">
              SignUp
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
