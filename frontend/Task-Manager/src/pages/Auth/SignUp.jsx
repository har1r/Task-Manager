import React, { useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/inputs/ProfilePhotoSelector";
import Input from "../../components/inputs/Input";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fulName, setFulName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminInviteToken, setAdminInviteToken] = useState("");

  const [error, setError] = useState(null);

  // Handle Signup Form Submit
  const handleSaignUp = (e) => {
    e.preventDefault();

    if (!fulName) {
      setError("Please enter full name.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setError("");

    // Signup API Call
  };
  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Please enter your details to sign up
        </p>

        <form onSubmit={handleSaignUp}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={fulName}
              onChange={(value) => setFulName(value)}
              label="Full Name"
              placeholder="Enter your full name"
              type="text"
            />

            <Input
              value={email}
              onChange={(value) => setEmail(value)}
              label="Email"
              placeholder="Enter your email"
              type="email"
            />

            <Input
              value={password}
              onChange={(value) => setPassword(value)}
              label="Password"
              placeholder="Enter your password"
              type="password"
            />

            <Input
              value={adminInviteToken}
              onChange={(value) => setAdminInviteToken(value)}
              label="Admin Invite Token"
              placeholder="6 Digit Code"
              type="password"
            />
          </div>

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          <button type="submit" className="btn-primary">
            SIGNUP
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            Already an account?{" "}
            <Link className="font-medium text-primary underline" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
