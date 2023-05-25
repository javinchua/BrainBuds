import React from "react";

interface heroProps {
   heading: string,
   message: string
}
const Hero = ({heading, message} : heroProps) => {
  return (

      <div className="flex items-center justify-center h-screen mb-12 bg-fixed bg-center bg-cover custom-image">
        {/*Overlay*/}
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-black/70 first-letter:z-[2]" />
          <div className="p-5 text-white z-[2] ml-[-10rem] mt-[-10rem]">
            <h2 className="text-5xl font-bold text-white"> {heading}</h2>
            <p className="py-5 text-xl text-white">{message}</p>
            <button className="px-8 py-2 border">Click</button>
          </div>
        </div>

  );
};

export default Hero;
