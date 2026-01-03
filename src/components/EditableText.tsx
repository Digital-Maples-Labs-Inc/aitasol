/**
 * Editable Text Component
 * Displays text that can be edited inline when user has editor permissions
 */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Modal } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { editableTextStyles } from '@/styles/components/EditableText.styles';

interface EditableTextProps {
  value: string;
  onSave: (newValue: string) => Promise<void>;
  type?: 'heading' | 'paragraph' | 'button';
  style?: any;
  editable?: boolean;
}

export const EditableText: React.FC<EditableTextProps> = ({
  value,
  onSave,
  type = 'paragraph',
  style,
  editable = true,
}) => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const [saving, setSaving] = useState(false);

  const isEditable = editable && (user?.role === 'admin' || user?.role === 'editor');

  const handlePress = () => {
    if (isEditable) {
      setIsEditing(true);
      setEditValue(value);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave(editValue);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving text:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditValue(value);
  };

  const textStyle = type === 'heading' 
    ? editableTextStyles.heading 
    : type === 'button' 
    ? editableTextStyles.button 
    : editableTextStyles.paragraph;

  return (
    <>
      <TouchableOpacity
        onPress={handlePress}
        disabled={!isEditable}
        style={[editableTextStyles.container, isEditable && editableTextStyles.editableContainer]}
      >
        {type === 'heading' && (
          <Text style={[textStyle, style]}>{value}</Text>
        )}
        {type === 'paragraph' && (
          <Text style={[textStyle, style]}>{value}</Text>
        )}
        {type === 'button' && (
          <View style={[editableTextStyles.buttonContainer, style]}>
            <Text style={textStyle}>{value}</Text>
          </View>
        )}
        {isEditable && (
          <View style={editableTextStyles.editIndicator}>
            <Text style={editableTextStyles.editIndicatorText}>✏️</Text>
          </View>
        )}
      </TouchableOpacity>

      <Modal visible={isEditing} transparent animationType="fade">
        <View style={editableTextStyles.modalOverlay}>
          <View style={editableTextStyles.modalContent}>
            <Text style={editableTextStyles.modalTitle}>Edit {type}</Text>
            <TextInput
              style={[editableTextStyles.textInput, type === 'heading' && editableTextStyles.headingInput]}
              value={editValue}
              onChangeText={setEditValue}
              multiline={type === 'paragraph'}
              numberOfLines={type === 'paragraph' ? 4 : 1}
              autoFocus
            />
            <View style={editableTextStyles.modalActions}>
              <TouchableOpacity
                style={[editableTextStyles.modalButton, editableTextStyles.cancelButton]}
                onPress={handleCancel}
                disabled={saving}
              >
                <Text style={editableTextStyles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[editableTextStyles.modalButton, editableTextStyles.saveButton]}
                onPress={handleSave}
                disabled={saving}
              >
                <Text style={editableTextStyles.modalButtonText}>
                  {saving ? 'Saving...' : 'Save'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

