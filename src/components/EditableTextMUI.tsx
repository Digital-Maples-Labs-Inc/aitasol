/**
 * Editable Text Component for Material-UI
 * Displays text that can be edited inline when user has editor permissions
 */

import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import { useAuth } from '@/contexts/AuthContext';
import { useEditingMode } from '@/contexts/EditingModeContext';
import { useTheme } from '@mui/material/styles';

interface EditableTextMUIProps {
  value: string;
  onSave: (newValue: string) => Promise<void>;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'caption';
  component?: React.ElementType;
  sx?: any;
  editable?: boolean;
  multiline?: boolean;
  placeholder?: string;
  hideEditButton?: boolean; // Hide edit button when inside interactive elements (like AccordionSummary)
}

export const EditableTextMUI: React.FC<EditableTextMUIProps> = ({
  value,
  onSave,
  variant = 'body1',
  component,
  sx,
  editable = true,
  multiline = false,
  placeholder,
  hideEditButton = false,
}) => {
  const { user } = useAuth();
  const { isInlineMode } = useEditingMode();
  const theme = useTheme();
  const [isEditing, setIsEditing] = React.useState(false);
  const [editValue, setEditValue] = React.useState(value);
  const [saving, setSaving] = React.useState(false);

  const isEditable = editable && isInlineMode && (user?.role === 'admin' || user?.role === 'editor');

  React.useEffect(() => {
    setEditValue(value);
  }, [value]);

  const handleClick = (e: React.MouseEvent) => {
    if (isEditable) {
      e.stopPropagation(); // Prevent event bubbling to parent buttons
      setIsEditing(true);
      setEditValue(value);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave(editValue);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving text:', error);
      alert('Failed to save. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditValue(value);
  };

  return (
    <>
      <Box
        sx={{
          position: 'relative',
          display: 'inline-block',
          width: '100%',
          ...(isEditable && {
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.02)',
              borderRadius: 1,
            },
          }),
          ...sx,
        }}
        onClick={handleClick}
      >
        <Typography variant={variant} component={component} sx={sx}>
          {value || placeholder}
        </Typography>
        {isEditable && !hideEditButton && (
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              handleClick(e);
            }}
            sx={{
              position: 'absolute',
              right: 0,
              opacity: 0,
              transition: 'opacity 0.2s',
              '&:hover': {
                opacity: 1,
              },
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '1';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '0';
            }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        )}
      </Box>

      <Dialog
        open={isEditing}
        onClose={handleCancel}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
          },
        }}
      >
        <DialogTitle>Edit {variant === 'h1' || variant === 'h2' || variant === 'h3' ? 'Heading' : 'Text'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            multiline={multiline}
            rows={multiline ? 4 : 1}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            placeholder={placeholder}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} disabled={saving}>
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained" disabled={saving}>
            {saving ? 'Saving...' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

