/**
 * Editable Image Component
 * Displays image that can be replaced when user has editor permissions
 */

import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Modal, Text, ActivityIndicator, Platform } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { uploadImage, compressImage } from '@/services/storageService';
import { editableImageStyles } from '@/styles/components/EditableImage.styles';

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
        style={[editableImageStyles.container, isEditable && editableImageStyles.editableContainer]}
      >
        <Image source={{ uri: src }} style={[editableImageStyles.image, style]} />
        {isEditable && (
          <View style={editableImageStyles.editIndicator}>
            <Text style={editableImageStyles.editIndicatorText}>📷</Text>
          </View>
        )}
      </TouchableOpacity>

      <Modal visible={isEditing} transparent animationType="fade">
        <View style={editableImageStyles.modalOverlay}>
          <View style={editableImageStyles.modalContent}>
            <Text style={editableImageStyles.modalTitle}>Replace Image</Text>
            {uploading ? (
              <View style={editableImageStyles.uploadingContainer}>
                <ActivityIndicator size="large" color="#007AFF" />
                <Text style={editableImageStyles.uploadingText}>Uploading image...</Text>
              </View>
            ) : (
              <>
                <TouchableOpacity
                  style={editableImageStyles.uploadButton}
                  onPress={handleImagePicker}
                >
                  <Text style={editableImageStyles.uploadButtonText}>Choose Image</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={editableImageStyles.cancelButton}
                  onPress={handleCancel}
                >
                  <Text style={editableImageStyles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
};

