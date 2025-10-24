const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads a file (CV) to Cloudinary.
 * @param {string} filePath - The local path or data URI of the file to upload.
 * @param {string} folder - The target folder in Cloudinary.
 * @returns {Promise<string>} The secure URL of the uploaded file.
 */
const uploadCV = async (filePath, folder = "elitehomecare/cvs") => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: folder,
      resource_type: "auto", // Automatically detect file type (document)
      allowed_formats: ["pdf", "doc", "docx"], // Restrict to CV formats
    });
    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary CV Upload Error:", error);
    throw new Error("CV upload to Cloudinary failed.");
  }
};

module.exports = { cloudinary, uploadCV };