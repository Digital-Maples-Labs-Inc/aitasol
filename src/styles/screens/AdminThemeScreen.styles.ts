/**
 * AdminThemeScreen Styles
 */

import { StyleSheet } from 'react-native';

export const adminThemeScreenStyles = StyleSheet.create({
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
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  nameInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 24,
    backgroundColor: '#f9f9f9',
    color: '#666',
  },
  colorsSection: {
    maxHeight: 600,
    marginBottom: 20,
  },
  typographySection: {
    maxHeight: 600,
    marginBottom: 20,
  },
  subsectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 5,
  },
  colorInput: {
    marginBottom: 15,
  },
  colorLabel: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
    fontWeight: '500',
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
    backgroundColor: '#f9f9f9',
    color: '#666',
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
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  typographyLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  typographyRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'space-between',
  },
  typographyField: {
    flex: 1,
    minWidth: 100,
    marginBottom: 10,
  },
  fieldLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  numberInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 10,
    fontSize: 14,
    backgroundColor: '#fff',
    color: '#666',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 10,
    fontSize: 14,
    backgroundColor: '#fff',
    color: '#666',
  },
  fontFamilyHint: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
    marginBottom: 15,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
    justifyContent: 'flex-end',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    minWidth: 100,
  },
  cancelButton: {
    backgroundColor: '#e0e0e0',
  },
  cancelButtonText: {
    color: '#333',
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
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  themeInfo: {
    flex: 1,
  },
  themeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  activeBadge: {
    backgroundColor: '#28a745',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginTop: 5,
    alignSelf: 'flex-start',
  },
  activeBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  themeActions: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  actionButtonText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
  },
  activateButton: {
    backgroundColor: '#007AFF',
  },
  activateButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});

