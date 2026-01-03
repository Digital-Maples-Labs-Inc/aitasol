/**
 * Rich Text Editor Component
 * Simple rich text editor for blog content
 * Note: For production, consider using a more robust editor like react-quill or draft-js
 */

import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { richTextEditorStyles } from '@/styles/components/RichTextEditor.styles';

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
    <View style={richTextEditorStyles.container}>
      <View style={richTextEditorStyles.toolbar}>
        <TouchableOpacity
          style={[richTextEditorStyles.toolbarButton, !htmlMode && richTextEditorStyles.toolbarButtonActive]}
          onPress={() => setHtmlMode(false)}
        >
          <Text style={richTextEditorStyles.toolbarButtonText}>Visual</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[richTextEditorStyles.toolbarButton, htmlMode && richTextEditorStyles.toolbarButtonActive]}
          onPress={() => setHtmlMode(true)}
        >
          <Text style={richTextEditorStyles.toolbarButtonText}>HTML</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={richTextEditorStyles.input}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        multiline
        textAlignVertical="top"
        placeholderTextColor="#999"
      />
      {htmlMode && (
        <View style={richTextEditorStyles.htmlHint}>
          <Text style={richTextEditorStyles.htmlHintText}>
            HTML mode: You can use HTML tags like {'<p>'}, {'<h1>'}, {'<strong>'}, etc.
          </Text>
        </View>
      )}
    </View>
  );
};

