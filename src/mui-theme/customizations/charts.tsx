import { Theme, Components } from '@mui/material/styles';
import { gray, brand } from '../themePrimitives';

/* eslint-disable import/prefer-default-export */
export const chartsCustomizations: Components<Theme> = {
  // @mui/x-charts customizations
  // Note: These will only apply if @mui/x-charts is installed
  // The types will be augmented when the package is added
  MuiChartsAxis: {
    styleOverrides: {
      root: ({ theme }) => ({
        '& .MuiChartsAxis-tick': {
          stroke: (theme.vars || theme).palette.divider,
        },
        '& .MuiChartsAxis-line': {
          stroke: (theme.vars || theme).palette.divider,
        },
        '& .MuiChartsAxis-tickLabel': {
          fill: (theme.vars || theme).palette.text.secondary,
          fontSize: theme.typography.caption.fontSize,
        },
      }),
    },
  },
  MuiChartsLegend: {
    styleOverrides: {
      root: ({ theme }) => ({
        '& .MuiChartsLegend-mark': {
          rx: 2,
        },
        '& .MuiChartsLegend-label': {
          fill: (theme.vars || theme).palette.text.primary,
          fontSize: theme.typography.caption.fontSize,
        },
      }),
    },
  },
  MuiChartsTooltip: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: (theme.vars || theme).palette.background.paper,
        border: `1px solid ${(theme.vars || theme).palette.divider}`,
        borderRadius: (theme.vars || theme).shape.borderRadius,
        boxShadow: (theme.vars || theme).shadows[2],
        '& .MuiChartsTooltip-label': {
          color: (theme.vars || theme).palette.text.primary,
          fontWeight: 600,
        },
        '& .MuiChartsTooltip-value': {
          color: (theme.vars || theme).palette.text.secondary,
        },
      }),
    },
  },
};

