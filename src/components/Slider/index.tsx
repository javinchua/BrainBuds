import React from 'react'
import { SliderData } from './SliderData'
import Image from 'next/image'
import { useState } from 'react'
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa'

const Slider = ({ slides }: { slides: any[] }) => {
  const [currImage, setCurrImage] = useState(0)
  const length = slides.length
  const prevSlide = () => {
    setCurrImage(currImage - 1 < 0 ? length - 1 : currImage - 1)
  }
  const nextSlide = () => setCurrImage(currImage + 1 > length - 1 ? 0 : currImage + 1)

  if (slides.length <= 0) {
    return null
  }

  return (
    <div id="gallery">
      <h1 className="p-4 text-2xl font-bold text-center">Gallery</h1>
      <div className="relative flex justify-center p-4">
        {SliderData.map((slide, index) => {
          return (
            <div
              key={index}
              className={index === currImage ? 'opacity-[1] ease-in duration-1000' : 'opacity-0'}
            >
              <FaArrowCircleLeft
                onClick={prevSlide}
                className="absolute top-[50%] left-[30px] text-black/70 cursor-pointer select-none z-[2]"
                size={50}
              />

              {index === currImage && (
                <Image src={slide.image} alt="/" width="1440" height="600" objectFit="cover" />
              )}

              <FaArrowCircleRight
                onClick={nextSlide}
                className="absolute top-[50%] right-[30px] text-black/70 cursor-pointer select-none z-[2]"
                size={50}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default Slider
