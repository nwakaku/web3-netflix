import React from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import logo from '../images/logo.jpg'

export const Header = ({ search }) => {
  return (
    <header className="w-full flex justify-between h-20 items-center border-b p-4 border-[#202229] cvc">
      <div
        className=" w-1/3   "
        onClick={() => {
          window.location.href = "/";
        }}
      >
        <img
          width={80}
          src={
            "https://www.pxpng.com/public/uploads/preview/-11621687998ytrgnduxoh.png"
          }
          alt="YouTube Logo"
        />
      </div>
      <div className=" w-1/3 flex justify-center items-center">
        {search ? (
          <input
            type="text"
            onChange={(e) => search(e.target.value)}
            placeholder="Type to search"
            className=" border-0 bg-transparent focus:outline-none text-white"
          />
        ) : null}
      </div>
      <div className=" w-1/3 flex justify-end item-center">
        <AiOutlinePlusCircle
          onClick={() => {
            window.location.href = "/upload";
          }}
          size="30px"
          className="mr-8 fill-whiteIcons dark:fill-white cursor-pointer mt-2"
        />
        <span
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
        >
          <button
            type="button"
            class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
          >
            Logout
          </button>
        </span>
      </div>
    </header>
  );
};
