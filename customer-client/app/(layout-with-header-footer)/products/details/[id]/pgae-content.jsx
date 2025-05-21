"use client";
import Loading from "@/components/Loading/Loading";
import ProductsDetails from "@/components/ProductDetails/ProductsDetails";
import HTTP_CODES from "@/services/api/constants/http-codes";
import { useGetProductService } from "@/services/api/services/product";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function ProductDetailsContent() {
  const fetchProduct = useGetProductService();
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(false);
  const productId = Array.isArray(params.id) ? params.id[0] : params.id;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      try {
        const { data, status } = await fetchProduct(productId);
        if (status === HTTP_CODES.OK) {
          setLoading(false);
          setProduct(data);
        } else if (
          status === HTTP_CODES.NOT_FOUND ||
          status === HTTP_CODES.INTERNAL_SERVER_ERROR
        ) {
          setLoading(false);
          setError(true);
        }
      } catch (error) {
        setLoading(false);
        console.error("Error fetching product:", error);
        setError(true);
      }
    };
    loadProduct();
  }, [productId, fetchProduct]);

  if (loading)
    return (
      <div className="h-screen bg-white">
        <Loading isLoading={loading} />
      </div>
    );

  return product ? (
    <ProductsDetails product={product} />
  ) : (
    <div>Product not found</div>
  );
}
export default ProductDetailsContent;
