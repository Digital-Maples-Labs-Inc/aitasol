import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ArticleIcon from '@mui/icons-material/Article';
import PagesIcon from '@mui/icons-material/Pages';
import PaletteIcon from '@mui/icons-material/Palette';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import { useAuth } from '@/contexts/AuthContext';

interface MenuItem {
  text: string;
  icon: React.ReactNode;
  path: string;
  adminOnly?: boolean;
}

const mainListItems: MenuItem[] = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },
  { text: 'Pages', icon: <PagesIcon />, path: '/admin/pages' },
  { text: 'Blogs', icon: <ArticleIcon />, path: '/admin/blogs' },
  { text: 'Theme', icon: <PaletteIcon />, path: '/admin/theme', adminOnly: true },
];

const secondaryListItems: MenuItem[] = [
  { text: 'Settings', icon: <SettingsRoundedIcon />, path: '/admin/settings' },
];

export default function MenuContent() {
  const { user } = useAuth();
  const [currentPath, setCurrentPath] = React.useState<string>('');

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  const handleNavigation = (path: string) => {
    if (typeof window !== 'undefined') {
      window.location.href = path;
    }
  };

  const filteredMainItems = mainListItems.filter(
    (item) => !item.adminOnly || user?.role === 'admin'
  );

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {filteredMainItems.map((item) => {
          const isActive = currentPath === item.path;
          return (
            <ListItem key={item.path} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                selected={isActive}
                onClick={() => handleNavigation(item.path)}
                sx={{
                  borderRadius: 1,
                  mx: 0.5,
                  '&.Mui-selected': {
                    backgroundColor: 'action.selected',
                    '&:hover': {
                      backgroundColor: 'action.selected',
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 40,
                    color: isActive ? 'primary.main' : 'text.secondary',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontWeight: isActive ? 600 : 400,
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <List dense>
        {secondaryListItems.map((item) => {
          const isActive = currentPath === item.path;
          return (
            <ListItem key={item.path} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                selected={isActive}
                onClick={() => handleNavigation(item.path)}
                sx={{
                  borderRadius: 1,
                  mx: 0.5,
                  '&.Mui-selected': {
                    backgroundColor: 'action.selected',
                    '&:hover': {
                      backgroundColor: 'action.selected',
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 40,
                    color: isActive ? 'primary.main' : 'text.secondary',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontWeight: isActive ? 600 : 400,
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Stack>
  );
}

