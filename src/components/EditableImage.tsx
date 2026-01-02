/**
 * Editable Image Component
 * Displays image that can be replaced when user has editor permissions
 */

import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Modal, Text, ActivityIndicator, Platform } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { uploadImage, compressImage } from '@/services/storageService';

interface EditableImageProps {
  src: string;
  alt?: string;
  onSave: (newUrl: string) => Promise<void>;
  style?: any;
  editable?: boolean;
}

export const EditableImage: React.FC<EditableImageProps> = ({
  src,
  alt = '',
  onSave,
  style,
  editable = true,
}) => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);

  const isEditable = editable && (user?.role === 'admin' || user?.role === 'editor');

  const handlePress = () => {
    if (isEditable) {
      setIsEditing(true);
    }
  };

  const handleImagePicker = async () => {
    // Web-compatible image picker using HTML input
    if (typeof document === 'undefined') {
      alert('Image upload is only available on web');
      return;
    }

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = async (e: any) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setUploading(true);
      try {
        // Compress image
        const compressedBlob = await compressImage(
          file,
          1920,
          1080,
          0.8
        );

        // Save image as data URL (local assets approach)
        const fileName = `image_${Date.now()}.jpg`;
        const imageUrl = await uploadImage(compressedBlob, fileName);

        // Save to page/blog
        await onSave(imageUrl);
        setIsEditing(false);
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Failed to upload image. Please try again.');
      } finally {
        setUploading(false);
      }
    };
    
    input.click();
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <>
      <TouchableOpacity
        onPress={handlePress}
        disabled={!isEditable}
        style={[styles.container, isEditable && styles.editableContainer]}
      >
        <Image source={{ uri: src }} style={[styles.image, style]} />
        {isEditable && (
          <View style={styles.editIndicator}>
            <Text style={styles.editIndicatorText}>📷</Text>
          </View>
        )}
      </TouchableOpacity>

      <Modal visible={isEditing} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Replace Image</Text>
            {uploading ? (
              <View style={styles.uploadingContainer}>
                <ActivityIndicator size="large" color="#007AFF" />
                <Text style={styles.uploadingText}>Uploading image...</Text>
              </View>
            ) : (
              <>
                <TouchableOpacity
                  style={styles.uploadButton}
                  onPress={handleImagePicker}
                >
                  <Text style={styles.uploadButtonText}>Choose Image</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={handleCancel}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  editableContainer: {
    borderWidth: 2,
    borderColor: '#007AFF',
    borderStyle: 'dashed',
    borderRadius: 8,
    padding: 4,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  editIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#007AFF',
    borderRadius: 12,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.9,
  },
  editIndicatorText: {
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  uploadButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  cancelButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
  uploadingContainer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  uploadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
});

