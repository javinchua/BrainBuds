import React, { useState } from 'react'
import Link from 'next/link'
const CategorySidebar = () => {
  const [isOpen, setIsOpen] = useState(true)

  const handleToggleSideBar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div>
      <div
        className={`z-10 fixed top-0 right-0 h-screen w-[490px] bg-primary-100 text-white transition-transform ease-in-out duration-300 transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Sidebar content goes here */}
        {/*header*/}
        <div className="flex justify-between p-6 border-b border-neutral-400">
          <h1 className="text-2xl font-bold border focus:outline-none text-neutral-700">
            All Categories
          </h1>
          <button className=" focus:outline-none text-neutral-700" onClick={handleToggleSideBar}>
            Close
          </button>
        </div>

        {/* LIST OF categories */}
        <div className="flex flex-col">
          <ul>
            <Link href="/products?category=home-services">
              <li className="p-6 text-lg border-b border-neutral-400 text-neutral-700">
                Home Services
              </li>
            </Link>

            <Link href="/products?category=property">
              <li className="p-6 text-lg border-b border-neutral-400 text-neutral-700">Property</li>
            </Link>

            <Link href="/products?category=health">
              <li className="p-6 text-lg border-b border-neutral-400 text-neutral-700">Health</li>
            </Link>

            <Link href="/products?category=clothes">
              <li className="p-6 text-lg border-b border-neutral-400 text-neutral-700">Clothes</li>
            </Link>

            <Link href="/products?category=babies_and_kids">
              <li className="p-6 text-lg border-b border-neutral-400 text-neutral-700">
                Babies and Kids
              </li>
            </Link>

            <Link href="/products?category=hobbies_and_toys">
              <li className="p-6 text-lg border-b border-neutral-400 text-neutral-700">
                Hobbies and Toys
              </li>
            </Link>
            <Link href="/products?category=foods_and_drinks">
              <li className="p-6 text-lg border-b border-neutral-400 text-neutral-700">
                Foods and Drinks
              </li>
            </Link>

            <Link href="/products?category=activities">
              <li className="p-6 text-lg border-b border-neutral-400 text-neutral-700">
                Volunteer Activities
              </li>
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
