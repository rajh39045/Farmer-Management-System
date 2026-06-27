import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

import cloudinary from "../config/cloudinary.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsRoot = path.join(__dirname, "../../public/uploads");
const baseUrl = process.env.BACKEND_URL || `http://localhost:${process.env.PORT || 5000}`;

const ensureUploadDir = async (folder) => {
  const targetDir = path.join(uploadsRoot, folder || "misc");
  await fs.mkdir(targetDir, { recursive: true });
  return targetDir;
};

const saveLocalFallback = async (file, folder) => {
  const safeFolder = String(folder || "misc")
    .trim()
    .replace(/[^a-zA-Z0-9_-]/g, "-");

  const targetDir = await ensureUploadDir(safeFolder);
  const ext = path.extname(file?.originalname || "upload") || ".bin";
  const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
  const filePath = path.join(targetDir, fileName);

  const fileBuffer = file?.buffer || (await fs.readFile(file.path));
  await fs.writeFile(filePath, fileBuffer);

  return {
    url: `${baseUrl}/uploads/${safeFolder}/${fileName}`,
    publicId: `${safeFolder}/${fileName}`,
    source: "local",
  };
};

const uploadToCloudinary = async (file, folder) => {
  try {
    if (file?.buffer) {
      return await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder, resource_type: "auto" },
          (error, result) => {
            if (error) {
              reject(error);
              return;
            }

            resolve({
              url: result.secure_url,
              publicId: result.public_id,
              source: "cloudinary",
            });
          }
        );

        stream.end(file.buffer);
      });
    }

    const result = await cloudinary.uploader.upload(file, {
      folder,
      resource_type: "auto",
    });

    return {
      url: result.secure_url,
      publicId: result.public_id,
      source: "cloudinary",
    };
  } catch (error) {
  console.error("=========== CLOUDINARY ERROR ===========");
  console.error(error);
  console.error("Message:", error.message);
  console.error("=======================================");

  throw error;
}
};

export default uploadToCloudinary;
