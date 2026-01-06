import { Theme, Components, alpha } from '@mui/material/styles';
import { gray, brand } from '../themePrimitives';

/* eslint-disable import/prefer-default-export */
export const datePickersCustomizations: Components<Theme> = {
  // @mui/x-date-pickers customizations
  // Note: These will only apply if @mui/x-date-pickers is installed
  // The types will be augmented when the package is added
  MuiPickersCalendarHeader: {
    styleOverrides: {
      root: ({ theme }) => ({
        '& .MuiPickersCalendarHeader-label': {
          fontWeight: 600,
          color: (theme.vars || theme).palette.text.primary,
        },
        '& .MuiPickersArrowSwitcher-button': {
          color: (theme.vars || theme).palette.text.secondary,
          '&:hover': {
            backgroundColor: alpha(
              (theme.vars || theme).palette.action.hover,
              0.5
            ),
          },
        },
      }),
    },
  },
  MuiPickersDay: {
    styleOverrides: {
      root: ({ theme }) => ({
        fontWeight: 400,
        '&:hover': {
          backgroundColor: alpha(
            (theme.vars || theme).palette.action.hover,
            0.5
          ),
        },
        '&.Mui-selected': {
          backgroundColor: (theme.vars || theme).palette.primary.main,
          color: (theme.vars || theme).palette.primary.contrastText,
          fontWeight: 600,
          '&:hover': {
            backgroundColor: (theme.vars || theme).palette.primary.dark,
          },
        },
        '&.Mui-disabled': {
          color: (theme.vars || theme).palette.text.disabled,
        },
      }),
    },
  },
  MuiPickersPopper: {
    styleOverrides: {
      paper: ({ theme }) => ({
        borderRadius: (theme.vars || theme).shape.borderRadius,
        border: `1px solid ${(theme.vars || theme).palette.divider}`,
        boxShadow: (theme.vars || theme).shadows[2],
      }),
    },
  },
};

