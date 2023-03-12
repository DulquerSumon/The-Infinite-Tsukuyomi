/* eslint-disable import/no-cycle */
import React from "react";
import Image from "next/image";
import { Button } from ".";

const Navbar = () => (
  <div className="flex justify-around  border-b p-4 w-screen">
    <div className="text-red-900 flex flex-row gap-4">
      <Image
        className="rounded-full"
        src="/eye.png"
        width="30"
        height="30"
        style={{
          width: "14",
          height: "14",
          objectFit: "cover",
        }}
        alt="worker"
      />
      <h1 className="font-extrabold">The Infinite Tsukuyomi</h1>
    </div>
    <Button />
  </div>
);

export default Navbar;
