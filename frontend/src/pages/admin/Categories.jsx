import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import PrimaryButton from "../../components/ui/PrimaryButton";
import SecondaryButton from "../../components/ui/SecondaryButton";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
} from "../../api/categoryApi";
import {
  getCategoryImage,
  getCategoryKey,
  normalizeCategories,
} from "../../utils/categories";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState("");
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await getAllCategories();
      setCategories(normalizeCategories(response?.categories || []));
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to load categories."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const resetForm = () => {
    setName("");
    setSlug("");
    setDescription("");
    setImage(null);
    setImagePreview("");
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      setImage(null);
      setImagePreview("");
      return;
    }

    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const addCategory = async () => {
    const trimmedName = name.trim();
    const trimmedSlug = slug.trim();

    if (!trimmedName) {
      return toast.error("Category name is required.");
    }

    const normalizedSlug =
      trimmedSlug ||
      trimmedName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    if (!normalizedSlug) {
      return toast.error("Category slug is required.");
    }

    try {
      setSubmitting(true);

      await createCategory({
        name: trimmedName,
        slug: normalizedSlug,
        description: description.trim(),
        image,
      });

      toast.success("Category added.");
      resetForm();
      fetchCategories();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to create category."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!categoryToDelete?._id) {
      return;
    }

    try {
      setDeletingId(categoryToDelete._id);
      await deleteCategory(categoryToDelete._id);
      toast.success("Category deleted.");
      setCategoryToDelete(null);
      fetchCategories();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to delete category."
      );
    } finally {
      setDeletingId("");
    }
  };

  if (loading) {
    return <LoadingSpinner fullScreen text="Loading Categories..." />;
  }

  return (
    <section className="min-h-screen bg-gray-50 py-10">

      <div className="max-w-5xl mx-auto px-4">

        <h1 className="text-4xl font-bold mb-8">
          Categories
        </h1>

        <div className="bg-white rounded-xl shadow-lg p-6">

          <h2 className="text-lg font-semibold mb-4">
            Add Category
          </h2>

          <div className="grid gap-4 md:grid-cols-2">

            <input
              type="text"
              value={name}
              onChange={(e) => {
                const nextName = e.target.value;
                setName(nextName);

                if (!slug.trim()) {
                  setSlug(
                    nextName
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, "-")
                      .replace(/(^-|-$)/g, "")
                  );
                }
              }}
              placeholder="Category name"
              className="border rounded-lg px-4 py-3"
            />

            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="Slug"
              className="border rounded-lg px-4 py-3"
            />

            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="border rounded-lg px-4 py-3 md:col-span-2"
            />

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-600"
              />

              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Category preview"
                  className="mt-3 h-32 w-32 rounded-xl object-cover border"
                />
              )}
            </div>

            <div className="md:col-span-2">
              <PrimaryButton
                onClick={addCategory}
                loading={submitting}
              >
                Add Category
              </PrimaryButton>
            </div>

          </div>

          <div className="mt-10 space-y-3">

            <h2 className="text-lg font-semibold mb-4">
              All Categories
            </h2>

            {categories.length === 0 ? (
              <div className="rounded-lg border border-dashed p-6 text-center text-gray-500">
                No categories yet.
              </div>
            ) : (
              categories.map((cat) => (
                <div
                  key={getCategoryKey(cat)}
                  className="flex flex-col gap-4 border rounded-lg p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={getCategoryImage(cat)}
                      alt={cat.name}
                      className="h-16 w-16 rounded-xl object-cover border"
                    />

                    <div>
                      <p className="font-semibold">{cat.name}</p>
                      <p className="text-sm text-gray-500">
                        {cat.slug}
                        {cat.description ? ` • ${cat.description}` : ""}
                        {typeof cat.productCount === "number"
                          ? ` • ${cat.productCount} product${cat.productCount === 1 ? "" : "s"}`
                          : ""}
                      </p>
                    </div>
                  </div>

                  <SecondaryButton
                    onClick={() => setCategoryToDelete(cat)}
                    loading={deletingId === cat._id}
                    className="!border-red-500 !text-red-500 hover:!bg-red-500 hover:!text-white"
                  >
                    Delete
                  </SecondaryButton>

                </div>
              ))
            )}

          </div>

        </div>

      </div>

      <ConfirmDialog
        open={Boolean(categoryToDelete)}
        title="Delete category?"
        message={
          categoryToDelete
            ? `Are you sure you want to delete "${categoryToDelete.name}"? This action cannot be undone.`
            : ""
        }
        confirmLabel="Delete"
        onConfirm={confirmDelete}
        onCancel={() => setCategoryToDelete(null)}
        loading={Boolean(deletingId)}
      />

    </section>
  );
};

export default Categories;
