"use client";

import React, { useState } from "react";
import FacebookIcon from "@/public/icons/facebook.svg";
import GoogleIcon from "@/public/icons/google.svg";
import TwitterIcon from "@/public/icons/twitter.svg";
import DiscordIcon from "@/public/icons/discord.svg";
import SparkballLogo from "@/public/images/logo-color.svg";
import StandardInputField from "@/components/inputs/StandardInputField";
import StandardButton from "@/components/buttons/StandardButton/StandardButton";
import "./LoginModal.styles.css";

const LoginModal = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={`flex items-center justify-center w-full h-full`}>
      <div className="flex flex-col items-center w-[360px] h-[574px] p-8 m-6 mx-auto my-auto space-y-6 z-10 bg-white highlight-border">
        <SparkballLogo
          className="h-12 w-auto"
          alt="Sparkball logo"
          style={{ height: "42.9px", width: "210.38px" }}
        />
        <p className="mb-4 text-black">
          Don't have an account?{" "}
          <a href="#" className="text-orange-500">
            Create one
          </a>
        </p>
        <div className="w-full mb-4 space-y-4">
          <StandardInputField
            label=""
            placeholder="chip.stronghold@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
          />
          <StandardInputField
            label=""
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <StandardButton className="w-full mt-4 bg-orange-500 text-white font-bold">
            LOGIN
          </StandardButton>
        </div>
        <div className="flex items-center mb-4 w-full space-x-2">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="mx-2 italic">OR</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>
        <div className="flex space-x-4 mb-4">
          <div className="flex items-center justify-center w-12 h-12 bg-[#4285F4]">
            <FacebookIcon className="text-white h-[48px] w-[48px]" />
          </div>
          <div className="flex items-center justify-center w-12 h-12 bg-white">
            <GoogleIcon className="text-white h-[20px] w-[20px]" />
          </div>
          <div className="flex items-center justify-center w-12 h-12 bg-black">
            <TwitterIcon className="text-white h-[20px] w-[20px]" />
          </div>
          <div className="flex items-center justify-center w-12 h-12 bg-purple-600">
            <DiscordIcon className="text-white h-[20px] w-[20px]" />
          </div>
        </div>
        <a href="#" className="text-gray-500 mt-6">
          Forgot password?
        </a>
      </div>
    </div>
  );
};

export default LoginModal;
