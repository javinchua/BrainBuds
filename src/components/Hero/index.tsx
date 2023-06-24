import React from 'react'

interface heroProps {
  heading: string
  message: string
}
const Hero = ({ heading, message }: heroProps) => {
  return (
    <div
      className="flex items-center justify-center object-cover h-screen bg-fixed bg-center bg-cover"
      style={{
        backgroundImage:
          'url("/img/male-hand-holding-heart-like-icon-blue-background-kindness-charity-pure-love-compassion-concept-banner-with-copy-space_150455-7891.avif")'
      }}
    >
      {/*Overlay*/}
      <div className="absolute top-0 bottom-0 left-0 right-0 bg-black/70 z-[2] h-screen " />
      <div className="p-5 text-white z-[2] ml-[-10rem] mt-[-10rem]">
        <h2 className="text-5xl font-bold text-white"> {heading}</h2>
        <p className="py-5 text-xl text-white">{message}</p>
        <button className="px-8 py-2 border">Request demo</button>
      </div>
    </div>
  )
}

export default Hero
