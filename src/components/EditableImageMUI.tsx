/**
 * Editable Image Component for Material-UI
 * Displays image that can be replaced when user has editor permissions
 */

import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import EditIcon from '@mui/icons-material/Edit';
import ImageIcon from '@mui/icons-material/Image';
import { useAuth } from '@/contexts/AuthContext';
import { useEditingMode } from '@/contexts/EditingModeContext';

interface EditableImageMUIProps {
  src: string;
  alt?: string;
  onSave: (newUrl: string) => Promise<void>;
  sx?: any;
  editable?: boolean;
  aspectRatio?: string;
}

export const EditableImageMUI: React.FC<EditableImageMUIProps> = ({
  src,
  alt = '',
  onSave,
  sx,
  editable = true,
  aspectRatio,
}) => {
  const { user } = useAuth();
  const { isInlineMode } = useEditingMode();
  const [isEditing, setIsEditing] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState(src);
  const [uploading, setUploading] = React.useState(false);

  const isEditable = editable && isInlineMode && (user?.role === 'admin' || user?.role === 'editor');

  React.useEffect(() => {
    setImageUrl(src);
  }, [src]);

  const handleClick = () => {
    if (isEditable) {
      setIsEditing(true);
      setImageUrl(src);
    }
  };

  const handleImagePicker = () => {
    if (typeof document === 'undefined') {
      alert('Image upload is only available on web');
      return;
    }

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = async (e: any) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setUploading(true);
      try {
        // For now, create a data URL (in production, upload to Firebase Storage)
        const reader = new FileReader();
        reader.onload = async (event) => {
          const dataUrl = event.target?.result as string;
          await onSave(dataUrl);
          setIsEditing(false);
          setUploading(false);
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Failed to upload image. Please try again.');
        setUploading(false);
      }
    };
    
    input.click();
  };

  const handleUrlChange = async () => {
    if (imageUrl && imageUrl !== src) {
      setUploading(true);
      try {
        await onSave(imageUrl);
        setIsEditing(false);
      } catch (error) {
        console.error('Error saving image URL:', error);
        alert('Failed to save image URL. Please try again.');
      } finally {
        setUploading(false);
      }
    } else {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setImageUrl(src);
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
            '&:hover .edit-overlay': {
              opacity: 1,
            },
          }),
          ...sx,
        }}
        onClick={handleClick}
      >
        <Box
          component="img"
          src={imageUrl || '/placeholder-image.jpg'}
          alt={alt}
          sx={{
            width: '100%',
            height: 'auto',
            display: 'block',
            aspectRatio: aspectRatio || 'auto',
            objectFit: 'cover',
            borderRadius: 1,
          }}
        />
        {isEditable && (
          <Box
            className="edit-overlay"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 0,
              transition: 'opacity 0.2s',
              borderRadius: 1,
            }}
          >
            <IconButton sx={{ color: 'white' }}>
              <EditIcon />
            </IconButton>
          </Box>
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
        <DialogTitle>Replace Image</DialogTitle>
        <DialogContent>
          {uploading ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4 }}>
              <CircularProgress />
              <Box sx={{ mt: 2 }}>Uploading image...</Box>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
              <Button
                variant="outlined"
                startIcon={<ImageIcon />}
                onClick={handleImagePicker}
                fullWidth
              >
                Choose Image File
              </Button>
              <TextField
                fullWidth
                label="Or enter image URL"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
              {imageUrl && (
                <Box
                  component="img"
                  src={imageUrl}
                  alt="Preview"
                  sx={{
                    width: '100%',
                    maxHeight: 200,
                    objectFit: 'contain',
                    borderRadius: 1,
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                />
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} disabled={uploading}>
            Cancel
          </Button>
          <Button
            onClick={handleUrlChange}
            variant="contained"
            disabled={uploading || !imageUrl}
          >
            {uploading ? 'Saving...' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

