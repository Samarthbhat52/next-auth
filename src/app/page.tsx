import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";

export default function Home() {
  return (
    <div className="flex flex-col h-full items-center justify-center">
      <div className="space-y-6 text-center">
        <h1 className="text-6xl font-semibold">Auth</h1>
        <p className="text-xl">A simple auth service</p>
        <div>
          <LoginButton>
            <Button size="lg">Sign in</Button>
          </LoginButton>
        </div>
      </div>
    </div>
  );
}
