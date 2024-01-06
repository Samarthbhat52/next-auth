import Image from "next/image";
import UserIcon from "./userIcon";

const Navbar = async () => {
  return (
    <nav className="h-16 px-2">
      <div className="flex h-full justify-between items-center">
        <Image src="/vercel.svg" width={100} height={50} alt="logo" />
        <UserIcon />
      </div>
    </nav>
  );
};
export default Navbar;
