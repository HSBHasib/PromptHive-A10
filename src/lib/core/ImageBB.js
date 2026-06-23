import toast from "react-hot-toast";

export const uploadImageToImgBB = async (file) => {
  const IMGBB_API_KEY = process.env.NEXT_PUBLIC_Logo_API;

  if (!file) {
    toast.error("No file provided for upload");
    return null;
  }

  try {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();

    if (result.success) {
      return result.data.url;
    } else {
      toast.error("ImgBB Upload Failed Error:", result.error?.message);
      return null;
    }
  } catch (error) {
    toast.error("Error during ImgBB upload process:", error);
    return null;
  }
};
