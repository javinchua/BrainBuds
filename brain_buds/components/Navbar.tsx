import React from "react";
import Link from "next/link";
import {AiOutlineMenu, AiOutlineClose} from 'react-icons/ai'

export const Navbar = () => {
  return (
    <div>
      <Link href="/">
        <h1>Brainbuds</h1>
      </Link>
      <ul>
        <Link href="/Login">
          <li>Login</li>
        </Link>
        <Link href="/signup">
          <li>Sign up</li>
        </Link>
      </ul>
    </div>
  );
};
