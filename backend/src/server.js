import "dotenv/config";

import app from "./app.js";
import connectDB from "./config/db.js";
import Category from "./models/Category.js";
import categoriesSeed from "./seeds/category.seed.js";

const PORT = process.env.PORT || 5000;

const seedCategories = async () => {
  const existingCount = await Category.countDocuments();

  if (existingCount === 0) {
    await Category.insertMany(
      categoriesSeed.map((category) => ({
        ...category,
        isActive: true,
      }))
    );

    console.log("🌱 Seeded default categories");
  }
};

const startServer = async () => {
  try {
    await connectDB();
    await seedCategories();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Server Failed:", error);
    process.exit(1);
  }
};

startServer();