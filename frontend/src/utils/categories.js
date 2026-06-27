import { useEffect, useState } from "react";

import {
  CATEGORY_IMAGES,
  IMAGE_PLACEHOLDER,
  getSafeImage,
} from "./images";

export const fallbackCategories = [
  { _id: "vegetables", name: "Vegetables", slug: "vegetables" },
  { _id: "fruits", name: "Fruits", slug: "fruits" },
  { _id: "grains", name: "Grains", slug: "grains" },
  { _id: "dairy", name: "Dairy", slug: "dairy" },
  { _id: "organic", name: "Organic", slug: "organic" },
  { _id: "herbs", name: "Herbs", slug: "herbs" },
];

export const normalizeCategories = (items = []) => {
  const seen = new Set();

  return (Array.isArray(items) ? items : [])
    .filter((item) => {
      const key =
        item?._id?.toString() ||
        item?.slug ||
        item?.name?.toLowerCase();

      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .map((item) => ({
      ...item,
      _id: item?._id?.toString() || item?.slug || item?.name?.toLowerCase(),
      name: item?.name?.trim() || "Untitled",
      slug: item?.slug?.trim() || "",
    }));
};

export const getCategoryImage = (category) => {
  if (category?.image) {
    return category.image;
  }

  const slug = category?.slug?.toLowerCase();

  if (slug && CATEGORY_IMAGES[slug]) {
    return CATEGORY_IMAGES[slug];
  }

  const nameKey = category?.name?.toLowerCase().replace(/\s+/g, "");

  if (nameKey && CATEGORY_IMAGES[nameKey]) {
    return CATEGORY_IMAGES[nameKey];
  }

  return CATEGORY_IMAGES.organic;
};

export const getCategoryKey = (category) =>
  category?._id?.toString() || category?.slug || category?.name;

export { CATEGORY_IMAGES, IMAGE_PLACEHOLDER, getSafeImage };
