/**
 * Storage service
 * Handles image and media uploads to Firebase Storage
 */

import { Media } from '@/types';
import { storage } from './firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject, UploadResult } from 'firebase/storage';

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
    // Create a storage reference
    const timestamp = Date.now();
    const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
    const storageRef = ref(storage, `${folder}/${timestamp}_${sanitizedFileName}`);
    
    // Determine content type
    let contentType = 'image/jpeg';
    if (file instanceof File) {
      contentType = file.type || 'image/jpeg';
    }
    
    // Upload the file
    const snapshot: UploadResult = await uploadBytes(storageRef, file, {
      contentType,
    });
    
    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image to Firebase Storage:', error);
    throw error;
  }
};

/**
 * Delete image from Firebase Storage
 */
export const deleteImage = async (url: string): Promise<void> => {
  try {
    // Extract the path from the Firebase Storage URL
    // URL format: https://firebasestorage.googleapis.com/v0/b/{bucket}/o/{path}?alt=media&token={token}
    if (!url || !url.includes('firebasestorage.googleapis.com')) {
      console.log('Not a Firebase Storage URL, skipping deletion:', url);
      return;
    }
    
    // Parse the URL to get the path
    const urlObj = new URL(url);
    const pathMatch = urlObj.pathname.match(/\/o\/(.+)\?/);
    if (!pathMatch) {
      console.error('Could not extract path from Firebase Storage URL:', url);
      return;
    }
    
    // Decode the path (Firebase Storage URLs are URL-encoded)
    const decodedPath = decodeURIComponent(pathMatch[1]);
    const storageRef = ref(storage, decodedPath);
    
    await deleteObject(storageRef);
    console.log('Image deleted from Firebase Storage:', decodedPath);
  } catch (error) {
    console.error('Error deleting image from Firebase Storage:', error);
    // Don't throw - deletion is often optional
  }
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

