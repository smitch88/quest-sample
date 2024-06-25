"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import clsx from "clsx";
import { navigationLinks } from "@/lib/routing";
import { Logo, Link } from "@/components";
import useUser from "@/hooks/useUser";
import StandardButton from '@/components/buttons/StandardButton/StandardButton';
import SettingsIcon from '@/public/icons/settings.svg';
import LogOutIcon from '@/public/icons/logout.svg';
import MenuIcon from '@/public/icons/menu.svg';
import CloseIcon from '@/public/icons/close.svg'; // Assuming you have a close icon

const Navbar = () => {
  const { isAuthenticated, user } = useUser();
  const links = navigationLinks({ isAuthenticated, user });
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const imageUrl = 'https://i.imgur.com/NK6VNH9.png';

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="absolute top-0 left-0 w-full z-50">
      <div className="flex flex-row items-center justify-between py-2 px-2 md:px-6 md:py-4 bg-foreground text-background">
        <Logo />
        <div className="hidden md:flex flex-row items-center gap-8">
          {links.map((link) => (
            <div key={link.href} className="relative">
              <Link
                href={link.href}
                className={clsx("text-2xl font-header italic font-bold", {
                  "text-brand-icy": pathname === link.href,
                })}
              >
                {link.label}
              </Link>
              {link.isNew && (
                <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-brand-lime text-xs text-black px-0.5 -skew-x-12 font-header font-black">
                  <span className="block">NEW</span>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="hidden md:flex flex-row items-center justify-end gap-4">
          {!isAuthenticated ? (
            <>
              <StandardButton onClick={() => router.push('/signup')} className="text-white font-bold" customColor='bg-gradient-h-ice'>
                Sign Up
              </StandardButton>
              <StandardButton onClick={() => router.push('/login')} className="text-white font-bold">
                Login
              </StandardButton>
            </>
          ) : (
            <div className="flex flex-row items-center gap-4">
              <Link href="/settings" className="text-2xl font-header italic font-bold">
                <SettingsIcon />
              </Link>
              <div className="text-base font-header italic font-bold">LV.5</div>
              <div className="text-base font-header italic font-bold">2,410 <span className='text-brand-lime'>FAME</span></div>
              <img src={imageUrl} alt="profile" className="w-10 h-full" />
              <Link href="/logout" className="text-2xl font-header italic font-bold">
                <LogOutIcon />
              </Link>
            </div>
          )}
        </div>
        <div className="flex md:hidden">
          <button onClick={toggleMobileMenu}>
            <MenuIcon />
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-b from-[#4232FF] to-[#32CAFF] text-white z-50 flex flex-col items-center justify-center">
          <button onClick={toggleMobileMenu} className="absolute top-4 right-4">
            <CloseIcon />
          </button>
          {links.map((link) => (
            <div key={link.href} className="relative mb-4">
              {/* <Link
                href={link.href}
                className="text-2xl font-header italic font-bold"
              >
                {link.label}
              </Link> */}
              <div className="text-2xl font-header italic font-bold" onClick={(() => {
                toggleMobileMenu();
                router.push(link.href);
              })}>
                {link.label}
              </div>
              {link.isNew && (
                <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-brand-lime text-xs text-black px-0.5 -skew-x-12 font-header font-black">
                  <span className="block">NEW</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;
