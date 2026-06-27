import { useState } from "react";
import toast from "react-hot-toast";

import { getCategoryImage, getCategoryKey } from "../../utils/categories";
import PrimaryButton from "../ui/PrimaryButton";
import SecondaryButton from "../ui/SecondaryButton";
import ConfirmDialog from "../ui/ConfirmDialog";

const isPersistedCategoryId = (id) =>
  /^[a-f\d]{24}$/i.test(String(id || ""));

const ProductForm = ({
  form,
  loading,
  error,
  categories = [],
  handleChange,
  handleImages,
  onSubmit,
  onCreateCategory,
  onDeleteCategory,
}) => {
  const [manualCategoryOpen, setManualCategoryOpen] = useState(false);
  const [manageCategoriesOpen, setManageCategoriesOpen] = useState(false);
  const [manualCategoryName, setManualCategoryName] = useState("");
  const [manualCategorySlug, setManualCategorySlug] = useState("");
  const [manualCategoryImage, setManualCategoryImage] = useState(null);
  const [manualCategoryImagePreview, setManualCategoryImagePreview] = useState("");
  const [manualCategoryLoading, setManualCategoryLoading] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [deletingCategoryId, setDeletingCategoryId] = useState("");

  const handleCreateCategory = async () => {
    const trimmedName = manualCategoryName.trim();
    const trimmedSlug = manualCategorySlug.trim().toLowerCase();

    if (!trimmedName) {
      toast.error("Category name is required.");
      return;
    }

    if (!trimmedSlug) {
      toast.error("Category slug is required.");
      return;
    }

    if (!onCreateCategory) {
      toast.error("Category creation is unavailable.");
      return;
    }

    try {
      setManualCategoryLoading(true);
      await onCreateCategory({
        name: trimmedName,
        slug: trimmedSlug,
        description: "",
        image: manualCategoryImage,
      });

      setManualCategoryOpen(false);
      setManualCategoryName("");
      setManualCategorySlug("");
      setManualCategoryImage(null);
      setManualCategoryImagePreview("");
    } finally {
      setManualCategoryLoading(false);
    }
  };

  const confirmDeleteCategory = async () => {
    if (!categoryToDelete || !onDeleteCategory) {
      return;
    }

    try {
      setDeletingCategoryId(categoryToDelete._id);
      await onDeleteCategory(categoryToDelete._id);
      setCategoryToDelete(null);
    } catch (error) {
      console.error(error);
    } finally {
      setDeletingCategoryId("");
    }
  };

  const deletableCategories = categories.filter((category) =>
    isPersistedCategoryId(category._id)
  );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="space-y-6 rounded-2xl bg-white p-8 shadow-lg"
    >
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={form.name || ""}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-500"
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">Category</label>
          <select
            name="category"
            value={form.category || ""}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-500"
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option
                key={getCategoryKey(category)}
                value={category._id}
              >
                {category.name}
              </option>
            ))}
          </select>

          {onCreateCategory && (
            <div className="mt-3 space-y-2">
              <button
                type="button"
                className="text-sm font-medium text-green-600"
                onClick={() => setManualCategoryOpen((prev) => !prev)}
              >
                {manualCategoryOpen ? "Hide" : "+ Create new category"}
              </button>

              {onDeleteCategory && deletableCategories.length > 0 && (
                <button
                  type="button"
                  className="ml-4 text-sm font-medium text-gray-600"
                  onClick={() => setManageCategoriesOpen((prev) => !prev)}
                >
                  {manageCategoriesOpen ? "Hide categories" : "Manage categories"}
                </button>
              )}

              {manualCategoryOpen && (
                <div className="mt-3 space-y-2 rounded-xl border border-gray-200 p-3">
                  <input
                    type="text"
                    value={manualCategoryName}
                    onChange={(e) => {
                      const nextName = e.target.value;
                      setManualCategoryName(nextName);
                      setManualCategorySlug(
                        nextName
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, "-")
                          .replace(/(^-|-$)/g, "")
                      );
                    }}
                    placeholder="New category name"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2"
                  />
                  <input
                    type="text"
                    value={manualCategorySlug}
                    onChange={(e) => setManualCategorySlug(e.target.value)}
                    placeholder="Slug"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2"
                  />
                  <div>
                    <label className="mb-1 block text-sm text-gray-600">
                      Category image (optional)
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];

                        if (!file) {
                          setManualCategoryImage(null);
                          setManualCategoryImagePreview("");
                          return;
                        }

                        setManualCategoryImage(file);
                        setManualCategoryImagePreview(URL.createObjectURL(file));
                      }}
                      className="w-full text-sm"
                    />
                    {manualCategoryImagePreview && (
                      <img
                        src={manualCategoryImagePreview}
                        alt="Category preview"
                        className="mt-2 h-24 w-24 rounded-lg object-cover border"
                      />
                    )}
                  </div>
                  <PrimaryButton
                    type="button"
                    loading={manualCategoryLoading}
                    onClick={handleCreateCategory}
                  >
                    Save Category
                  </PrimaryButton>
                </div>
              )}

              {manageCategoriesOpen && onDeleteCategory && (
                <div className="mt-3 space-y-2 rounded-xl border border-gray-200 p-3">
                  <p className="text-sm font-medium text-gray-700">
                    Your categories
                  </p>

                  {deletableCategories.map((category) => (
                    <div
                      key={getCategoryKey(category)}
                      className="flex items-center justify-between gap-3 rounded-lg border border-gray-100 px-3 py-2"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={getCategoryImage(category)}
                          alt={category.name}
                          className="h-10 w-10 rounded-lg object-cover border shrink-0"
                        />
                        <span className="truncate text-sm font-medium">
                          {category.name}
                        </span>
                      </div>

                      <SecondaryButton
                        type="button"
                        onClick={() => setCategoryToDelete(category)}
                        loading={deletingCategoryId === category._id}
                        className="!px-3 !py-1.5 !text-sm !border-red-500 !text-red-500 hover:!bg-red-500 hover:!text-white shrink-0"
                      >
                        Delete
                      </SecondaryButton>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div>
          <label className="mb-2 block font-medium">Price</label>
          <input
            type="number"
            name="price"
            min="1"
            step="0.01"
            value={form.price || ""}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-500"
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">Quantity</label>
          <input
            type="number"
            name="quantity"
            min="0"
            step="1"
            value={form.quantity || ""}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-500"
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">Unit</label>
          <select
            name="unit"
            value={form.unit || "kg"}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-500"
          >
            <option value="kg">kg</option>
            <option value="gram">gram</option>
            <option value="piece">piece</option>
            <option value="dozen">dozen</option>
            <option value="liter">liter</option>
            <option value="packet">packet</option>
          </select>
        </div>

        <div className="flex items-center gap-3 pt-8">
          <input
            type="checkbox"
            name="organic"
            checked={Boolean(form.organic)}
            onChange={handleChange}
          />
          <label className="font-medium">Organic Product</label>
        </div>
      </div>

      <div>
        <label className="mb-2 block font-medium">Description</label>
        <textarea
          rows="5"
          name="description"
          value={form.description || ""}
          onChange={handleChange}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-500"
          required
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">Product Images</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImages}
          className="mt-3"
        />
      </div>

      <PrimaryButton type="submit" loading={loading}>
        Save Product
      </PrimaryButton>

      <ConfirmDialog
        open={Boolean(categoryToDelete)}
        title="Delete category?"
        message={
          categoryToDelete
            ? `Are you sure you want to delete "${categoryToDelete.name}"?`
            : ""
        }
        confirmLabel="Delete"
        onConfirm={confirmDeleteCategory}
        onCancel={() => setCategoryToDelete(null)}
        loading={Boolean(deletingCategoryId)}
      />
    </form>
  );
};

export default ProductForm;