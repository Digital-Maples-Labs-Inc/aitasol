import * as React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

interface CustomDatePickerProps {
  label?: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  sx?: any;
  fullWidth?: boolean;
  size?: 'small' | 'medium';
  error?: boolean;
  helperText?: string;
}

export default function CustomDatePicker({
  label = 'Select date',
  value,
  onChange,
  disabled = false,
  minDate,
  maxDate,
  sx,
  fullWidth = false,
  size = 'medium',
  error = false,
  helperText,
}: CustomDatePickerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={sx}>
        <DatePicker
          label={label}
          value={value}
          onChange={onChange}
          disabled={disabled}
          minDate={minDate}
          maxDate={maxDate}
          slotProps={{
            textField: {
              fullWidth,
              size,
              error,
              helperText,
              sx: {
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1,
                },
              },
            },
          }}
        />
      </Box>
    </LocalizationProvider>
  );
}

