"use client";
import { useGetCategoriesService } from "@/services/api/services/categories";
import HTTP_CODES from "@/services/api/types/http-codes";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
const groupCategoriesByParent = (categories) => {
  const result = [];

  // First, create a map of categories by their IDs
  const categoriesMap = new Map();
  categories.forEach((category) => {
    categoriesMap.set(category.id, { ...category, subCategory: [] });
  });

  // Step 2: Populate the result with the top-level categories
  categories.forEach((category) => {
    if (category.isVisibleInMenu) {
      result.push(categoriesMap.get(category.id));
    }

    // If it has a parentCategory, push it into the parent's subCategory
    if (category.parentCategory) {
      const parent = categoriesMap.get(category.parentCategory.id);
      if (parent) {
        parent.subCategory.push(categoriesMap.get(category.id));
      }
    }
  });

  return result;
};

export default function CategoryFilter() {
  const fetchCategories = useGetCategoriesService();
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const { status, data } = await fetchCategories();
      if (status === HTTP_CODES.OK) {
        setCategories(data);
      }
    };
    fetchData();
  }, []);

  const handleCategorySelect = (category) => {
    if (typeof window === undefined) return;
    const params = new URLSearchParams(window.location.search);
    params.set("category", category.id);
    router.push(`?${params.toString()}`, { scroll: false });
    setIsOpen(false); // Close dropdown after selection
  };

  const selectedCategory = useMemo(() => {
    if (typeof window === undefined) return;
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");
    const categoryObj = categories.find((c) => c.id === category);
    return category ? categoryObj : null;
  }, []);

  const groupedCategories = useMemo(
    () => groupCategoriesByParent(categories),
    [categories]
  );

  const renderCategoryOptions = (categories, level = 0) => {
    return categories.map((category, i) => {
      const categoryName = category.name;

      return (
        <li
          key={category.id}
          onClick={(e) => {
            e.stopPropagation();
            handleCategorySelect(category);
          }}
          className={`list-inside  w-full`}
          style={{
            paddingLeft: `${level === 0 ? 0 : 20}px`,
            cursor: "pointer",
            fontSize: `${17 - level}px`,
          }}
        >
          <div
            className={`w-full hover:bg-bc px-2 py-1${
              category.subCategory && category.subCategory.length
                ? " font-semibold"
                : " font-normal"
            }`}
          >
            {i + 1}. {categoryName}
          </div>
          {category.subCategory && category.subCategory.length > 0 && (
            <ol className="">
              {renderCategoryOptions(category.subCategory, level + 1)}
            </ol>
          )}
        </li>
      );
    });
  };

  return (
    <div className="basis-1/2">
      <div className="relative">
        <div
          className="text-text border border-[#a6adbb33] bg-secondary h-10 px-4 flex items-center justify-between rounded-md cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedCategory?.name ? selectedCategory.name : "Select Category"}
        </div>
        {isOpen && (
          <ol
            className="text-text options absolute top-full left-0	bg-secondary border border-bc rounded-lg px-4 py-2  overflow-hidden overflow-y-scroll z-50"
            style={{
              scrollbarWidth: "thin",
            }}
          >
            {renderCategoryOptions(groupedCategories)}
          </ol>
        )}
      </div>
    </div>
  );
}
