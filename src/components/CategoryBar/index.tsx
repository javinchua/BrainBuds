import React, { useState } from 'react'
import Link from 'next/link'
import { AiOutlineClose } from 'react-icons/ai'
import { SiHomeassistant } from 'react-icons/si'
import { BsBuilding } from 'react-icons/bs'
import {
  MdHealthAndSafety,
  MdLocalActivity,
  MdEmojiFoodBeverage,
  MdToys,
  MdAllInbox
} from 'react-icons/md'
import { TbMoodKid } from 'react-icons/tb'
import { GiClothes } from 'react-icons/gi'

const CategorySidebar = () => {
  const [isOpen, setIsOpen] = useState(true)

  const handleToggleSideBar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div>
      <div
        className={`z-10 fixed top-0 right-0 h-screen w-[490px] bg-primary-50 text-white transition-transform ease-in-out duration-300 transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Sidebar content goes here */}
        {/*header*/}
        <div className="flex justify-between p-6 border-b border-neutral-400">
          <h1 className="text-2xl font-bold focus:outline-none text-neutral-800">All Categories</h1>
          <button className=" focus:outline-none text-neutral-800" onClick={handleToggleSideBar}>
            <AiOutlineClose size={24} />
          </button>
        </div>

        {/* LIST OF categories */}
        <div className="flex flex-col">
          <ul>
            <Link href="/products">
              <div className="flex p-6 text-lg border-b border-neutral-400 text-neutral-800 hover:bg-slate-300">
                <MdAllInbox size={25}></MdAllInbox>
                <li className="ml-4">All</li>
              </div>
            </Link>
            <Link href="/products?category=home-services">
              <div className="flex p-6 m-auto text-lg border-b border-neutral-400 text-neutral-800 hover:bg-slate-300">
                <SiHomeassistant size={25} />
                <li className="ml-4">Home services</li>
              </div>
            </Link>

            <Link href="/products?category=property">
              <div className="flex p-6 m-auto text-lg border-b border-neutral-400 text-neutral-800 hover:bg-slate-300">
                <BsBuilding size={25} />
                <li className="ml-4">Property</li>
              </div>
            </Link>

            <Link href="/products?category=health">
              <div className="flex p-6 m-auto text-lg border-b border-neutral-400 text-neutral-800 hover:bg-slate-300">
                <MdHealthAndSafety size={25} />
                <li className="ml-4">Health</li>
              </div>
            </Link>

            <Link href="/products?category=clothes">
              <div className="flex p-6 m-auto text-lg border-b border-neutral-400 text-neutral-800 hover:bg-slate-300">
                <GiClothes size={25} />
                <li className="ml-4">Clothes</li>
              </div>
            </Link>

            <Link href="/products?category=babies_and_kids">
              <div className="flex p-6 m-auto text-lg border-b border-neutral-400 text-neutral-800 hover:bg-slate-300">
                <TbMoodKid size={25} />
                <li className="ml-4">Babies and Kids</li>
              </div>
            </Link>

            <Link href="/products?category=hobbies_and_toys">
              <div className="flex p-6 m-auto text-lg border-b border-neutral-400 text-neutral-800 hover:bg-slate-300">
                <MdToys size={25} />
                <li className="ml-4">Hobbies and Toys</li>
              </div>
            </Link>
            <Link href="/products?category=foods_and_drinks">
              <div className="flex p-6 m-auto text-lg border-b border-neutral-400 text-neutral-800 hover:bg-slate-300">
                <MdEmojiFoodBeverage size={25} />
                <li className="ml-4">Foods and Drinks</li>
              </div>
            </Link>

            <Link href="/products?category=activities">
              <div className="flex p-6 m-auto text-lg border-b border-neutral-400 text-neutral-800 hover:bg-slate-300">
                <MdLocalActivity size={25} />
                <li className="ml-4">Volunteer Activities</li>
              </div>
            </Link>
          </ul>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-screen h-screen bg-neutral-900 opacity-40"
          onClick={handleToggleSideBar}
        ></div>
      )}
    </div>
  )
}

export default CategorySidebar
