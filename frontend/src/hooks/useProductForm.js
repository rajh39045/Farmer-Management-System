import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { createProduct, updateProduct } from "../api/productApi";

const initialState = {
  name: "",
  description: "",
  category: "",
  price: "",
  quantity: "",
  unit: "kg",
  organic: false,
};

const useProductForm = (initialData = null, productId = null) => {
  const navigate = useNavigate();

  const [form, setForm] = useState(initialState);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialState,
        ...initialData,
        category: initialData.category?._id || initialData.category || "",
        organic: initialData.farmingMethod === "Organic" || Boolean(initialData.organic),
      });
    } else {
      setForm(initialState);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setError("");

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImages = (e) => {
    setError("");
    setImages([...e.target.files]);
  };

  const submit = async () => {
    if (!form.name?.trim() || !form.category || !form.description?.trim()) {
      const message = "Please fill in the product name, category, and description.";
      setError(message);
      toast.error(message);
      return;
    }

    const price = Number(form.price);
    const quantity = Number(form.quantity);

    if (!price || price <= 0) {
      const message = "Price must be greater than 0.";
      setError(message);
      toast.error(message);
      return;
    }

    if (!Number.isInteger(quantity) || quantity < 0) {
      const message = "Quantity must be a whole number of 0 or more.";
      setError(message);
      toast.error(message);
      return;
    }

    const selectedCategory = form.category;

    if (!selectedCategory) {
      const message = "Please select a category.";
      setError(message);
      toast.error(message);
      return;
    }

    const formData = new FormData();
    formData.append("name", form.name.trim());
    formData.append("description", form.description.trim());
    formData.append("category", selectedCategory);
    formData.append("price", String(price));
    formData.append("quantity", String(quantity));
    formData.append("unit", form.unit || "kg");
    formData.append("farmingMethod", form.organic ? "Organic" : "Conventional");

    images.forEach((image) => formData.append("images", image));

    try {
      setLoading(true);
      setError("");

      if (productId) {
        await updateProduct(productId, formData);
        toast.success("Product updated successfully.");
      } else {
        await createProduct(formData);
        toast.success("Product created successfully.");
      }

      window.dispatchEvent(new Event("farmer-dashboard-refresh"));
      navigate("/farmer/products");
    } catch (error) {
      const message = error.response?.data?.message || "Operation failed.";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    loading,
    error,
    handleChange,
    handleImages,
    submit,
    setForm,
  };
};

export default useProductForm;