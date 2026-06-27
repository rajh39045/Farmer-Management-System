import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  createProduct,
  updateProduct,
} from "../api/productApi";

const initialState = {
  name: "",
  description: "",
  category: "",
  price: "",
  quantity: "",
  unit: "kg",
  organic: false,
};

const useProductForm = (
  initialData = null,
  productId = null
) => {
  const navigate = useNavigate();

  const [form, setForm] = useState(
    initialData || initialState
  );

  const [images, setImages] = useState([]);

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } =
      e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const handleImages = (e) => {
    setImages([...e.target.files]);
  };

  const submit = async () => {
    const formData = new FormData();

    Object.keys(form).forEach((key) =>
      formData.append(key, form[key])
    );

    images.forEach((image) =>
      formData.append("images", image)
    );

    try {
      setLoading(true);

      if (productId) {
        await updateProduct(
          productId,
          formData
        );

        toast.success(
          "Product updated successfully."
        );
      } else {
        await createProduct(formData);

        toast.success(
          "Product created successfully."
        );
      }

      navigate("/farmer/products");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Operation failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    loading,
    handleChange,
    handleImages,
    submit,
  };
};

export default useProductForm;