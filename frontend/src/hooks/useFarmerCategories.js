import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  createCategory,
  deleteCategory,
  getAllCategories,
} from "../api/categoryApi";
import {
  fallbackCategories,
  normalizeCategories,
} from "../utils/categories";

const isPersistedCategoryId = (id) =>
  /^[a-f\d]{24}$/i.test(String(id || ""));

const useFarmerCategories = (setForm) => {
  const [categories, setCategories] = useState(
    normalizeCategories(fallbackCategories)
  );

  const fetchCategories = useCallback(async () => {
    try {
      const response = await getAllCategories();
      const loadedCategories = normalizeCategories(response?.categories || []);

      setCategories(
        loadedCategories.length > 0
          ? loadedCategories
          : normalizeCategories(fallbackCategories)
      );
    } catch (error) {
      console.error(error);
      setCategories(normalizeCategories(fallbackCategories));
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleCreateCategory = async (categoryData) => {
    try {
      const createdCategory = await createCategory(categoryData);
      const normalizedCategory = normalizeCategories([createdCategory])[0];

      setCategories((prev) =>
        normalizeCategories([...prev, normalizedCategory])
      );

      if (setForm) {
        setForm((prev) => ({
          ...prev,
          category: normalizedCategory._id,
        }));
      }

      toast.success("Category created successfully.");
      return normalizedCategory;
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to create category."
      );
      throw error;
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    if (!isPersistedCategoryId(categoryId)) {
      toast.error("This category cannot be deleted.");
      return;
    }

    try {
      await deleteCategory(categoryId);

      setCategories((prev) =>
        prev.filter((category) => category._id !== categoryId)
      );

      if (setForm) {
        setForm((prev) => ({
          ...prev,
          category: prev.category === categoryId ? "" : prev.category,
        }));
      }

      toast.success("Category deleted.");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to delete category."
      );
      throw error;
    }
  };

  return {
    categories,
    handleCreateCategory,
    handleDeleteCategory,
    refreshCategories: fetchCategories,
  };
};

export default useFarmerCategories;
