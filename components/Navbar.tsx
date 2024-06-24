"use client";

import { usePathname } from "next/navigation";
import clsx from "clsx";
import { navigationLinks } from "@/lib/routing";
import { ConnectButton, Logo, MobileMenu, Link } from "@/components";
import useUser from "@/hooks/useUser";

const Navbar = () => {
  const { isAuthenticated, user } = useUser();
  const links = navigationLinks({ isAuthenticated, user });
  const pathname = usePathname();

  return (
    <header className="absolute top-0 left-0 w-full z-[2]">
      <div className="flex flex-row items-center justify-between px-2 md:px-6 py-2 md:py-4 bg-foreground text-background">
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
        <div className="flex flex-row items-center justify-end gap-4">
          <div className="flex md:hidden">
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
