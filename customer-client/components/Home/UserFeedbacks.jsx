"use client";
import Slider from "react-slick";
import Feedback from "../Feedback/Feedback";
import SectionHeading from "../Typography/SectionHeading";

const UserFeedbacks = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };
  return (
    <div className="container section-space mb-11 md:mb-20 feedback-container">
      <SectionHeading text={"Feedback"} />
      <div className=" mt-8 sm:mt-12 user-feedback">
        <Slider {...settings}>
          <Feedback />
          <Feedback />
          <Feedback />
          <Feedback />
          <Feedback />
          <Feedback />
          <Feedback />
        </Slider>
      </div>
    </div>
  );
};

export default UserFeedbacks;
