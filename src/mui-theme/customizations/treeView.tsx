import { Theme, Components, alpha } from '@mui/material/styles';
import { gray, brand } from '../themePrimitives';

/* eslint-disable import/prefer-default-export */
export const treeViewCustomizations: Components<Theme> = {
  // @mui/x-tree-view customizations
  // Note: These will only apply if @mui/x-tree-view is installed
  // The types will be augmented when the package is added
  MuiTreeItem: {
    styleOverrides: {
      root: ({ theme }) => ({
        '& .MuiTreeItem-content': {
          borderRadius: (theme.vars || theme).shape.borderRadius,
          padding: '4px 8px',
          '&:hover': {
            backgroundColor: alpha(
              theme.palette.action.hover,
              0.5
            ),
          },
          '&.Mui-selected': {
            backgroundColor: alpha(
              theme.palette.action.selected,
              0.3
            ),
            '&:hover': {
              backgroundColor: alpha(
                theme.palette.action.selected,
                0.5
              ),
            },
          },
          '&.Mui-focused': {
            backgroundColor: 'transparent',
            outline: `2px solid ${alpha(brand[500], 0.5)}`,
            outlineOffset: 2,
          },
        },
        '& .MuiTreeItem-label': {
          fontSize: theme.typography.body2.fontSize,
          fontWeight: 400,
          color: (theme.vars || theme).palette.text.primary,
        },
        '& .MuiTreeItem-iconContainer': {
          color: (theme.vars || theme).palette.text.secondary,
        },
      }),
    },
  },
  MuiTreeView: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: theme.spacing(1),
      }),
    },
  },
};

