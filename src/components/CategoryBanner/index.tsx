import React, { useState, useEffect } from 'react'
import { Category } from '@/utils/constants/constants'
import Link from 'next/link'
import { fetchCategories } from 'pages/api/category'

const CategoryBanner = () => {
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    const retrieveInfo = async () => {
      const data = await fetchCategories()
      if (data != null) {
        setCategories(data as Category[])
      }
    }
    retrieveInfo()
  }, [])

  return (
    <div className="grid grid-cols-7 grid-rows-1 gap-4 h-[164px]">
      {categories.map((category, index) => (
        <Link
          href={`/products?category=${category.name}`}
          key={index}
          className="items-center justify-center p-2 text-center rounded-md bg-primary-100"
        >
          {category.name}
        </Link>
      ))}
    </div>
  )
}

export default CategoryBanner
