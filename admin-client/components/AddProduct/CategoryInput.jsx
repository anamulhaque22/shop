"use client";
import { useGetCategoriesService } from "@/services/api/services/categories";
import HTTP_CODES from "@/services/api/types/http-codes";
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
    if (!category?.parentCategory) {
      result.push(categoriesMap.get(category.id));
    }

    // If it has a parentCategory, push it into the parent's subCategory
    if (category?.parentCategory?.id) {
      const parent = categoriesMap.get(category.parentCategory.id);
      if (parent) {
        parent.subCategory.push(categoriesMap.get(category.id));
      }
    }
  });

  return result;
};
export default function CategoryInput({ setValue, getValues, name }) {
  const [categories, setCategories] = useState([]);
  const fetchCategories = useGetCategoriesService();
  const [isOpen, setIsOpen] = useState(false);

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
    setValue(name, category, { shouldValidate: true });
    setIsOpen(false); // Close dropdown after selection
  };

  const groupedCategories = useMemo(
    () => groupCategoriesByParent(categories),
    [categories]
  );

  const category = getValues(name) || null;

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
      <label className="flex flex-col py-2 text-text label-text">
        Category:
      </label>
      <div className="relative">
        <div
          className="text-text border border-[#a6adbb33] bg-secondary h-10 px-4 flex items-center justify-between rounded-md cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {/* {category?.name ? category.name : "Select Category"} */}
          {categories?.find((c) => c.id === category?.id)?.name ||
            "Select Category"}
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
