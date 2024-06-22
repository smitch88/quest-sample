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
            <Link
              key={link.href}
              href={link.href}
              className={clsx("text-2xl font-header italic font-bold", {
                "text-brand-icy": pathname === link.href,
              })}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex flex-row items-center justify-end gap-4">
          <ConnectButton />
          <div className="flex md:hidden">
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
