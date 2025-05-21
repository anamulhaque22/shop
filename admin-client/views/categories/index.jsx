"use client";
import useConfirmDialog from "@/components/confirm-dialog/use-confirm-dialog";
import useToast from "@/hooks/useToast";
import {
  useDeleteCategoryService,
  useGetCategoriesService,
} from "@/services/api/services/categories";
import HTTP_CODES from "@/services/api/types/http-codes";
import { useEffect, useState } from "react";
import CategoryForm from "./components/CategoryForm";
import CategoryList from "./components/CategoryList";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [editCategory, setEditCategory] = useState(null); // Track category being edited
  const fetchCategories = useGetCategoriesService();
  const fetchDeleteCategory = useDeleteCategoryService();
  const { confirmDialog } = useConfirmDialog();
  const showToast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      const { status, data } = await fetchCategories();
      if (status === HTTP_CODES.OK) {
        setCategories(data);
      }
    };
    fetchData();
  }, []);

  const handleSetCategory = (category) => {
    setCategories((prev) =>
      prev.some((c) => c.id === category.id)
        ? prev.map((c) => (c.id === category.id ? category : c))
        : [...prev, category]
    );
    setEditCategory(null); // Reset edit mode
  };

  const handleDeleteCategory = async (id) => {
    const isConfirm = await confirmDialog({
      title: "Delete Category",
      message: "Are you sure you want to delete this category?",
    });

    if (isConfirm) {
      const { status } = await fetchDeleteCategory(id);
      if (status !== HTTP_CODES.NO_CONTENT) {
        showToast("Failed to delete category", "error");
        return;
      }
      setCategories((prev) => prev.filter((category) => category.id !== id));
      showToast("Category deleted successfully", "success");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:flex-wrap pt-8 px-6">
      <div className="flex-[0_0_auto] sm:w-3/12 pr-4">
        <div className="bg-content-bg px-5 py-3 rounded-xl border border-bc">
          <CategoryForm
            handleSetCategory={handleSetCategory}
            editCategory={editCategory}
            isEditMode={!!editCategory}
          />
        </div>
      </div>
      <div className="flex-[0_0_auto] sm:w-3/4 pl-4 overflow-x-auto">
        <div className="bg-content-bg px-5 py-3 rounded-xl border border-bc">
          <CategoryList
            categories={categories}
            onDelete={(id) => handleDeleteCategory(id)}
            onEdit={(category) => setEditCategory(category)} // Set category for editing
          />
        </div>
      </div>
    </div>
  );
}
