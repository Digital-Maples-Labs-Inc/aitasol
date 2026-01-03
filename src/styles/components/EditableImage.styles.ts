/**
 * EditableImage Component Styles
 */

import { StyleSheet } from 'react-native';

export const editableImageStyles = StyleSheet.create({
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

