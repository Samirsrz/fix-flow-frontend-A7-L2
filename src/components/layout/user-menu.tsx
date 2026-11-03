"use client";

import { LogOut, UserRound } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ROLE_LABEL } from "@/lib/constants/auth";
import { Role } from "@/shared/types/api";

export type PublicUser = { name: string; email: string; role: Role };

type UserMenuProps = {
  user: PublicUser;
  dashboardHref: string;
  profileHref: string;
  onLogout?: () => void;
  isLoggingOut?: boolean;
};

export function UserMenu({
  user,
  dashboardHref,
  profileHref,
  onLogout,
  isLoggingOut = false,
}: UserMenuProps) {
  const initials = user.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="ghost" className="h-auto gap-2 px-2 py-1.5" />}
      >
        <Avatar className="size-8">
          <AvatarFallback>{initials || <UserRound />}</AvatarFallback>
        </Avatar>
        <span className="hidden text-left lg:block">
          <span className="block max-w-28 truncate text-sm font-medium">
            {user.name}
          </span>
          <span className="block max-w-28 truncate text-xs text-muted-foreground">
            {user.email}
          </span>
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="flex flex-col gap-1">
            <span>{user.name}</span>
            <Badge variant="secondary" className="w-fit text-[10px]">
              {ROLE_LABEL[user.role]}
            </Badge>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem render={<Link href={dashboardHref} />}>
          <UserRound />
          Dashboard
        </DropdownMenuItem>
        <DropdownMenuItem render={<Link href={profileHref} />}>
          <UserRound />
          Profile
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          disabled={isLoggingOut}
          onClick={onLogout}
        >
          <LogOut />
          {isLoggingOut ? "Logging out…" : "Log out"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
