"use client";
import Image from "next/image";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const Hero = () => {
  return (
    <div className="home-banner w-full">
      <Image
        src="/images/home-banner.png" // Replace with your image path
        alt="Banner"
        width={1920} // Set a fixed width for desktop
        height={900} // Set a fixed height for desktop
        className="w-full h-auto object-cover md:h-[400px] lg:h-[600px]" // Adjust height for responsiveness
        priority // Ensures the image is loaded quickly
      />
    </div>
  );
};

export default Hero;
