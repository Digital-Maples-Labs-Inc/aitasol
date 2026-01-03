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
import { useAuth } from '@/contexts/AuthContext';
import { Layout } from '@/components/Layout';
import { adminThemeScreenStyles } from '@/styles/screens/AdminThemeScreen.styles';

interface ColorInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const ColorInput: React.FC<ColorInputProps> = ({ label, value, onChange }) => {
  return (
    <View style={adminThemeScreenStyles.colorInput}>
      <Text style={adminThemeScreenStyles.colorLabel}>{label}</Text>
      <View style={adminThemeScreenStyles.colorInputRow}>
        <View style={[adminThemeScreenStyles.colorPreview, { backgroundColor: value }]} />
        <TextInput
          style={adminThemeScreenStyles.colorTextInput}
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
    <View style={adminThemeScreenStyles.typographyInput}>
      <Text style={adminThemeScreenStyles.typographyLabel}>{label}</Text>
      <View style={adminThemeScreenStyles.typographyRow}>
        <View style={adminThemeScreenStyles.typographyField}>
          <Text style={adminThemeScreenStyles.fieldLabel}>Size (px)</Text>
          <TextInput
            style={adminThemeScreenStyles.numberInput}
            value={fontSize.toString()}
            onChangeText={(val) => onFontSizeChange(parseInt(val) || 0)}
            keyboardType="numeric"
          />
        </View>
        <View style={adminThemeScreenStyles.typographyField}>
          <Text style={adminThemeScreenStyles.fieldLabel}>Line Height</Text>
          <TextInput
            style={adminThemeScreenStyles.numberInput}
            value={lineHeight.toString()}
            onChangeText={(val) => onLineHeightChange(parseFloat(val) || 1.2)}
            keyboardType="numeric"
          />
        </View>
        {onFontWeightChange && (
          <View style={adminThemeScreenStyles.typographyField}>
            <Text style={adminThemeScreenStyles.fieldLabel}>Weight</Text>
            <TextInput
              style={adminThemeScreenStyles.numberInput}
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
  const { user } = useAuth();
  const [themes, setThemes] = useState<Theme[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTheme, setEditingTheme] = useState<Theme | null>(null);
  const [themeColors, setThemeColors] = useState<ThemeColors>(currentColors);
  const [themeTypography, setThemeTypography] = useState<Typography>(currentTypography);
  const [themeName, setThemeName] = useState('Default Theme');
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'colors' | 'typography'>('colors');

  useRequireAuth('admin');

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

      // Debug: Log user info before saving
      console.log('Saving theme - User info:', {
        uid: user?.uid,
        email: user?.email,
        role: user?.role,
        isAdmin: user?.role === 'admin',
      });

      await saveTheme(themeData);
      await loadThemes();
      await refreshTheme();
      
      Alert.alert('Success', 'Theme saved successfully!');
      setEditingTheme(null);
    } catch (error: any) {
      console.error('Error saving theme:', error);
      console.error('Error details:', {
        code: error?.code,
        message: error?.message,
        userRole: user?.role,
        userUid: user?.uid,
      });
      
      const errorMessage = error?.message || 'Failed to save theme';
      let detailedMessage = errorMessage;
      
      if (error?.code === 'permission-denied') {
        detailedMessage = `Permission denied.\n\nPlease ensure:\n1. You are logged in as admin (current role: ${user?.role || 'unknown'})\n2. Your user document exists in Firestore with role: "admin"\n3. Try signing out and signing back in to refresh your token\n4. Check browser console for more details`;
      }
      
      Alert.alert('Error', detailedMessage);
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
      <Layout>
        <View style={adminThemeScreenStyles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      </Layout>
    );
  }

  return (
    <Layout>
      <ScrollView style={adminThemeScreenStyles.container}>
      <View style={adminThemeScreenStyles.header}>
        <Text style={adminThemeScreenStyles.title}>Theme Management</Text>
        <TouchableOpacity
          style={adminThemeScreenStyles.createButton}
          onPress={handleCreateNew}
        >
          <Text style={adminThemeScreenStyles.createButtonText}>+ New Theme</Text>
        </TouchableOpacity>
      </View>

      {editingTheme || (!editingTheme && themes.length === 0) ? (
        <View style={adminThemeScreenStyles.editSection}>
          <Text style={adminThemeScreenStyles.sectionTitle}>
            {editingTheme ? 'Edit Theme' : 'Create New Theme'}
          </Text>

          <TextInput
            style={adminThemeScreenStyles.nameInput}
            value={themeName}
            onChangeText={setThemeName}
            placeholder="Theme Name"
          />

          {/* Tabs */}
          <View style={adminThemeScreenStyles.tabs}>
            <TouchableOpacity
              style={[adminThemeScreenStyles.tab, activeTab === 'colors' && adminThemeScreenStyles.tabActive]}
              onPress={() => setActiveTab('colors')}
            >
              <Text style={[adminThemeScreenStyles.tabText, activeTab === 'colors' && adminThemeScreenStyles.tabTextActive]}>
                Colors
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[adminThemeScreenStyles.tab, activeTab === 'typography' && adminThemeScreenStyles.tabActive]}
              onPress={() => setActiveTab('typography')}
            >
              <Text style={[adminThemeScreenStyles.tabText, activeTab === 'typography' && adminThemeScreenStyles.tabTextActive]}>
                Typography
              </Text>
            </TouchableOpacity>
          </View>

          {activeTab === 'colors' ? (
          <ScrollView style={adminThemeScreenStyles.colorsSection}>
            <Text style={adminThemeScreenStyles.subsectionTitle}>Primary Colors</Text>
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

            <Text style={adminThemeScreenStyles.subsectionTitle}>Background Colors</Text>
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

            <Text style={adminThemeScreenStyles.subsectionTitle}>Text Colors</Text>
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

            <Text style={adminThemeScreenStyles.subsectionTitle}>Accent Colors</Text>
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

            <Text style={adminThemeScreenStyles.subsectionTitle}>UI Elements</Text>
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

            <Text style={adminThemeScreenStyles.subsectionTitle}>Status Colors</Text>
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
          <ScrollView style={adminThemeScreenStyles.colorsSection}>
            <Text style={adminThemeScreenStyles.subsectionTitle}>Font Family</Text>
            <View style={adminThemeScreenStyles.colorInput}>
              <Text style={adminThemeScreenStyles.colorLabel}>Font Family</Text>
              <TextInput
                style={adminThemeScreenStyles.colorTextInput}
                value={themeTypography.fontFamily}
                onChangeText={(val) =>
                  setThemeTypography({ ...themeTypography, fontFamily: val })
                }
                placeholder="Inter, sans-serif"
              />
            </View>

            <Text style={adminThemeScreenStyles.subsectionTitle}>Heading Styles</Text>
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

            <Text style={adminThemeScreenStyles.subsectionTitle}>Text Styles</Text>
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

          <View style={adminThemeScreenStyles.buttonRow}>
            <TouchableOpacity
              style={[adminThemeScreenStyles.button, adminThemeScreenStyles.cancelButton]}
              onPress={() => setEditingTheme(null)}
            >
              <Text style={adminThemeScreenStyles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[adminThemeScreenStyles.button, adminThemeScreenStyles.saveButton, saving && adminThemeScreenStyles.buttonDisabled]}
              onPress={handleSaveTheme}
              disabled={saving}
            >
              {saving ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={adminThemeScreenStyles.saveButtonText}>Save Theme</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={adminThemeScreenStyles.themesList}>
          {themes.map((theme) => (
            <View key={theme.id} style={adminThemeScreenStyles.themeCard}>
              <View style={adminThemeScreenStyles.themeInfo}>
                <Text style={adminThemeScreenStyles.themeName}>{theme.name}</Text>
                {theme.isActive && (
                  <View style={adminThemeScreenStyles.activeBadge}>
                    <Text style={adminThemeScreenStyles.activeBadgeText}>Active</Text>
                  </View>
                )}
              </View>
              <View style={adminThemeScreenStyles.themeActions}>
                <TouchableOpacity
                  style={adminThemeScreenStyles.actionButton}
                  onPress={() => handleEditTheme(theme)}
                >
                  <Text style={adminThemeScreenStyles.actionButtonText}>Edit</Text>
                </TouchableOpacity>
                {!theme.isActive && (
                  <TouchableOpacity
                    style={[adminThemeScreenStyles.actionButton, adminThemeScreenStyles.activateButton]}
                    onPress={() => handleSetActive(theme.id)}
                  >
                    <Text style={adminThemeScreenStyles.activateButtonText}>Activate</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
    </Layout>
  );
};


