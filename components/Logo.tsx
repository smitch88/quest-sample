import Link from "next/link";
import Image from "next/image";

const Logo = ({ vertical, noLink }) => {
  const children = vertical ? (
    <Image src="/images/logo.svg" alt="sparkball logo" height={50} width={50} />
  ) : (
    <Image
      src="/images/logo-wide.svg"
      alt="sparkball logo"
      height={50}
      width={170}
    />
  );
  return noLink ? children : <Link href="/">{children}</Link>;
};

export default Logo;
