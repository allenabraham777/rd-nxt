import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  ChevronDownIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";
import {
  BellIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  GlobeAsiaAustraliaIcon,
  PlusIcon,
  SparklesIcon,
  MegaphoneIcon,
  VideoCameraIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Header = () => {
  const { data: session } = useSession();
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if ((e?.target as HTMLButtonElement)?.id !== "user-badge") setShowMenu(false);
    });
  }, []);

  return (
    <div className="sticky top-0 z-50 flex bg-white px-4 py-2 shadow-sm">
      <div className="relative h-10 w-20 flex-shrink-0 cursor-pointer">
        <Link href="/">
          <Image
            objectFit="contain"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Reddit_logo_new.svg/731px-Reddit_logo_new.svg.png"
            layout="fill"
          />
        </Link>
      </div>
      <div className="flex items-center mx-7 xl:min-w-[300px]">
        <HomeIcon className="h-5 w-5" />
        <p className="ml-2 hidden flex-1 lg:inline">Home</p>
        <ChevronDownIcon className="h-5 w-5" />
      </div>

      {/* Search box */}
      <form className="flex flex-1 items-center space-x-2 border border-gray-200 rounded-sm bg-gray-100 px-3 py-1">
        <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
        <input
          type="text"
          placeholder="Search Reddit"
          className="flex-1 bg-transparent outline-none"
        />
        <button type="submit" hidden />
      </form>
      <div className="mx-5 hidden items-center space-x-2 text-gray-500 lg:inline-flex">
        <SparklesIcon className="icon" />
        <GlobeAsiaAustraliaIcon className="icon" />
        <VideoCameraIcon className="icon" />
        <hr className="h-10 border border-gray-100" />
        <ChatBubbleOvalLeftEllipsisIcon className="icon" />
        <BellIcon className="icon" />
        <PlusIcon className="icon" />
        <MegaphoneIcon className="icon" />
      </div>
      <div className="ml-5 flex items-center lg:hidden">
        <Bars3Icon className="icon" />
      </div>
      {/* Sign in and Sign out */}
      {session ? (
        <div className="flex items-center">
          <button
            onClick={() => setShowMenu(!showMenu)}
            id="user-badge"
            className="hidden self-center items-center px-4 cursor-pointer lg:inline-flex hover:outline hover:outline-1 hover:outline-gray-100"
          >
            <UserIcon className="h-8 w-8 -z-10" />
            <span className="flex-1 flex-col flex-shrink-0 mx-2 -z-10">
              <p className="truncate text-center font-semibold">{session?.user?.name}</p>
              <p className="text-gray-500 text-xs">1 Karma</p>
            </span>
            <ChevronDownIcon className="h-5 w-5 -z-10" />
          </button>
          <div
            id="menu"
            className={`${
              showMenu ? "block" : "hidden"
            } absolute top-16 bg-white w-64 right-4 p-2 border`}
          >
            <h3 className="text-center font-semibold p-2">{session?.user?.name}</h3>
            <hr/>
            <button
              className="flex p-2 w-full hover:bg-gray-100"
              onClick={() => signOut()}
            >
              <ArrowRightOnRectangleIcon className="w-6 h-6" />
              <p className="ml-2">Logout</p>
            </button>
          </div>
        </div>
      ) : (
        <div className="hidden space-x-4 px-4 lg:inline-flex">
          <button
            onClick={() => {
              signIn();
            }}
            className="bg-blue-400 w-36 rounded-full text-white font-bold hover:bg-opacity-95"
          >
            Log In
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
