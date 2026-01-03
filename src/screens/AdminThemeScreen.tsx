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
import { Theme, ThemeColors } from '@/types/theme';
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

export const AdminThemeScreen: React.FC = () => {
  const { colors: currentColors, refreshTheme } = useTheme();
  const [themes, setThemes] = useState<Theme[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTheme, setEditingTheme] = useState<Theme | null>(null);
  const [themeColors, setThemeColors] = useState<ThemeColors>(currentColors);
  const [themeName, setThemeName] = useState('Default Theme');
  const [saving, setSaving] = useState(false);

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
      const defaultTheme: Partial<Theme> & { colors: ThemeColors; name: string } = {
        name: 'Default Theme',
        colors: currentColors,
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
    setThemeName(theme.name);
  };

  const handleSaveTheme = async () => {
    if (!themeName.trim()) {
      Alert.alert('Error', 'Please enter a theme name');
      return;
    }

    setSaving(true);
    try {
      const themeData: Partial<Theme> & { colors: ThemeColors; name: string } = {
        id: editingTheme?.id,
        name: themeName,
        colors: themeColors,
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

  const handleCreateNew = () => {
    setEditingTheme(null);
    setThemeColors(currentColors);
    setThemeName('New Theme');
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

