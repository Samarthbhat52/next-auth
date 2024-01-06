import Navbar from "@/components/navbar/Navbar";
import readUserSession from "@/lib/actions/session";
import { redirect } from "next/navigation";
const AuthenticatedLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data } = await readUserSession();

  if (!data.session) {
    return redirect("/auth/login");
  }

  return (
    <div className="flex flex-col h-full w-full">
      <Navbar />
      {children}
    </div>
  );
};

export default AuthenticatedLayout;
