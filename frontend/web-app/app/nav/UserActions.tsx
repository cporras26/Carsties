﻿"use client";

import { Dropdown } from "flowbite-react";
import { User } from "next-auth";
import Link from "next/link";
import { HiCog, HiUser } from "react-icons/hi";
import { AiFillCar, AiFillTrophy, AiOutlineLogout } from "react-icons/ai";
import { signOut } from "next-auth/react";

type Props = {
  user: Partial<User>;
};

export default function UserActions({ user }: Props) {
  return (
    <Dropdown label={`Welcome ${user.name}`} inline>
      <Dropdown.Item icon={HiUser}>
        <Link href="/">My Auctions</Link>
      </Dropdown.Item>

      <Dropdown.Item icon={AiFillTrophy}>
        <Link href="/">Auctions won</Link>
      </Dropdown.Item>

      <Dropdown.Item icon={AiFillCar}>
        <Link href="/">Sell my car</Link>
      </Dropdown.Item>

      <Dropdown.Item icon={HiCog}>
        <Link href="/session">Session (dev only)</Link>
      </Dropdown.Item>

      <Dropdown.Divider />

      <Dropdown.Item
        icon={AiOutlineLogout}
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        Sign out
      </Dropdown.Item>
    </Dropdown>
  );
}