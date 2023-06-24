import React, { useEffect, useState } from 'react'
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
import { fetchCategories } from 'pages/api/category'
import { Category } from '@/utils/constants/constants'
interface CategoryProps {
  open: boolean
  handleClose: () => void
}
const CategorySidebar: React.FC<CategoryProps> = ({ open, handleClose }) => {
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    const getCategories = async () => {
      const categories = await fetchCategories()
      setCategories(categories as Category[])
    }
    getCategories()
  }, [])

  const getIconComponent = (category: string) => {
    switch (category) {
      case 'Home Services':
        return <SiHomeassistant size={25} />
      case 'Property':
        return <BsBuilding size={25} />
      case 'Health':
        return <MdHealthAndSafety size={25} />
      case 'Clothes':
        return <GiClothes size={25} />
      case 'Babies and Kids':
        return <TbMoodKid size={25} />
      case 'Hobbies and Toys':
        return <MdToys size={25} />
      case 'Foods and Drinks':
        return <MdEmojiFoodBeverage size={25} />
      case 'Volunteer Activities':
        return <MdLocalActivity size={25} />
      default:
        return <MdAllInbox size={25} />
    }
  }
  return (
    <div>
      <div
        className={`z-10 fixed top-0 right-0 h-screen w-[490px] bg-primary-50 text-white transition-transform ease-in-out duration-300 transform ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Sidebar content goes here */}
        {/*header*/}
        <div className="flex justify-between p-6 border-b border-neutral-400">
          <h1 className="text-2xl font-bold focus:outline-none text-neutral-800">All Categories</h1>
          <button className=" focus:outline-none text-neutral-800" onClick={handleClose}>
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
            {categories.map((category, index) => {
              return (
                <Link href={`/products?category=${category.name}`} key={index}>
                  <div className="flex p-6 m-auto text-lg border-b border-neutral-400 text-neutral-800 hover:bg-slate-300">
                    {getIconComponent(category.name)}
                    <li className="ml-4">{category.name}</li>
                  </div>
                </Link>
              )
            })}
          </ul>
        </div>
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="fixed top-0 left-0 w-screen h-screen bg-neutral-900 opacity-40"
          onClick={handleClose}
        ></div>
      )}
    </div>
  )
}

export default CategorySidebar
