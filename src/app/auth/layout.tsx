import readUserSession from "@/lib/actions/session";
import { redirect } from "next/navigation";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const { data } = await readUserSession();

  if (data.session) {
    return redirect("/home");
  }

  return (
    <div className="flex h-full w-full justify-center items-center">
      {children}
    </div>
  );
};

export default AuthLayout;
