"use client";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    >
      <Image
        src={"/images/icon/chevron/left.svg"}
        width={24}
        height={44}
        alt="carusel left"
      />
    </div>
  );
}

const Hero = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="home-banner">
      <Slider {...settings}>
        <div className="bg-[#00B4D9]  h-[60vh] md:h-[75vh]">
          <div className="container flex items-stretch justify-between text-white relative z-10">
            <div className="w-full md:w-3/5 h-[60vh] md:h-[75vh] flex items-center">
              <div className="space-y-6">
                <ol className="list-reset flex font-core-sans-medium text-xl md:text-3xl space-x-1 md:space-x-3">
                  <li>
                    <a href="#" className="transition duration-150 ease-in-out">
                      T-Shirt
                    </a>
                  </li>
                  <li>
                    <span className=""> / </span>
                  </li>
                  <li className="">Tops</li>
                </ol>
                <h1 className="font-coresans-extra-bold text-5xl md:text-7xl">
                  Summer <br /> Value Pack
                </h1>
                <ol className="list-reset flex font-core-sans-medium text-xl md:text-3xl space-x-1 md:space-x-3">
                  <li>
                    <a href="#" className="transition duration-150 ease-in-out">
                      cool
                    </a>
                  </li>
                  <li>
                    <span className=""> / </span>
                  </li>
                  <li className="">colorful</li>
                  <li>
                    <span className=""> / </span>
                  </li>
                  <li className="">comfy</li>
                </ol>
                <div>
                  <Link
                    href={"/products"}
                    className="bg-white text-secondary font-causten-bold text-xl md:text-2xl px-8 md:px-12 py-2 md:py-3 rounded-lg !mt-8"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
            <div className="w-full md:w-2/5 h-full absolute top-0 right-0 bg-[url(/images/hero.png)] -z-10 bg-right md:bg-center bg-no-repeat	bg-[length:100%_100%]">
              {/* <Image
            src={"/images/hero.jpg"}
            alt="hero"
            width={100}
            height={100}
            className="object-cover w-full"
          /> */}
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default Hero;
