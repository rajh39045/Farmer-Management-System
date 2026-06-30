export const IMAGE_PLACEHOLDER = "/placeholder-product.svg";

export const HERO_IMAGE = "/hero-image.jpg";

export const FARMER_IMAGE = "/farmer-image.jpg";

export const VEGETABLE_IMAGE = "/vegetable-image.jpg";

export const AUTH_BANNER_IMAGE = "/auth-banner.jpg";

export const FARMER_INFO_IMAGE = "/farmer-info.jpg";

export const REVIEW_AVATAR_IMAGE = "/review-avatar.jpg";

export const CATEGORY_IMAGES = {
  vegetables: "/category-vegetables.jpg",
  fruits: "/category-fruits.jpg",
  grains: "/category-grains.jpg",
  dairy: "/category-dairy.jpg",
  organic: "/category-organic.jpg",
  herbs: "/category-herbs.jpg",
};

export const TESTIMONIAL_AVATARS = {
  customer1: "/avatar-customer1.jpg",
  farmer1: "/avatar-farmer1.jpg",
  customer2: "/avatar-customer2.jpg",
};

export const getSafeImage = (src, fallback = IMAGE_PLACEHOLDER) =>
  src?.trim() || fallback;