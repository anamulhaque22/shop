"use client";
import HTTP_CODES from "@/services/api/constants/http-codes";
import { useGetProductsService } from "@/services/api/services/product";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import SectionHeading from "../Typography/SectionHeading";

const NewArrival = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = useGetProductsService();
  const settings = {
    infinite: products?.length > true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: products.length > 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: products.length > 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: products.length > 1,
        },
      },
    ],
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data, status } = await fetchProducts({
        page: 1,
        limit: 10,
      });

      if (status === HTTP_CODES.OK) {
        setProducts(data["data"]);
      }
    };
    fetchData();
  }, [fetchProducts]);
  return (
    <div className="container section-space mb-12">
      <SectionHeading text={"New Arrival"} />
      <div className="new-arrival mt-8 sm:mt-12 slider-container">
        <Slider {...settings}>
          {products.map((product) => (
            <div className="mx-0 sm:mx-10" key={product.id}>
              <Image
                src={
                  product?.images?.[0]?.imageUrl ??
                  "/images/product-placeholder.jpg"
                }
                width={260}
                height={260}
                alt="New Arrival"
                className="object-fill w-64 h-64"
              />

              <Link
                href={`products/details/${product.id}`}
                className="font-causten-bold text-lg mt-2 block"
              >
                {product.title}
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default NewArrival;
