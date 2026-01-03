/**
 * Admin Theme Screen
 * Manage global theme colors from admin portal
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  Alert,
} from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Theme, ThemeColors, Typography, defaultTypography } from '@/types/theme';
import {
  getAllThemes,
  saveTheme,
  setActiveTheme,
  deleteTheme,
} from '@/services/themeService';
import { useRequireAuth } from '@/hooks/useRequireAuth';

interface ColorInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const ColorInput: React.FC<ColorInputProps> = ({ label, value, onChange }) => {
  return (
    <View style={styles.colorInput}>
      <Text style={styles.colorLabel}>{label}</Text>
      <View style={styles.colorInputRow}>
        <View style={[styles.colorPreview, { backgroundColor: value }]} />
        <TextInput
          style={styles.colorTextInput}
          value={value}
          onChangeText={onChange}
          placeholder="#000000"
          autoCapitalize="none"
        />
      </View>
    </View>
  );
};

interface TypographyInputProps {
  label: string;
  fontSize: number;
  lineHeight: number;
  fontWeight?: string | number;
  onFontSizeChange: (value: number) => void;
  onLineHeightChange: (value: number) => void;
  onFontWeightChange?: (value: string) => void;
}

const TypographyInput: React.FC<TypographyInputProps> = ({
  label,
  fontSize,
  lineHeight,
  fontWeight,
  onFontSizeChange,
  onLineHeightChange,
  onFontWeightChange,
}) => {
  return (
    <View style={styles.typographyInput}>
      <Text style={styles.typographyLabel}>{label}</Text>
      <View style={styles.typographyRow}>
        <View style={styles.typographyField}>
          <Text style={styles.fieldLabel}>Size (px)</Text>
          <TextInput
            style={styles.numberInput}
            value={fontSize.toString()}
            onChangeText={(val) => onFontSizeChange(parseInt(val) || 0)}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.typographyField}>
          <Text style={styles.fieldLabel}>Line Height</Text>
          <TextInput
            style={styles.numberInput}
            value={lineHeight.toString()}
            onChangeText={(val) => onLineHeightChange(parseFloat(val) || 1.2)}
            keyboardType="numeric"
          />
        </View>
        {onFontWeightChange && (
          <View style={styles.typographyField}>
            <Text style={styles.fieldLabel}>Weight</Text>
            <TextInput
              style={styles.numberInput}
              value={fontWeight?.toString() || '400'}
              onChangeText={onFontWeightChange}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export const AdminThemeScreen: React.FC = () => {
  const { colors: currentColors, typography: currentTypography, refreshTheme } = useTheme();
  const [themes, setThemes] = useState<Theme[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTheme, setEditingTheme] = useState<Theme | null>(null);
  const [themeColors, setThemeColors] = useState<ThemeColors>(currentColors);
  const [themeTypography, setThemeTypography] = useState<Typography>(currentTypography);
  const [themeName, setThemeName] = useState('Default Theme');
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'colors' | 'typography'>('colors');

  useRequireAuth();

  useEffect(() => {
    loadThemes();
  }, []);

  const loadThemes = async () => {
    try {
      const themesData = await getAllThemes();
      setThemes(themesData);
      
      // If no themes exist, create default
      if (themesData.length === 0) {
        await createDefaultTheme();
      }
    } catch (error) {
      console.error('Error loading themes:', error);
    } finally {
      setLoading(false);
    }
  };

  const createDefaultTheme = async () => {
    try {
      const defaultTheme: Partial<Theme> & { colors: ThemeColors; typography: Typography; name: string } = {
        name: 'Default Theme',
        colors: currentColors,
        typography: currentTypography,
        isActive: true,
      };
      await saveTheme(defaultTheme);
      await loadThemes();
    } catch (error) {
      console.error('Error creating default theme:', error);
    }
  };

  const handleEditTheme = (theme: Theme) => {
    setEditingTheme(theme);
    setThemeColors(theme.colors);
    setThemeTypography(theme.typography || defaultTypography);
    setThemeName(theme.name);
  };

  const handleSaveTheme = async () => {
    if (!themeName.trim()) {
      Alert.alert('Error', 'Please enter a theme name');
      return;
    }

    setSaving(true);
    try {
      const themeData: Partial<Theme> & { colors: ThemeColors; typography: Typography; name: string } = {
        id: editingTheme?.id,
        name: themeName,
        colors: themeColors,
        typography: themeTypography,
        isActive: editingTheme?.isActive || false,
      };

      await saveTheme(themeData);
      await loadThemes();
      await refreshTheme();
      
      Alert.alert('Success', 'Theme saved successfully!');
      setEditingTheme(null);
    } catch (error) {
      console.error('Error saving theme:', error);
      Alert.alert('Error', 'Failed to save theme');
    } finally {
      setSaving(false);
    }
  };

  const handleCreateNew = () => {
    setEditingTheme(null);
    setThemeColors(currentColors);
    setThemeTypography(currentTypography);
    setThemeName('New Theme');
  };

  const handleSetActive = async (themeId: string) => {
    try {
      await setActiveTheme(themeId);
      await loadThemes();
      await refreshTheme();
      Alert.alert('Success', 'Theme activated!');
    } catch (error) {
      console.error('Error setting active theme:', error);
      Alert.alert('Error', 'Failed to activate theme');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Theme Management</Text>
        <TouchableOpacity
          style={styles.createButton}
          onPress={handleCreateNew}
        >
          <Text style={styles.createButtonText}>+ New Theme</Text>
        </TouchableOpacity>
      </View>

      {editingTheme || (!editingTheme && themes.length === 0) ? (
        <View style={styles.editSection}>
          <Text style={styles.sectionTitle}>
            {editingTheme ? 'Edit Theme' : 'Create New Theme'}
          </Text>

          <TextInput
            style={styles.nameInput}
            value={themeName}
            onChangeText={setThemeName}
            placeholder="Theme Name"
          />

          {/* Tabs */}
          <View style={styles.tabs}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'colors' && styles.tabActive]}
              onPress={() => setActiveTab('colors')}
            >
              <Text style={[styles.tabText, activeTab === 'colors' && styles.tabTextActive]}>
                Colors
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'typography' && styles.tabActive]}
              onPress={() => setActiveTab('typography')}
            >
              <Text style={[styles.tabText, activeTab === 'typography' && styles.tabTextActive]}>
                Typography
              </Text>
            </TouchableOpacity>
          </View>

          {activeTab === 'colors' ? (
          <ScrollView style={styles.colorsSection}>
            <Text style={styles.subsectionTitle}>Primary Colors</Text>
            <ColorInput
              label="Primary"
              value={themeColors.primary}
              onChange={(val) =>
                setThemeColors({ ...themeColors, primary: val })
              }
            />
            <ColorInput
              label="Primary Light"
              value={themeColors.primaryLight}
              onChange={(val) =>
                setThemeColors({ ...themeColors, primaryLight: val })
              }
            />
            <ColorInput
              label="Primary Dark"
              value={themeColors.primaryDark}
              onChange={(val) =>
                setThemeColors({ ...themeColors, primaryDark: val })
              }
            />

            <Text style={styles.subsectionTitle}>Background Colors</Text>
            <ColorInput
              label="Background"
              value={themeColors.background}
              onChange={(val) =>
                setThemeColors({ ...themeColors, background: val })
              }
            />
            <ColorInput
              label="Background Secondary"
              value={themeColors.backgroundSecondary}
              onChange={(val) =>
                setThemeColors({ ...themeColors, backgroundSecondary: val })
              }
            />
            <ColorInput
              label="Background Tertiary"
              value={themeColors.backgroundTertiary}
              onChange={(val) =>
                setThemeColors({ ...themeColors, backgroundTertiary: val })
              }
            />

            <Text style={styles.subsectionTitle}>Text Colors</Text>
            <ColorInput
              label="Text Primary"
              value={themeColors.textPrimary}
              onChange={(val) =>
                setThemeColors({ ...themeColors, textPrimary: val })
              }
            />
            <ColorInput
              label="Text Secondary"
              value={themeColors.textSecondary}
              onChange={(val) =>
                setThemeColors({ ...themeColors, textSecondary: val })
              }
            />
            <ColorInput
              label="Text Tertiary"
              value={themeColors.textTertiary}
              onChange={(val) =>
                setThemeColors({ ...themeColors, textTertiary: val })
              }
            />

            <Text style={styles.subsectionTitle}>Accent Colors</Text>
            <ColorInput
              label="Accent 1"
              value={themeColors.accent1}
              onChange={(val) =>
                setThemeColors({ ...themeColors, accent1: val })
              }
            />
            <ColorInput
              label="Accent 2"
              value={themeColors.accent2}
              onChange={(val) =>
                setThemeColors({ ...themeColors, accent2: val })
              }
            />
            <ColorInput
              label="Accent 3"
              value={themeColors.accent3}
              onChange={(val) =>
                setThemeColors({ ...themeColors, accent3: val })
              }
            />

            <Text style={styles.subsectionTitle}>UI Elements</Text>
            <ColorInput
              label="Border"
              value={themeColors.border}
              onChange={(val) =>
                setThemeColors({ ...themeColors, border: val })
              }
            />
            <ColorInput
              label="Border Light"
              value={themeColors.borderLight}
              onChange={(val) =>
                setThemeColors({ ...themeColors, borderLight: val })
              }
            />
            <ColorInput
              label="Shadow"
              value={themeColors.shadow}
              onChange={(val) =>
                setThemeColors({ ...themeColors, shadow: val })
              }
            />

            <Text style={styles.subsectionTitle}>Status Colors</Text>
            <ColorInput
              label="Success"
              value={themeColors.success}
              onChange={(val) =>
                setThemeColors({ ...themeColors, success: val })
              }
            />
            <ColorInput
              label="Warning"
              value={themeColors.warning}
              onChange={(val) =>
                setThemeColors({ ...themeColors, warning: val })
              }
            />
            <ColorInput
              label="Error"
              value={themeColors.error}
              onChange={(val) =>
                setThemeColors({ ...themeColors, error: val })
              }
            />
            <ColorInput
              label="Info"
              value={themeColors.info}
              onChange={(val) =>
                setThemeColors({ ...themeColors, info: val })
              }
            />
          </ScrollView>
          ) : (
          <ScrollView style={styles.colorsSection}>
            <Text style={styles.subsectionTitle}>Font Family</Text>
            <View style={styles.colorInput}>
              <Text style={styles.colorLabel}>Font Family</Text>
              <TextInput
                style={styles.colorTextInput}
                value={themeTypography.fontFamily}
                onChangeText={(val) =>
                  setThemeTypography({ ...themeTypography, fontFamily: val })
                }
                placeholder="Inter, sans-serif"
              />
            </View>

            <Text style={styles.subsectionTitle}>Heading Styles</Text>
            <TypographyInput
              label="H1 - Heading 1"
              fontSize={themeTypography.h1.fontSize}
              lineHeight={themeTypography.h1.lineHeight}
              fontWeight={themeTypography.h1.fontWeight}
              onFontSizeChange={(val) =>
                setThemeTypography({
                  ...themeTypography,
                  h1: { ...themeTypography.h1, fontSize: val },
                })
              }
              onLineHeightChange={(val) =>
                setThemeTypography({
                  ...themeTypography,
                  h1: { ...themeTypography.h1, lineHeight: val },
                })
              }
              onFontWeightChange={(val) =>
                setThemeTypography({
                  ...themeTypography,
                  h1: { ...themeTypography.h1, fontWeight: val },
                })
              }
            />
            <TypographyInput
              label="H2 - Heading 2"
              fontSize={themeTypography.h2.fontSize}
              lineHeight={themeTypography.h2.lineHeight}
              fontWeight={themeTypography.h2.fontWeight}
              onFontSizeChange={(val) =>
                setThemeTypography({
                  ...themeTypography,
                  h2: { ...themeTypography.h2, fontSize: val },
                })
              }
              onLineHeightChange={(val) =>
                setThemeTypography({
                  ...themeTypography,
                  h2: { ...themeTypography.h2, lineHeight: val },
                })
              }
              onFontWeightChange={(val) =>
                setThemeTypography({
                  ...themeTypography,
                  h2: { ...themeTypography.h2, fontWeight: val },
                })
              }
            />
            <TypographyInput
              label="H3 - Heading 3"
              fontSize={themeTypography.h3.fontSize}
              lineHeight={themeTypography.h3.lineHeight}
              fontWeight={themeTypography.h3.fontWeight}
              onFontSizeChange={(val) =>
                setThemeTypography({
                  ...themeTypography,
                  h3: { ...themeTypography.h3, fontSize: val },
                })
              }
              onLineHeightChange={(val) =>
                setThemeTypography({
                  ...themeTypography,
                  h3: { ...themeTypography.h3, lineHeight: val },
                })
              }
              onFontWeightChange={(val) =>
                setThemeTypography({
                  ...themeTypography,
                  h3: { ...themeTypography.h3, fontWeight: val },
                })
              }
            />
            <TypographyInput
              label="H4 - Heading 4"
              fontSize={themeTypography.h4.fontSize}
              lineHeight={themeTypography.h4.lineHeight}
              fontWeight={themeTypography.h4.fontWeight}
              onFontSizeChange={(val) =>
                setThemeTypography({
                  ...themeTypography,
                  h4: { ...themeTypography.h4, fontSize: val },
                })
              }
              onLineHeightChange={(val) =>
                setThemeTypography({
                  ...themeTypography,
                  h4: { ...themeTypography.h4, lineHeight: val },
                })
              }
              onFontWeightChange={(val) =>
                setThemeTypography({
                  ...themeTypography,
                  h4: { ...themeTypography.h4, fontWeight: val },
                })
              }
            />

            <Text style={styles.subsectionTitle}>Text Styles</Text>
            <TypographyInput
              label="Body"
              fontSize={themeTypography.body.fontSize}
              lineHeight={themeTypography.body.lineHeight}
              fontWeight={themeTypography.body.fontWeight}
              onFontSizeChange={(val) =>
                setThemeTypography({
                  ...themeTypography,
                  body: { ...themeTypography.body, fontSize: val },
                })
              }
              onLineHeightChange={(val) =>
                setThemeTypography({
                  ...themeTypography,
                  body: { ...themeTypography.body, lineHeight: val },
                })
              }
              onFontWeightChange={(val) =>
                setThemeTypography({
                  ...themeTypography,
                  body: { ...themeTypography.body, fontWeight: val },
                })
              }
            />
            <TypographyInput
              label="Quotes"
              fontSize={themeTypography.quotes.fontSize}
              lineHeight={themeTypography.quotes.lineHeight}
              fontWeight={themeTypography.quotes.fontWeight}
              onFontSizeChange={(val) =>
                setThemeTypography({
                  ...themeTypography,
                  quotes: { ...themeTypography.quotes, fontSize: val },
                })
              }
              onLineHeightChange={(val) =>
                setThemeTypography({
                  ...themeTypography,
                  quotes: { ...themeTypography.quotes, lineHeight: val },
                })
              }
              onFontWeightChange={(val) =>
                setThemeTypography({
                  ...themeTypography,
                  quotes: { ...themeTypography.quotes, fontWeight: val },
                })
              }
            />
            <TypographyInput
              label="Subtext"
              fontSize={themeTypography.subtext.fontSize}
              lineHeight={themeTypography.subtext.lineHeight}
              fontWeight={themeTypography.subtext.fontWeight}
              onFontSizeChange={(val) =>
                setThemeTypography({
                  ...themeTypography,
                  subtext: { ...themeTypography.subtext, fontSize: val },
                })
              }
              onLineHeightChange={(val) =>
                setThemeTypography({
                  ...themeTypography,
                  subtext: { ...themeTypography.subtext, lineHeight: val },
                })
              }
              onFontWeightChange={(val) =>
                setThemeTypography({
                  ...themeTypography,
                  subtext: { ...themeTypography.subtext, fontWeight: val },
                })
              }
            />
            <TypographyInput
              label="Span"
              fontSize={themeTypography.span.fontSize}
              lineHeight={themeTypography.span.lineHeight}
              fontWeight={themeTypography.span.fontWeight}
              onFontSizeChange={(val) =>
                setThemeTypography({
                  ...themeTypography,
                  span: { ...themeTypography.span, fontSize: val },
                })
              }
              onLineHeightChange={(val) =>
                setThemeTypography({
                  ...themeTypography,
                  span: { ...themeTypography.span, lineHeight: val },
                })
              }
              onFontWeightChange={(val) =>
                setThemeTypography({
                  ...themeTypography,
                  span: { ...themeTypography.span, fontWeight: val },
                })
              }
            />
          </ScrollView>
          )}

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={() => setEditingTheme(null)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.saveButton, saving && styles.buttonDisabled]}
              onPress={handleSaveTheme}
              disabled={saving}
            >
              {saving ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.saveButtonText}>Save Theme</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.themesList}>
          {themes.map((theme) => (
            <View key={theme.id} style={styles.themeCard}>
              <View style={styles.themeInfo}>
                <Text style={styles.themeName}>{theme.name}</Text>
                {theme.isActive && (
                  <View style={styles.activeBadge}>
                    <Text style={styles.activeBadgeText}>Active</Text>
                  </View>
                )}
              </View>
              <View style={styles.themeActions}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleEditTheme(theme)}
                >
                  <Text style={styles.actionButtonText}>Edit</Text>
                </TouchableOpacity>
                {!theme.isActive && (
                  <TouchableOpacity
                    style={[styles.actionButton, styles.activateButton]}
                    onPress={() => handleSetActive(theme.id)}
                  >
                    <Text style={styles.activateButtonText}>Activate</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  createButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  editSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  nameInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 24,
    backgroundColor: '#fff',
  },
  colorsSection: {
    maxHeight: 600,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 12,
    color: '#333',
  },
  colorInput: {
    marginBottom: 16,
  },
  colorLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    color: '#666',
  },
  colorInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  colorPreview: {
    width: 40,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  colorTextInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    backgroundColor: '#fff',
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: '#007AFF',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#007AFF',
    fontWeight: '600',
  },
  typographyInput: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  typographyLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  typographyRow: {
    flexDirection: 'row',
    gap: 12,
  },
  typographyField: {
    flex: 1,
  },
  fieldLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 6,
  },
  numberInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 10,
    fontSize: 14,
    backgroundColor: '#fff',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  cancelButtonText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#007AFF',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  themesList: {
    padding: 20,
  },
  themeCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  themeInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  themeName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  activeBadge: {
    backgroundColor: '#d4edda',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  activeBadgeText: {
    color: '#155724',
    fontSize: 12,
    fontWeight: '600',
  },
  themeActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#007AFF',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  activateButton: {
    backgroundColor: '#28a745',
  },
  activateButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});

