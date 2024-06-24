import Link from "next/link";
import Image from "next/image";

const Logo = ({ noLink }: { noLink?: boolean }) => {
  const children = (
    <Image src="/images/logo.svg" alt="sparkball logo" height={48} width={52} />
  );
  return noLink ? children : <Link href="/">{children}</Link>;
};

export default Logo;
