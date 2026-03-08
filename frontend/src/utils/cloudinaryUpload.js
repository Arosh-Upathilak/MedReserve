export const uploadImages = async (folderName, files) => {
  const uploadedImages = [];

  const cloud_name = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const upload_preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  for (const file of files) {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", upload_preset);
    formData.append("folder", folderName);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Cloudinary upload error:", data);
      throw new Error(data.error?.message);
    }

    uploadedImages.push({
      url: data.secure_url,
      publicId: data.public_id
    });
  }

  return uploadedImages;
};