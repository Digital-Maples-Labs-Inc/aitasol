/**
 * EditableText Component Styles
 */

import { StyleSheet } from 'react-native';

export const editableTextStyles = StyleSheet.create({
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
    color: '#666',
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

