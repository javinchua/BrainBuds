import React from 'react'
import Link from 'next/link'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import { useState, useEffect } from 'react'
import { useAuth } from 'context/AuthContext'
import { getAuth, signOut } from 'firebase/auth'
import { BsGrid } from 'react-icons/bs'
import CategorySidebar from '../CategoryBar'
import { SiJustgiving } from 'react-icons/si'

export const NavBar = () => {
  const [nav, setNav] = useState(false)
  const [color, setColor] = useState('#1b263d')
  const [textColor, setTextColor] = useState('white')
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)

  const toggleCategory = () => {
    setIsCategoryOpen(!isCategoryOpen)
  }
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
        setColor('#1b263d')
        setTextColor('#ffffff')
      }
    }
    window.addEventListener('scroll', changeColor)
    return () => {
      window.removeEventListener('scroll', changeColor)
    }
  }, [])

  return (
    <>
      <div
        style={{ backgroundColor: `${color}` }}
        className="fixed top-0 left-0 z-10 w-full duration-300 ease-in h-[70px]"
      >
        <div className="max-w-[1240px] flex justify-between text-white items-center h-[70px]">
          <Link href="/" className="relative flex items-center p-4 text-3xl pl-14">
            <SiJustgiving style={{ color: `${textColor}` }} />
            <h1 style={{ color: `${textColor}` }} className="ml-[2px] text-3xl font-bold">
              ivver
            </h1>
          </Link>

          <ul style={{ color: `${textColor}` }} className="hidden sm:flex">
            <button
              className="p-4 hover:bg-primary-900"
              style={{ color: `${textColor}` }}
              onClick={toggleCategory}
            >
              <div className="flex">
                <BsGrid size={24} />
                <h1 className="ml-2">All Categories</h1>
              </div>
            </button>

            <Link href="/">
              <li className="p-4 hover:bg-primary-900">Home</li>
            </Link>
            <Link href="/allCharities">
              <li className="p-4 hover:bg-primary-900">Explore Charities</li>
            </Link>
            <Link href="/contact">
              <li className="p-4 hover:bg-primary-900">Contact</li>
            </Link>
            {user && user.uid ? (
              <>
                <div className="p-4 cursor-pointer" onClick={() => signOut(auth)}>
                  Logout
                </div>
                <div className="p-4">User Type: {user.type}</div>
                <div className="p-4">Username: {user.username}</div>
              </>
            ) : (
              <Link href="/login">
                <li className="p-4 hover:bg-primary-900">Login</li>
              </Link>
            )}
          </ul>

          {/*mobile button */}
          <div className="z-10 block sm:hidden">
            {nav ? (
              <AiOutlineClose size={20} style={{ color: `${textColor}` }} onClick={handleNav} />
            ) : (
              <AiOutlineMenu size={20} style={{ color: `${textColor}` }} onClick={handleNav} />
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
                <li onClick={handleNav} className="p-4 text-2xl hover:text-gray-500">
                  Home
                </li>
              </Link>
              <Link href="/gallery">
                <li onClick={handleNav} className="p-4 text-2xl hover:text-gray-500">
                  Gallery
                </li>
              </Link>
              <Link href="/contact">
                <li onClick={handleNav} className="p-4 text-2xl hover:text-gray-500">
                  Contact
                </li>
              </Link>
            </ul>
          </div>
        </div>
        {isCategoryOpen && <CategorySidebar />}
      </div>
    </>
  )
}
