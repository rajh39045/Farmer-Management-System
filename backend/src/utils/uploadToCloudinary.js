import cloudinary from "../config/cloudinary.js";

const uploadToCloudinary = async (filePath, folder) => {
  const result = await cloudinary.uploader.upload(filePath, {
    folder,
  });

  return {
    url: result.secure_url,
    publicId: result.public_id,
  };
};

export default uploadToCloudinary;