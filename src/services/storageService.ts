/**
 * Storage service
 * Handles image and media using local assets folder instead of Firebase Storage
 */

import { Media } from '@/types';

/**
 * Upload image to local assets folder
 * Returns a path to the asset that can be used in the app
 */
export const uploadImage = async (
  file: File | Blob,
  fileName: string,
  folder: string = 'images'
): Promise<string> => {
  try {
    // For web, we'll create a data URL or save to a local path
    // In production, you might want to save to a public assets folder
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        // Return as data URL for now
        // In a real app, you'd save to /public/assets/images/ and return the public path
        const dataUrl = e.target?.result as string;
        resolve(dataUrl);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  } catch (error) {
    console.error('Error processing image:', error);
    throw error;
  }
};

/**
 * Delete image (no-op for local assets)
 */
export const deleteImage = async (url: string): Promise<void> => {
  // No-op for local assets - images are stored as data URLs or in public folder
  console.log('Local asset deletion not implemented - image stored as data URL');
};

/**
 * Compress image before upload (client-side)
 */
export const compressImage = async (
  file: File,
  maxWidth: number = 1920,
  maxHeight: number = 1080,
  quality: number = 0.8
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Calculate new dimensions
        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Failed to compress image'));
            }
          },
          'image/jpeg',
          quality
        );
      };
      img.onerror = reject;
    };
    reader.onerror = reject;
  });
};

