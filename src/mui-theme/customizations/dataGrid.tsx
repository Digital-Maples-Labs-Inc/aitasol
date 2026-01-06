import { Theme, Components, alpha } from '@mui/material/styles';
import { gray, brand } from '../themePrimitives';

/* eslint-disable import/prefer-default-export */
export const dataGridCustomizations: Components<Theme> = {
  // @mui/x-data-grid-pro customizations
  // Note: These will only apply if @mui/x-data-grid-pro is installed
  // The types will be augmented when the package is added
  MuiDataGrid: {
    styleOverrides: {
      root: ({ theme }) => ({
        border: 'none',
        '& .MuiDataGrid-columnHeaders': {
          backgroundColor: (theme.vars || theme).palette.background.paper,
          borderBottom: `1px solid ${(theme.vars || theme).palette.divider}`,
          '& .MuiDataGrid-columnHeader': {
            fontWeight: 600,
            fontSize: theme.typography.body2.fontSize,
            color: (theme.vars || theme).palette.text.primary,
            '&:focus': {
              outline: 'none',
            },
            '&:focus-within': {
              outline: 'none',
            },
          },
        },
        '& .MuiDataGrid-row': {
          '&:hover': {
            // Use gray colors directly to avoid CSS variable issues with alpha()
            backgroundColor: theme.palette.mode === 'dark'
              ? alpha(gray[600], 0.1)
              : alpha(gray[200], 0.1),
          },
          '&.Mui-selected': {
            backgroundColor: theme.palette.mode === 'dark'
              ? alpha(gray[600], 0.15)
              : alpha(gray[200], 0.15),
            '&:hover': {
              backgroundColor: theme.palette.mode === 'dark'
                ? alpha(gray[600], 0.25)
                : alpha(gray[200], 0.25),
            },
          },
        },
        '& .MuiDataGrid-cell': {
          borderBottom: `1px solid ${(theme.vars || theme).palette.divider}`,
          '&:focus': {
            outline: 'none',
          },
          '&:focus-within': {
            outline: 'none',
          },
        },
        '& .MuiDataGrid-footerContainer': {
          borderTop: `1px solid ${(theme.vars || theme).palette.divider}`,
        },
        ...theme.applyStyles('dark', {
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: (theme.vars || theme).palette.background.paper,
          },
        }),
      }),
    },
  },
};

