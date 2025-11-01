// utils/cloudinaryDelete.ts
import cloudinary from '../config/cloudinary';

export const deleteFromCloudinary = async (url: string): Promise<boolean> => {
  try {
    if (!url) return false;

    // Extract public ID from URL
    const publicId = url.split('/upload/')[1]?.split('/').slice(1).join('/').replace(/\.[^/.]+$/, "");
    if (!publicId) return false;

    // Determine resource type
    const resourceType = url.includes('/raw/upload/') ? 'raw' : 'image';

    // Delete from Cloudinary
    const result = await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
    return result.result === 'ok';
    
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    return false;
  }
};