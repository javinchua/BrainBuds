import React from 'react'
import Slider from '@/components/Slider'
import { SliderData } from '@/components/Slider/SliderData'
const Gallery = () => {
  return (
    <div className="mt-20">
      <Slider slides={SliderData}></Slider>
    </div>
  )
}

export default Gallery
