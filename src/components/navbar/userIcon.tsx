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
import { useRouter } from "next/navigation";
import { supabaseSignOut } from "@/lib/actions/server";
import { toast } from "sonner";
import { useQueries } from "@tanstack/react-query";
import { getAvatarBlob, getProfileData } from "@/lib/actions/queries";

const UserIcon = () => {
  const router = useRouter();

  const logout = async () => {
    await supabaseSignOut();
    router.replace("/auth/login");
    toast.success("Logout successful");
  };

  const [profileData, avatarData] = useQueries({
    queries: [
      { queryKey: ["profile"], queryFn: getProfileData },
      { queryKey: ["avatar"], queryFn: getAvatarBlob, retry: false },
    ],
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage
            src={avatarData.data && URL.createObjectURL(avatarData.data)}
          />
          <AvatarFallback>
            {profileData?.data?.full_name
              ? profileData?.data?.full_name[0]
              : "S"}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="space-y-2 w-56 mr-4">
        <DropdownMenuLabel>
          <p className="capitalize">{profileData?.data?.full_name}</p>
          <p className="font-normal">{profileData?.data?.email}</p>
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
