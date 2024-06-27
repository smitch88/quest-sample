"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import MediumIcon from "@/components/icons/medium.svg";
import DiscordIcon from "@/components/icons/discord.svg";
import TwitterIcon from "@/components/icons/twitter.svg";

const Footer = () => {
  return (
    <footer
      className="w-full bg-[#151A1E] text-background z-50"
      style={{ height: "196px" }}
    >
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center md:items-center justify-between px-2 md:px-6 h-full">
        <div className="flex items-center w-full md:w-auto justify-start md:justify-start mt-12 md:mt-0">
          <Image
            src="/images/logo-optigames.svg"
            className="h-12 w-auto"
            alt="OptiGames logo"
            height={43}
            width={210}
          />
        </div>
        <div className="flex flex-col items-start justify-center mt-4 md:mt-0 md:items-end w-full md:w-auto px-4 md:px-0 mb-12 md:mb-0">
          <div className="flex flex-row gap-4 justify-start md:justify-end w-full">
            <Link href="https://medium.com">
              <MediumIcon
                className="h-8 w-8"
                alt="Medium"
                style={{ height: "30px", width: "30px" }}
              />
            </Link>
            <Link href="https://discord.com">
              <DiscordIcon
                className="h-8 w-8"
                alt="Discord"
                style={{ height: "30px", width: "30px" }}
              />
            </Link>
            <Link href="https://twitter.com">
              <TwitterIcon
                className="h-8 w-8"
                alt="Twitter"
                style={{ height: "30px", width: "30px" }}
              />
            </Link>
          </div>
          <div className="text-left md:text-right text-sm mt-2 w-full">
            © Copyright 2024 All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
