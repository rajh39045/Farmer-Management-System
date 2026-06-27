export const IMAGE_PLACEHOLDER = "/placeholder-product.svg";

export const HERO_IMAGE =
  "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1600&q=80";

export const FARMER_IMAGE =
  "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=900&q=80";

export const VEGETABLE_IMAGE =
  "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80";

export const CATEGORY_IMAGES = {
  vegetables:
    "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
  fruits:
    "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=600&q=80",
  grains:
    "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80",
  dairy:
    "https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=600&q=80",
  organic:
    "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80",
  herbs:
    "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=600&q=80",
};

export const TESTIMONIAL_AVATARS = {
  customer1: "https://randomuser.me/api/portraits/men/32.jpg",
  farmer1: "https://randomuser.me/api/portraits/women/44.jpg",
  customer2: "https://randomuser.me/api/portraits/men/65.jpg",
};

export const getSafeImage = (src, fallback = IMAGE_PLACEHOLDER) =>
  src?.trim() || fallback;
