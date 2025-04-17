import React from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const user = useSelector((state) => state.user);
  return (
    <header className="shadow-lg sticky">
      <div className="flex justify-between items-center max-w-6xl lg:max-w-7xl mx-auto p-1">
        <Link to={"/"}>
          <h6 className="text-xl font-bold sm:text-2xl flex flex-wrap">
            <span className="text-slate-500">Morning</span>
            <span className="text-slate-900">Dispatch</span>
          </h6>
        </Link>
        <form className="p-2 bg-slate-100 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="focus:outline-none bg-transparent w-24 sm:w-64"
          />
          <button className="p-2 bg-transparent border-none outline-none">
            <FaSearch className="text-slate-600" />
          </button>
        </form>
        <ul className="flex gap-4">
          <Link to={"/"}>
            <li className="hidden lg:inline text-slate-700 hover:underline">
              Home
            </li>
          </Link>
          <Link to={"/about"}>
            <li className="hidden lg:inline text-slate-700 hover:underline">
              About
            </li>
          </Link>
          <Link to={"/news"}>
            <li className="hidden lg:inline text-slate-700 hover:underline">
              News Articles
            </li>
          </Link>
        </ul>
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <img
                src={user.currentUser.user.profilePicture}
                alt="user photo"
                className="w-10 h-10 rounded-full cursor-pointer"
              />
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-60 bg-white mr-2 shadow-md border border-gray-200 rounded-md">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-300" />

              <DropdownMenuItem className="block font-semibold text-sm">
                <div className="flex flex-col gap-1">
                  <span>{user.currentUser.user.username}</span>
                  <span>{user.currentUser.user.email}</span>
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem className="block font-semibold text-sm">
                <Link to="/dashboard?tab=profile">Profile</Link>
              </DropdownMenuItem>

              <DropdownMenuItem className="block font-semibold text-sm text-red-500 cursor-pointer">
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link to="/sign-in">
            <Button className="bg-black text-white">Sign In</Button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
