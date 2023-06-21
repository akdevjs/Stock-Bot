import React, { useState } from "react";
import {
  ChevronDownIcon,
  HomeIcon,
  BookmarkIcon,
  DocumentIcon,
  ShoppingCartIcon,
  LogoutIcon,
} from "@heroicons/react/outline";
import { useRouter } from "next/router";

const SideMenu = () => {
  const [isDriversSubMenuHidden, setIsDriversSubMenuHidden] = useState(true);
  const [isDataSubMenuHidden, setIsDataSubMenuHidden] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const router = useRouter();

  const toggleDriversSubMenu = () => {
    setIsDriversSubMenuHidden(!isDriversSubMenuHidden);
  };

  const toggleDataSubMenu = () => {
    setIsDataSubMenuHidden(!isDataSubMenuHidden);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const isActive = (pathname: string) => router.pathname === pathname;

  return (
    <div
      className={`font-[Poppins] a sm:static bg-blue-600 w-80 h-full z-50 transition-transform duration-500 ease-in-out transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } sm:translate-x-0`}
    >
      <span
        className="absolute text-white text-4xl top-5 right-5 cursor-pointer sm:hidden"
        onClick={toggleSidebar}
      >
        <ChevronDownIcon className="h-6 w-6 text-white" />
      </span>
      <div className="sidebar overflow-y-auto text-center bg-gray-900 shadow h-screen">
        <div className="text-gray-100 text-xl p-5">
          <DocumentIcon className="h-6 w-6 text-blue-600 mx-auto" />
          <h1 className="text-[15px] text-xl text-gray-200 font-bold">
            StockBot
          </h1>
          <hr className="my-2 text-gray-600" />
          <p className="text-[15px] text-gray-200 text-center mt-5">
            Manage your stocks efficiently
          </p>

          <div
            onClick={() => router.push("/dashboard")}
            className={`p-2.5 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer ${
              isActive("/dashboard") ? "bg-blue-600" : "hover:bg-blue-600"
            }`}
          >
            <HomeIcon className="h-6 w-6 text-gray-200" />
            <span className="text-[15px] ml-4 text-gray-200">Dashboard</span>
          </div>

          <div
            onClick={toggleDriversSubMenu}
            className={`p-2.5 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer ${
              isActive("/drivers") ? "bg-blue-600" : "hover:bg-blue-600"
            }`}
          >
            <BookmarkIcon className="h-6 w-6 text-gray-200" />
            <span className="text-[15px] ml-4 text-gray-200">Drivers</span>
            <ChevronDownIcon
              className={`h-4 w-4 text-gray-200 ml-auto ${
                isDriversSubMenuHidden ? "" : "rotate-180"
              }`}
            />
          </div>

          <div
            className={`${
              isDriversSubMenuHidden ? "hidden" : ""
            } p-2.5 mt-2 flex flex-col items-start rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600`}
          >
            <h1
              onClick={() => router.push("/drivers/list")}
              className="text-[15px] mt-1 text-gray-200 cursor-pointer hover:underline"
            >
              Drivers List
            </h1>
            <h1
              onClick={() => router.push("/drivers/add")}
              className="text-[15px] mt-1 text-gray-200 cursor-pointer hover:underline"
            >
              Add Driver
            </h1>
          </div>

          <div
            onClick={toggleDataSubMenu}
            className={`p-2.5 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer ${
              isActive("/data") ? "bg-blue-600" : "hover:bg-blue-600"
            }`}
          >
            <DocumentIcon className="h-6 w-6 text-gray-200" />
            <span className="text-[15px] ml-4 text-gray-200">Data</span>
            <ChevronDownIcon
              className={`h-4 w-4 text-gray-200 ml-auto ${
                isDataSubMenuHidden ? "" : "rotate-180"
              }`}
            />
          </div>

          <div
            className={`${
              isDataSubMenuHidden ? "hidden" : ""
            } p-2.5 mt-2 flex flex-col items-start rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600`}
          >
            <h1
              onClick={() => router.push("/data/records")}
              className="text-[15px] mt-1 text-gray-200 cursor-pointer hover:underline"
            >
              Records
            </h1>
            <h1
              onClick={() => router.push("/data/inventory")}
              className="text-[15px] mt-1 text-gray-200 cursor-pointer hover:underline"
            >
              Inventory
            </h1>
            <h1
              onClick={() => router.push("/data/add-product")}
              className="text-[15px] mt-1 text-gray-200 cursor-pointer hover:underline"
            >
              Add Product
            </h1>
          </div>

          <div
            onClick={() => router.push("/predict")}
            className={`p-2.5 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer ${
              isActive("/predict") ? "bg-blue-600" : "hover:bg-blue-600"
            }`}
          >
            <ShoppingCartIcon className="h-6 w-6 text-gray-200" />
            <span className="text-[15px] ml-4 text-gray-200">Predict</span>
          </div>

          <div
            onClick={() => router.push("/logout")}
            className={`p-2.5 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer ${
              isActive("/logout") ? "bg-blue-600" : "hover:bg-blue-600"
            }`}
          >
            <LogoutIcon className="h-6 w-6 text-gray-200" />
            <span className="text-[15px] ml-4 text-gray-200">Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
