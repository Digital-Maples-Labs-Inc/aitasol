/**
 * RichTextEditor Component Styles
 */

import { StyleSheet } from 'react-native';

export const richTextEditorStyles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
  },
  toolbar: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  toolbarButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRightWidth: 1,
    borderRightColor: '#ddd',
  },
  toolbarButtonActive: {
    backgroundColor: '#007AFF',
  },
  toolbarButtonText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  input: {
    minHeight: 300,
    padding: 12,
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
  },
  htmlHint: {
    backgroundColor: '#fff3cd',
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  htmlHintText: {
    fontSize: 12,
    color: '#856404',
  },
});

