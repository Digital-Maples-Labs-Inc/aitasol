import * as React from 'react';
import MuiAvatar from '@mui/material/Avatar';
import MuiListItemAvatar from '@mui/material/ListItemAvatar';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Select, { SelectChangeEvent, selectClasses } from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useAuth } from '@/contexts/AuthContext';
import { useEditingMode, EditingMode } from '@/contexts/EditingModeContext';

const Avatar = styled(MuiAvatar)(({ theme }) => ({
  width: 28,
  height: 28,
  backgroundColor: (theme.vars || theme).palette.background.paper,
  color: (theme.vars || theme).palette.text.secondary,
  border: `1px solid ${(theme.vars || theme).palette.divider}`,
}));

const ListItemAvatar = styled(MuiListItemAvatar)({
  minWidth: 0,
  marginRight: 12,
});

export default function SelectContent() {
  const { user } = useAuth();
  const { mode } = useEditingMode();

  // Only show if user is logged in and has editor/admin role
  if (!user || (user.role !== 'admin' && user.role !== 'editor')) {
    return null;
  }

  const handleChange = (event: SelectChangeEvent) => {
    const newMode = event.target.value as EditingMode;
    
    if (typeof window !== 'undefined') {
      // If switching to inline mode, navigate to frontend (home page)
      if (newMode === 'inline') {
        window.location.href = '/';
      }
      // If switching to backend mode, navigate to admin dashboard
      else if (newMode === 'backend') {
        window.location.href = '/admin/dashboard';
      }
    }
  };

  return (
    <Select
      labelId="editing-mode-select"
      id="editing-mode-select"
      value={mode}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'Select editing mode' }}
      fullWidth
      sx={{
        maxHeight: 56,
        width: 215,
        '&.MuiList-root': {
          p: '8px',
        },
        [`& .${selectClasses.select}`]: {
          display: 'flex',
          alignItems: 'center',
          gap: '2px',
          pl: 1,
        },
      }}
    >
      <MenuItem value="inline">
        <ListItemAvatar>
          <Avatar alt="Inline Editing">
            <EditIcon sx={{ fontSize: '1rem' }} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Inline Editing" secondary="Edit on frontend" />
      </MenuItem>
      <MenuItem value="backend">
        <ListItemAvatar>
          <Avatar alt="Backend Editing">
            <DashboardIcon sx={{ fontSize: '1rem' }} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Backend Editing" secondary="Admin dashboard" />
      </MenuItem>
    </Select>
  );
}

