import React, { useState, useEffect } from 'react'
import { collection, getDocs, getFirestore } from 'firebase/firestore'
import { Category } from '@/utils/constants/constants'
import Link from 'next/link'
const firestore = getFirestore()

const CategoryBanner = () => {
  const [categories, setCategories] = useState<Category[]>([])

  const fetchCategories = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, 'categories'))
      const fetchedCategories: Category[] = []
      querySnapshot.forEach((doc) => {
        const category = doc.data() as Category
        fetchedCategories.push(category)
      })
      setCategories(fetchedCategories)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  useEffect(() => {
    fetchCategories()
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
