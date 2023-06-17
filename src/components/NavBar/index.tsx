import React from 'react'
import Link from 'next/link'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import { useState, useEffect } from 'react'
import { useAuth } from 'context/AuthContext'
import { getAuth, signOut } from 'firebase/auth'

export const Navbar = () => {
  const [nav, setNav] = useState(false)
  const [color, setColor] = useState('transparent')
  const [textColor, setTextColor] = useState('white')

  const handleNav = () => {
    setNav(!nav)
  }
  const { user } = useAuth()
  const auth = getAuth()
  useEffect(() => {
    const changeColor = () => {
      if (window.scrollY >= 90) {
        setColor('#ffffff')
        setTextColor('#000000')
      } else {
        setColor('transparent')
        setTextColor('#ffffff')
      }
    }
    window.addEventListener('scroll', changeColor)
  }, [])

  return (
    <>
      <div
        style={{ backgroundColor: `${color}` }}
        className="fixed top-0 left-0 z-10 w-full duration-300 ease-in"
      >
        <div className="max-w-[1240px] m-auto flex justify-between items-center p-4 text-white">
          <Link href="/">
            <h1 style={{ color: `${textColor}` }} className="text-3xl font-bold">
              Brainbuds
            </h1>
          </Link>
          <ul style={{ color: `${textColor}` }} className="hidden sm:flex">
            <Link href="/">
              <li className="p-4">Home</li>
            </Link>
            <Link href="/gallery">
              <li className="p-4">Gallery</li>
            </Link>
            <Link href="/contact">
              <li className="p-4">Contact</li>
            </Link>
            {user && user.uid ? (
              <>
                <div className="p-4 cursor-pointer" onClick={() => signOut(auth)}>
                  Logout
                </div>
                <div className="p-4">User Type: {user.type}</div>
              </>
            ) : (
              <Link href="/login">
                <li className="p-4">Login</li>
              </Link>
            )}
          </ul>

          {/*mobile button */}
          <div className="z-10 block sm:hidden">
            {nav ? (
              <AiOutlineClose size={20} style={{ color: `${textColor}` }} />
            ) : (
              <AiOutlineMenu size={20} style={{ color: `${textColor}` }} />
            )}
          </div>
          {/*mobile menu */}
          <div
            className={
              nav
                ? 'sm:hidden absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center w-full h-screen bg-black text-center ease-in duration-300'
                : 'sm:hidden absolute top-0 left-[-100%] right-0 bottom-0 flex justify-center items-center w-full h-screen bg-black text-center ease-in duration-300'
            }
          >
            <ul>
              <Link href="/">
                <li onClick={handleNav} className="p-4 text-4xl hover:text-gray-500">
                  Home
                </li>
              </Link>
              <Link href="/gallery">
                <li onClick={handleNav} className="p-4 text-4xl hover:text-gray-500">
                  Gallery
                </li>
              </Link>
              <Link href="/contact">
                <li onClick={handleNav} className="p-4 text-4xl hover:text-gray-500">
                  Contact
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
