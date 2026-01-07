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
  Image,
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
import { adminThemeScreenStyles } from '@/styles/screens/AdminThemeScreen.styles';
import { usePageData } from '@/hooks/usePageData';
import { PageSection } from '@/types';
import { uploadImage, compressImage } from '@/services/storageService';

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
  const { page: homePage, loading: pageLoading, getSection, updateSectionImage, updateSectionContent, updateSection } = usePageData('home');
  const [themes, setThemes] = useState<Theme[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTheme, setEditingTheme] = useState<Theme | null>(null);
  const [themeColors, setThemeColors] = useState<ThemeColors>(currentColors);
  const [themeTypography, setThemeTypography] = useState<Typography>(currentTypography);
  const [themeName, setThemeName] = useState('Default Theme');
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'colors' | 'typography'>('colors');
  const [logoUrl, setLogoUrl] = useState('');
  const [logoUploading, setLogoUploading] = useState(false);
  const [slides, setSlides] = useState<any[]>([]);
  const [slidesLoading, setSlidesLoading] = useState(false);

  useRequireAuth('admin');

  useEffect(() => {
    loadThemes();
  }, []);

  // Default slide data matching the HeroSlider component
  const defaultSlides = [
    {
      id: 'hero-slide-1',
      title: 'Welcome to AITAHSOLUTIONS',
      subtitle: 'Your Bridge to Global Learning',
      description: 'Expert educational consultancy services to help you achieve your academic dreams in Canada and beyond.',
      active: true,
    },
    {
      id: 'hero-slide-2',
      title: 'Study in Canada',
      subtitle: 'World-Class Education Awaits',
      description: 'Navigate your path to Canadian universities with our comprehensive support and guidance.',
      active: true,
    },
    {
      id: 'hero-slide-3',
      title: 'Immigration & Study Permits',
      subtitle: 'Your Journey Starts Here',
      description: 'Professional assistance with visa applications and study permit processes.',
      active: true,
    },
    {
      id: 'hero-slide-4',
      title: '',
      subtitle: '',
      description: '',
      active: false,
    },
    {
      id: 'hero-slide-5',
      title: '',
      subtitle: '',
      description: '',
      active: false,
    },
  ];

  useEffect(() => {
    if (!homePage || !homePage.sections) return;
    
    const logoSection = homePage.sections.find((s) => s.id === 'site-logo');
    const currentLogoUrl = logoSection?.metadata?.imageUrl || logoSection?.content || '';
    setLogoUrl(currentLogoUrl);
    
    // Load slides from homePage sections
    const loadedSlides = [];
    for (let i = 1; i <= 5; i++) {
      const slideSection = homePage.sections.find((s) => s.id === `hero-slide-${i}`);
      const defaultSlide = defaultSlides[i - 1];
      
      if (slideSection) {
        // Use data from Firestore, but fallback to defaults if fields are empty
        loadedSlides.push({
          id: `hero-slide-${i}`,
          index: i,
          imageUrl: slideSection.metadata?.imageUrl || slideSection.content || '',
          title: slideSection.metadata?.title || defaultSlide?.title || '',
          subtitle: slideSection.metadata?.subtitle || defaultSlide?.subtitle || '',
          description: slideSection.metadata?.description || defaultSlide?.description || '',
          active: slideSection.metadata?.active !== false, // Default to true if not set
        });
      } else {
        // Use default slide data if section doesn't exist
        loadedSlides.push({
          id: `hero-slide-${i}`,
          index: i,
          imageUrl: '',
          title: defaultSlide?.title || '',
          subtitle: defaultSlide?.subtitle || '',
          description: defaultSlide?.description || '',
          active: defaultSlide?.active !== false,
        });
      }
    }
    setSlides(loadedSlides);
  }, [homePage?.id]);

  const loadSlides = () => {
    if (!homePage?.sections) return;
    
    const loadedSlides = [];
    for (let i = 1; i <= 5; i++) {
      const slideSection = homePage.sections.find((s) => s.id === `hero-slide-${i}`);
      const defaultSlide = defaultSlides[i - 1];
      
      if (slideSection) {
        // Use data from Firestore, but fallback to defaults if fields are empty
        loadedSlides.push({
          id: `hero-slide-${i}`,
          index: i,
          imageUrl: slideSection.metadata?.imageUrl || slideSection.content || '',
          title: slideSection.metadata?.title || defaultSlide?.title || '',
          subtitle: slideSection.metadata?.subtitle || defaultSlide?.subtitle || '',
          description: slideSection.metadata?.description || defaultSlide?.description || '',
          active: slideSection.metadata?.active !== false, // Default to true if not set
        });
      } else {
        // Use default slide data if section doesn't exist
        loadedSlides.push({
          id: `hero-slide-${i}`,
          index: i,
          imageUrl: '',
          title: defaultSlide?.title || '',
          subtitle: defaultSlide?.subtitle || '',
          description: defaultSlide?.description || '',
          active: defaultSlide?.active !== false,
        });
      }
    }
    setSlides(loadedSlides);
  };

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

  const handleLogoFileUpload = () => {
    if (typeof document === 'undefined') {
      Alert.alert('Error', 'File upload is only available on web');
      return;
    }

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = async (e: any) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // Check if user is authenticated
      if (!user) {
        Alert.alert('Error', 'You must be logged in to upload images. Please sign in and try again.');
        return;
      }

      setLogoUploading(true);
      try {
        // Compress the image before uploading
        const compressedBlob = await compressImage(file, 800, 400, 0.9);
        
        // Generate a unique filename
        const fileExtension = file.name.split('.').pop() || 'png';
        const fileName = `site-logo-${Date.now()}.${fileExtension}`;
        
        console.log('Uploading logo to Firebase Storage:', {
          fileName,
          folder: 'logos',
          user: user.email,
          userId: user.uid,
          role: user.role,
        });
        
        // Upload to Firebase Storage
        const downloadURL = await uploadImage(compressedBlob, fileName, 'logos');
        
        console.log('Logo uploaded successfully:', downloadURL);
        
        // Save the Firebase Storage URL to Firestore
        await handleSaveLogo(downloadURL);
      } catch (error: any) {
        console.error('Error uploading logo:', error);
        let errorMessage = 'Unknown error';
        
        if (error?.code === 'storage/unauthorized') {
          errorMessage = 'Permission denied. Please ensure:\n1. You are logged in as admin/editor\n2. Your user document exists in Firestore with the correct role\n3. Try signing out and back in';
        } else if (error?.message) {
          errorMessage = error.message;
        }
        
        Alert.alert('Error', `Failed to upload logo: ${errorMessage}`);
        setLogoUploading(false);
      }
    };
    
    input.click();
  };

  const handleSaveLogo = async (url: string) => {
    if (!url) {
      Alert.alert('Error', 'Please provide a logo URL or upload an image');
      return;
    }

    setLogoUploading(true);
    try {
      const logoSection = getSection('site-logo') || {
        id: 'site-logo',
        content: '',
        type: 'image' as const,
        metadata: { imageUrl: '', imageAlt: 'AITAHSOLUTIONS Educational Consultancy Logo' },
      };
      
      await updateSectionImage(logoSection.id, url, logoSection.metadata?.imageAlt);
      setLogoUrl(url);
      Alert.alert('Success', 'Logo updated successfully!');
    } catch (error) {
      console.error('Error saving logo:', error);
      Alert.alert('Error', 'Failed to save logo. Please try again.');
    } finally {
      setLogoUploading(false);
    }
  };

  const handleSlideImageUpload = async (slideIndex: number) => {
    if (typeof document === 'undefined') {
      Alert.alert('Error', 'File upload is only available on web');
      return;
    }

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = async (e: any) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // Check file size (max 5MB)
      const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes
      if (file.size > MAX_FILE_SIZE) {
        Alert.alert(
          'File Too Large',
          `Image size is ${(file.size / 1024 / 1024).toFixed(2)}MB. Maximum file size is 5MB. Please compress or resize your image.`
        );
        return;
      }

      // Check if user is authenticated
      if (!user) {
        Alert.alert('Error', 'You must be logged in to upload images. Please sign in and try again.');
        return;
      }

      // Verify user role
      if (user.role !== 'admin' && user.role !== 'editor') {
        Alert.alert('Error', `You don't have permission to upload images. Your role: ${user.role || 'none'}. Please contact an administrator.`);
        return;
      }

      setSlidesLoading(true);
      try {
        // Compress the image before uploading
        const compressedBlob = await compressImage(file, 1920, 1080, 0.8);
        
        // Generate a unique filename
        const slide = slides[slideIndex];
        const fileExtension = file.name.split('.').pop() || 'jpg';
        const fileName = `hero-slide-${slide.index}-${Date.now()}.${fileExtension}`;
        
        console.log('Uploading image to Firebase Storage:', {
          fileName,
          folder: 'hero-slider',
          user: user.email,
          userId: user.uid,
          role: user.role,
          blobSize: compressedBlob.size,
        });
        
        // Upload to Firebase Storage
        const downloadURL = await uploadImage(compressedBlob, fileName, 'hero-slider');
        
        console.log('Image uploaded successfully to Firebase Storage:', downloadURL);
        
        // Save the Firebase Storage URL to Firestore
        console.log('Calling handleSaveSlideImage with URL:', downloadURL);
        await handleSaveSlideImage(slideIndex, downloadURL);
        console.log('handleSaveSlideImage completed');
      } catch (error: any) {
        console.error('Error uploading slide image:', error);
        let errorMessage = 'Unknown error';
        
        if (error?.code === 'storage/unauthorized') {
          errorMessage = `Permission denied (storage/unauthorized).\n\nPlease verify:\n1. You are logged in as ${user?.role || 'unknown'}\n2. Your user document exists in Firestore at /users/${user?.uid}\n3. Your user document has role: "admin" or "editor"\n4. Try signing out and back in to refresh your token\n\nCheck the browser console for more details.`;
        } else if (error?.code === 'storage/object-not-found') {
          errorMessage = 'Storage bucket not found. Please check your Firebase Storage configuration.';
        } else if (error?.message) {
          errorMessage = error.message;
        }
        
        Alert.alert('Error', `Failed to upload image: ${errorMessage}`);
        setSlidesLoading(false);
      }
    };
    
    input.click();
  };

  const handleSaveSlideImage = async (slideIndex: number, imageUrl: string) => {
    if (!imageUrl || imageUrl.trim() === '') {
      Alert.alert('Error', 'Please provide a valid image URL');
      return;
    }

    setSlidesLoading(true);
    try {
      const slide = slides[slideIndex];
      if (!slide || !slide.id) {
        throw new Error('Invalid slide data');
      }

      const slideSection = getSection(slide.id) || {
        id: slide.id,
        content: '',
        type: 'image' as const,
        metadata: { imageUrl: '', title: '', subtitle: '', description: '', active: true },
      };
      
      // Update the slide with new image and ensure it's active
      const updatedSlide = { ...slide, imageUrl, active: true }; // Auto-activate when image is uploaded
      const updatedSlides = [...slides];
      updatedSlides[slideIndex] = updatedSlide;
      setSlides(updatedSlides);
      
      // Prepare metadata - only include valid Firestore-compatible types
      const updatedMetadata: Record<string, any> = {
        imageUrl: String(imageUrl || ''),
        title: String(updatedSlide.title || slideSection.metadata?.title || ''),
        subtitle: String(updatedSlide.subtitle || slideSection.metadata?.subtitle || ''),
        description: String(updatedSlide.description || slideSection.metadata?.description || ''),
        active: Boolean(true), // Auto-activate slide when image is uploaded
      };
      
      // Clean the section data - only include valid PageSection properties
      const cleanSection: Partial<PageSection> = {
        id: slide.id,
        type: slideSection.type || 'image',
        content: String(imageUrl || ''),
        editable: slideSection.editable !== false,
        metadata: updatedMetadata,
      };
      
      console.log('Saving slide data to Firestore:', {
        slideId: slide.id,
        imageUrl,
        metadata: updatedMetadata,
        cleanSection,
      });
      
      // Update the section with new image and metadata
      await updateSection(slide.id, cleanSection);
      
      console.log('Slide data saved to Firestore successfully');
      
      // Reload slides from Firestore to ensure sync (but don't wait for it)
      setTimeout(() => {
        loadSlides();
      }, 500);
      
      Alert.alert('Success', 'Slide image saved successfully! The slide is now active and will appear on the website. Refresh the page to see it in the hero slider.');
    } catch (error: any) {
      console.error('Error saving slide image to Firestore:', error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error('Full error details:', {
        code: error?.code,
        message: error?.message,
        stack: error?.stack,
      });
      Alert.alert('Error', `Failed to save slide image: ${errorMessage}`);
      // Revert local state on error
      loadSlides();
    } finally {
      setSlidesLoading(false);
    }
  };

  const handleSaveSlideData = async (slideIndex: number, field: string, value: string | boolean) => {
    setSlidesLoading(true);
    try {
      const slide = slides[slideIndex];
      const slideSection = getSection(slide.id) || {
        id: slide.id,
        content: slide.imageUrl || '',
        type: 'image' as const,
        metadata: {},
      };
      
      // Update the slide data
      const updatedSlide = { ...slide, [field]: value };
      const updatedSlides = [...slides];
      updatedSlides[slideIndex] = updatedSlide;
      setSlides(updatedSlides);
      
      // Prepare metadata - only include valid Firestore-compatible types
      const updatedMetadata: Record<string, any> = {
        imageUrl: String(updatedSlide.imageUrl || slideSection.metadata?.imageUrl || ''),
        title: String(updatedSlide.title || ''),
        subtitle: String(updatedSlide.subtitle || ''),
        description: String(updatedSlide.description || ''),
        active: Boolean(updatedSlide.active !== false),
      };
      
      // Clean the section data - only include valid PageSection properties
      const cleanSection: Partial<PageSection> = {
        id: slide.id,
        type: slideSection.type || 'image',
        content: String(updatedSlide.imageUrl || slideSection.content || ''),
        editable: slideSection.editable !== false,
        metadata: updatedMetadata,
      };
      
      // Update the section with new metadata
      await updateSection(slide.id, cleanSection);
      
      Alert.alert('Success', 'Slide updated successfully!');
    } catch (error) {
      console.error('Error saving slide data:', error);
      Alert.alert('Error', 'Failed to save slide. Please try again.');
      // Revert local state on error
      loadSlides();
    } finally {
      setSlidesLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={adminThemeScreenStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
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

      {/* Site Logo Upload Section */}
      <View style={adminThemeScreenStyles.editSection}>
        <Text style={adminThemeScreenStyles.sectionTitle}>Site Logo</Text>
        <Text style={[adminThemeScreenStyles.colorLabel, { marginBottom: 16 }]}>
          Upload or enter the URL for your website logo. This logo will appear in the header and footer.
        </Text>
        
        {logoUrl ? (
          <View style={{ marginBottom: 16, alignItems: 'center' }}>
            <Image
              source={{ uri: logoUrl }}
              resizeMode="contain"
              style={{
                width: 200,
                height: 100,
                borderWidth: 1,
                borderColor: '#ddd',
                borderRadius: 8,
                padding: 8,
              }}
            />
          </View>
        ) : null}

        <View style={adminThemeScreenStyles.colorInput}>
          <Text style={adminThemeScreenStyles.colorLabel}>Logo URL</Text>
          <TextInput
            style={adminThemeScreenStyles.colorTextInput}
            value={logoUrl}
            onChangeText={setLogoUrl}
            placeholder="https://example.com/logo.png or upload an image"
            autoCapitalize="none"
          />
        </View>

        <View style={{ flexDirection: 'row', gap: 12, marginTop: 12 }}>
          <TouchableOpacity
            style={[adminThemeScreenStyles.button, adminThemeScreenStyles.saveButton, logoUploading && adminThemeScreenStyles.buttonDisabled]}
            onPress={handleLogoFileUpload}
            disabled={logoUploading}
          >
            {logoUploading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={adminThemeScreenStyles.saveButtonText}>Upload Image</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={[adminThemeScreenStyles.button, adminThemeScreenStyles.saveButton, logoUploading && adminThemeScreenStyles.buttonDisabled]}
            onPress={() => handleSaveLogo(logoUrl)}
            disabled={logoUploading || !logoUrl}
          >
            {logoUploading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={adminThemeScreenStyles.saveButtonText}>Save Logo</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Hero Slider Management Section */}
      <View style={adminThemeScreenStyles.editSection}>
        <Text style={adminThemeScreenStyles.sectionTitle}>Hero Slider Management</Text>
        <Text style={[adminThemeScreenStyles.colorLabel, { marginBottom: 16 }]}>
          Manage the hero slider slides. Upload images, edit content, and activate or deactivate slides.
        </Text>
        
        {slides.map((slide, slideIndex) => (
          <View
            key={slide.id}
            style={{
              marginBottom: 24,
              padding: 16,
              borderWidth: 1,
              borderColor: '#ddd',
              borderRadius: 8,
              backgroundColor: slide.active ? '#f9f9f9' : '#f0f0f0',
            }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <Text style={[adminThemeScreenStyles.sectionTitle, { fontSize: 18 }]}>
                Slide {slide.index}
              </Text>
              <TouchableOpacity
                style={[
                  {
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    borderRadius: 4,
                    backgroundColor: slide.active ? '#4CAF50' : '#9E9E9E',
                  },
                ]}
                onPress={() => handleSaveSlideData(slideIndex, 'active', !slide.active)}
                disabled={slidesLoading}
              >
                <Text style={{ color: '#fff', fontWeight: '600' }}>
                  {slide.active ? 'Active' : 'Inactive'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Slide Image */}
            <View style={{ marginBottom: 12 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                <Text style={adminThemeScreenStyles.colorLabel}>Slide Image</Text>
                <View
                  style={{
                    marginLeft: 8,
                    backgroundColor: '#E3F2FD',
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                    borderRadius: 4,
                    borderWidth: 1,
                    borderColor: '#90CAF9',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 11,
                      color: '#1976D2',
                      fontWeight: '600',
                    }}
                  >
                    Recommended: 1920x1080px (16:9) • Max: 5MB
                  </Text>
                </View>
              </View>
              <View style={{ marginBottom: 8 }}>
                <Text
                  style={{
                    fontSize: 12,
                    color: '#666',
                    fontStyle: 'italic',
                  }}
                >
                  Best dimensions: 1920x1080 pixels with 16:9 aspect ratio. Maximum file size: 5MB per image.
                </Text>
              </View>
              {slide.imageUrl ? (
                <View style={{ marginBottom: 8, alignItems: 'center' }}>
                  <Image
                    source={{ uri: slide.imageUrl }}
                    resizeMode="cover"
                    style={{
                      width: '100%',
                      height: 200,
                      borderWidth: 1,
                      borderColor: '#ddd',
                      borderRadius: 8,
                    }}
                  />
                </View>
              ) : (
                <View
                  style={{
                    width: '100%',
                    height: 200,
                    borderWidth: 1,
                    borderColor: '#ddd',
                    borderRadius: 8,
                    backgroundColor: '#f5f5f5',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 8,
                  }}
                >
                  <Text style={{ color: '#999' }}>No image</Text>
                </View>
              )}
              <View style={{ flexDirection: 'row', gap: 8 }}>
                <TouchableOpacity
                  style={[
                    adminThemeScreenStyles.button,
                    { flex: 1, backgroundColor: '#007AFF' },
                    slidesLoading && adminThemeScreenStyles.buttonDisabled,
                  ]}
                  onPress={() => handleSlideImageUpload(slideIndex)}
                  disabled={slidesLoading}
                >
                  {slidesLoading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={adminThemeScreenStyles.saveButtonText}>Upload Image</Text>
                  )}
                </TouchableOpacity>
                {slide.imageUrl && (
                  <TouchableOpacity
                    style={[
                      adminThemeScreenStyles.button,
                      adminThemeScreenStyles.saveButton,
                      slidesLoading && adminThemeScreenStyles.buttonDisabled,
                    ]}
                    onPress={() => handleSaveSlideData(slideIndex, 'imageUrl', slide.imageUrl)}
                    disabled={slidesLoading || !slide.imageUrl}
                  >
                    {slidesLoading ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      <Text style={adminThemeScreenStyles.saveButtonText}>Save</Text>
                    )}
                  </TouchableOpacity>
                )}
              </View>
              <TextInput
                style={[adminThemeScreenStyles.colorTextInput, { marginTop: 8 }]}
                value={slide.imageUrl}
                onChangeText={(text) => {
                  const updatedSlides = [...slides];
                  updatedSlides[slideIndex] = { ...updatedSlides[slideIndex], imageUrl: text };
                  setSlides(updatedSlides);
                }}
                onBlur={() => {
                  if (slide.imageUrl) {
                    handleSaveSlideData(slideIndex, 'imageUrl', slide.imageUrl);
                  }
                }}
                placeholder="Or enter image URL"
                autoCapitalize="none"
              />
              {slide.imageUrl && !slide.active && (
                <View style={{ marginTop: 4 }}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: '#FF9800',
                      fontStyle: 'italic',
                    }}
                  >
                    Note: This slide is currently inactive. Activate it above to show on the website.
                  </Text>
                </View>
              )}
            </View>

            {/* Slide Title */}
            <View style={{ marginBottom: 12 }}>
              <Text style={adminThemeScreenStyles.colorLabel}>Title</Text>
              <TextInput
                style={adminThemeScreenStyles.colorTextInput}
                value={slide.title}
                onChangeText={(text) => {
                  const updatedSlides = [...slides];
                  updatedSlides[slideIndex] = { ...updatedSlides[slideIndex], title: text };
                  setSlides(updatedSlides);
                }}
                onBlur={() => handleSaveSlideData(slideIndex, 'title', slide.title)}
                placeholder="Slide title"
              />
            </View>

            {/* Slide Subtitle */}
            <View style={{ marginBottom: 12 }}>
              <Text style={adminThemeScreenStyles.colorLabel}>Subtitle</Text>
              <TextInput
                style={adminThemeScreenStyles.colorTextInput}
                value={slide.subtitle}
                onChangeText={(text) => {
                  const updatedSlides = [...slides];
                  updatedSlides[slideIndex] = { ...updatedSlides[slideIndex], subtitle: text };
                  setSlides(updatedSlides);
                }}
                onBlur={() => handleSaveSlideData(slideIndex, 'subtitle', slide.subtitle)}
                placeholder="Slide subtitle"
              />
            </View>

            {/* Slide Description */}
            <View style={{ marginBottom: 12 }}>
              <Text style={adminThemeScreenStyles.colorLabel}>Description</Text>
              <TextInput
                style={[adminThemeScreenStyles.colorTextInput, { minHeight: 80, textAlignVertical: 'top' }]}
                value={slide.description}
                onChangeText={(text) => {
                  const updatedSlides = [...slides];
                  updatedSlides[slideIndex] = { ...updatedSlides[slideIndex], description: text };
                  setSlides(updatedSlides);
                }}
                onBlur={() => handleSaveSlideData(slideIndex, 'description', slide.description)}
                placeholder="Slide description"
                multiline
                numberOfLines={4}
              />
            </View>
          </View>
        ))}
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
  );
};


