"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Settings, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabaseSignOut } from "@/lib/actions/server";
import { toast } from "sonner";
import { getProfile } from "@/lib/actions/server";

const UserIcon = () => {
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");

  const router = useRouter();

  const logout = async () => {
    await supabaseSignOut();
    router.replace("/auth/login");
    toast.success("Logout successful");
  };

  useEffect(() => {
    const profileData = async () => {
      const { data } = await getProfile();
      setAvatar(data?.avatar_url);
      setUsername(data?.full_name);
      setEmail(data?.email);
    };
    profileData();
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage referrerPolicy="no-referrer" src={avatar} />
          <AvatarFallback>{username ? username[0] : "S"}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="space-y-2 w-56 mr-4">
        <DropdownMenuLabel>
          <p className="capitalize">{username}</p>
          <p className="font-normal">{email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push("/profile")}>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={logout}
            className="bg-primary text-primary-foreground justify-center cursor-pointer"
          >
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default UserIcon;
