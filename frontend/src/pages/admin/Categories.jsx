import { useState } from "react";
import toast from "react-hot-toast";

import PrimaryButton from "../../components/ui/PrimaryButton";

const Categories = () => {
  const [categories, setCategories] = useState([
    "Vegetables",
    "Fruits",
    "Dairy",
    "Grains",
    "Organic",
  ]);

  const [category, setCategory] = useState("");

  const addCategory = () => {
    if (!category.trim()) {
      return toast.error("Category name is required.");
    }

    if (categories.includes(category)) {
      return toast.error("Category already exists.");
    }

    setCategories([...categories, category]);

    toast.success("Category added.");

    setCategory("");
  };

  const removeCategory = (name) => {
    setCategories(
      categories.filter((item) => item !== name)
    );

    toast.success("Category removed.");
  };

  return (
    <section className="min-h-screen bg-gray-50 py-10">

      <div className="max-w-5xl mx-auto px-4">

        <h1 className="text-4xl font-bold mb-8">
          Categories
        </h1>

        <div className="bg-white rounded-xl shadow-lg p-6">

          <div className="flex gap-4">

            <input
              type="text"
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
              placeholder="New Category"
              className="flex-1 border rounded-lg px-4 py-3"
            />

            <PrimaryButton
              onClick={addCategory}
            >
              Add
            </PrimaryButton>

          </div>

          <div className="mt-8 space-y-3">

            {categories.map((cat) => (
              <div
                key={cat}
                className="flex justify-between items-center border rounded-lg p-4"
              >
                <span>{cat}</span>

                <button
                  onClick={() =>
                    removeCategory(cat)
                  }
                  className="text-red-500"
                >
                  Delete
                </button>

              </div>
            ))}

          </div>

        </div>

      </div>

    </section>
  );
};

export default Categories;