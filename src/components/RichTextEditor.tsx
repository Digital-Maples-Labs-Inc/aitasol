/**
 * Rich Text Editor Component
 * Simple rich text editor for blog content
 * Note: For production, consider using a more robust editor like react-quill or draft-js
 */

import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = 'Start writing...',
}) => {
  const [htmlMode, setHtmlMode] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.toolbar}>
        <TouchableOpacity
          style={[styles.toolbarButton, !htmlMode && styles.toolbarButtonActive]}
          onPress={() => setHtmlMode(false)}
        >
          <Text style={styles.toolbarButtonText}>Visual</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toolbarButton, htmlMode && styles.toolbarButtonActive]}
          onPress={() => setHtmlMode(true)}
        >
          <Text style={styles.toolbarButtonText}>HTML</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        multiline
        textAlignVertical="top"
        placeholderTextColor="#999"
      />
      {htmlMode && (
        <View style={styles.htmlHint}>
          <Text style={styles.htmlHintText}>
            HTML mode: You can use HTML tags like {'<p>'}, {'<h1>'}, {'<strong>'}, etc.
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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

