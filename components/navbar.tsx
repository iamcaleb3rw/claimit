"use client";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SignedIn, SignedOut, SignOutButton, useUser } from "@clerk/nextjs";
import { Skeleton } from "./ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { LogOut, User } from "lucide-react";

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { active: true, href: "#", label: "Home" },
  { href: "#", label: "Features" },
  { href: "#", label: "Pricing" },
  { href: "#", label: "About" },
];

export default function Navbar() {
  const { user, isLoaded } = useUser();
  return (
    <header className="px-4 md:px-12">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                size="icon"
                variant="ghost"
              >
                <svg
                  className="pointer-events-none"
                  fill="none"
                  height={16}
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width={16}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="-translate-y-[7px] origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                    d="M4 12L20 12"
                  />
                  <path
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                    d="M4 12H20"
                  />
                  <path
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                    d="M4 12H20"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-36 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {navigationLinks.map((link, _index) => (
                    <NavigationMenuItem className="w-full" key={_index}>
                      <NavigationMenuLink
                        active={link.active}
                        className="py-1.5"
                        href={link.href}
                      >
                        {link.label}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>
          {/* Main nav */}
          <div className="flex items-center gap-6">
            <a className="text-primary hover:text-primary/90" href="#">
              logo
            </a>
            {/* Navigation menu */}
            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-2">
                {navigationLinks.map((link, _index) => (
                  <NavigationMenuItem key={_index}>
                    <NavigationMenuLink
                      active={link.active}
                      className="py-1.5 font-medium text-muted-foreground hover:text-primary"
                      href={link.href}
                    >
                      {link.label}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        {/* Right side */}
        <div className="flex items-center gap-2">
          <SignedIn>
            <Button asChild className="text-sm rounded-full" size="sm">
              <a href="/account">My Account</a>
            </Button>
            <div className="">
              {isLoaded ? (
                <DropdownMenu>
                  <DropdownMenuTrigger className="focus:ring-0 outline-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-0">
                    <div className="flex border rounded-full shadow-sm items-center gap-1">
                      <p className="mx-2 font-medium">{user?.firstName}</p>
                      <img
                        src={user?.imageUrl}
                        className="size-8 rounded-full p-1"
                      />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-40">
                    <DropdownMenuItem>
                      <User />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className=" hover:bg-red-100">
                      <SignOutButton>
                        <div className="flex items-center">
                          <LogOut className="text-red-500" />
                          <p className="text-red-500">Log Out</p>
                        </div>
                      </SignOutButton>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Skeleton />
              )}
            </div>
          </SignedIn>
          <SignedOut>
            <Button asChild variant={"secondary"} className="text-sm" size="sm">
              <a href="/sign-in">Sign In</a>
            </Button>
          </SignedOut>
        </div>
      </div>
    </header>
  );
}
