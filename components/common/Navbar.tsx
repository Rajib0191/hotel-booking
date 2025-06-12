"use client";
import React from "react";
import logo from "../../public/logo.png";
import Image from "next/image";
import Avatar from "./Avatar";
import Button from "./Button";
import { LogIn } from "lucide-react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  return (
    // bg-amber-400
    <section className="fixed top-0 left-0 right-0">
      <div className="container flex justify-between items-center">
        <div
          className="relative h-16 w-20 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <Image
            src={logo}
            alt="logo"
            height={64}
            width={96}
            priority
            className="w-auto"
          />
        </div>
        <div className="flex justify-center items-center">
          {true ? (
            <Button
              title="Login"
              onClick={() => router.push("/login")}
              icon={<LogIn size={18} />}
              loading={false}
            />
          ) : (
            <Avatar name="Azizul Islam Rajib" />
          )}
        </div>
      </div>
    </section>
  );
};

export default Navbar;
