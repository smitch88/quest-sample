"use client";

import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import { navigationLinks } from "@/lib/routing";
import { Logo, ConnectButton, Link, Icon } from "@/components";
import useUser from "@/hooks/useUser";

const NavLink = ({
  title,
  href,
  onClick,
}: {
  title: string;
  href: string;
  onClick: () => void;
  external?: boolean;
}) => {
  return (
    <Link
      href={href}
      className="font-header uppercase inline-block text-white w-fit text-4xl font-bold transition-colors"
      onClick={onClick}
    >
      {title}
    </Link>
  );
};

const Nav = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { isAuthenticated, user } = useUser();
  const links = navigationLinks({ isAuthenticated, user });

  return (
    <div
      className={clsx(
        "fixed top-0 w-screen text-white duration-300 z-[100000] duration-300",
        {
          "right-0": isOpen,
          "right-[-100vw]": !isOpen,
        }
      )}
    >
      <div className="flex flex-col justify-between gap-10 absolute h-[100dvh] w-screen bg-black pb-6">
        <div className="flex flex-col gap-10 w-full h-full">
          <div className="flex flex-row items-center justify-between px-4 pt-6">
            <Logo />
            <button
              className="text-3xl text-white"
              onClick={() => setIsOpen(false)}
            >
              <Icon icon="TODO" />
            </button>
          </div>
          <nav className="flex flex-col gap-6 pl-4">
            {links?.map(({ href, label }) => {
              return (
                <NavLink
                  key={href}
                  title={label}
                  href={href}
                  onClick={() => setIsOpen(false)}
                />
              );
            })}
          </nav>
        </div>
        <div className="flex flex-shrink-0 w-full items-center justify-start px-4">
          <ConnectButton
            containerClassName="flex items-center justify-center w-full mx-auto"
            className="!bg-highlight max-w-full w-full md:max-w-[420px] h-[52px] !text-2xl !border-none"
            enableMobile
          />
        </div>
      </div>
    </div>
  );
};

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div
      className={clsx("relative z-[100]", {
        "min-w-screen": isOpen,
      })}
    >
      <div className="flex items-center text-white">
        <button onClick={() => setIsOpen(true)} className="text-3xl">
          <Icon icon="TODO" />
        </button>
      </div>
      {createPortal(
        <Nav isOpen={isOpen} setIsOpen={setIsOpen} />,
        document.body
      )}
    </div>
  );
};

export default MobileMenu;
