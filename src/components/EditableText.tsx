/**
 * Editable Text Component
 * Displays text that can be edited inline when user has editor permissions
 */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Modal } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';

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
    ? styles.heading 
    : type === 'button' 
    ? styles.button 
    : styles.paragraph;

  return (
    <>
      <TouchableOpacity
        onPress={handlePress}
        disabled={!isEditable}
        style={[styles.container, isEditable && styles.editableContainer]}
      >
        {type === 'heading' && (
          <Text style={[textStyle, style]}>{value}</Text>
        )}
        {type === 'paragraph' && (
          <Text style={[textStyle, style]}>{value}</Text>
        )}
        {type === 'button' && (
          <View style={[styles.buttonContainer, style]}>
            <Text style={textStyle}>{value}</Text>
          </View>
        )}
        {isEditable && (
          <View style={styles.editIndicator}>
            <Text style={styles.editIndicatorText}>✏️</Text>
          </View>
        )}
      </TouchableOpacity>

      <Modal visible={isEditing} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit {type}</Text>
            <TextInput
              style={[styles.textInput, type === 'heading' && styles.headingInput]}
              value={editValue}
              onChangeText={setEditValue}
              multiline={type === 'paragraph'}
              numberOfLines={type === 'paragraph' ? 4 : 1}
              autoFocus
            />
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={handleCancel}
                disabled={saving}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleSave}
                disabled={saving}
              >
                <Text style={styles.modalButtonText}>
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

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  editableContainer: {
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 4,
    padding: 4,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  paragraph: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  button: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  buttonContainer: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  editIndicator: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#007AFF',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.8,
  },
  editIndicatorText: {
    fontSize: 12,
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
    maxWidth: 500,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  headingInput: {
    fontSize: 24,
    fontWeight: 'bold',
    minHeight: 60,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
    gap: 12,
  },
  modalButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
  },
  saveButton: {
    backgroundColor: '#007AFF',
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});

