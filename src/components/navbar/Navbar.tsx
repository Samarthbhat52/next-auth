import Image from "next/image";
import UserIcon from "./userIcon";
import Link from "next/link";

const Navbar = async () => {
  return (
    <nav className="h-16 px-2">
      <div className="flex h-full justify-between items-center">
        <Link href="/" className="woah">
          <Image src="/vercel.svg" width={50} height={50} alt="logo" />
        </Link>
        <UserIcon />
      </div>
    </nav>
  );
};
export default Navbar;
