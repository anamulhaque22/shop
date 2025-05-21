import { useGetSubCategoryService } from "@/services/api/services/categories";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FilterSection from "./FilterSection";

const CategoryFilter = ({ productFor }) => {
  const router = useRouter();
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const fetchSubCategory = useGetSubCategoryService();

  const handleAddCategory = (newCategoryId) => {
    const params = new URLSearchParams(window.location.search);
    const categories = params.get("category");

    if (categories) {
      const categoryArray = categories.split(",").map(Number);

      if (categoryArray.includes(newCategoryId)) {
        const updatedCategoryArray = categoryArray.filter(
          (id) => id !== newCategoryId
        );

        if (updatedCategoryArray.length > 0) {
          setSelectedCategory(updatedCategoryArray);
          params.set("category", updatedCategoryArray.join(","));
        } else {
          params.delete("category");
          setSelectedCategory([]);
        }
      } else {
        categoryArray.push(newCategoryId);
        setSelectedCategory(categoryArray);
        params.set("category", categoryArray.join(","));
      }
    } else {
      setSelectedCategory([newCategoryId]);
      params.set("category", newCategoryId.toString());
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    const fetch = async () => {
      const { data, status } = await fetchSubCategory(productFor);
      if (status === 200) {
        setCategoryList(data);
      }
    };
    fetch();
  }, [fetchSubCategory, productFor]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const categories = params.get("category");

    if (categories) {
      const categoryArray = categories.split(",").map(Number);
      setSelectedCategory(categoryArray);
    }
  }, []);
  return (
    <>
      {categoryList.length > 0 && (
        <FilterSection
          title="Category"
          icon={"/images/icon/Filtter.svg"}
          titleBorder="border-b border-b-secondary-lighter"
        >
          <div className="flex justify-between px-7 py-10">
            <ul className="w-full space-y-[18px]">
              {categoryList.map((category) => (
                <li
                  key={category.id}
                  className="flex justify-between cursor-pointer"
                  onClick={() => handleAddCategory(category.id)}
                >
                  <span
                    className={`font-causten-semi-bold text-base  cursor-pointer ${
                      selectedCategory.includes(category.id)
                        ? "text-black"
                        : "text-[#8A8989]"
                    }`}
                  >
                    {category.name}
                  </span>
                  <Image
                    src={"/images/icon/chevron/right.svg"}
                    width={18}
                    height={18}
                    alt="filter icon"
                  />
                </li>
              ))}
            </ul>
          </div>
        </FilterSection>
      )}
    </>
  );
};

export default CategoryFilter;
