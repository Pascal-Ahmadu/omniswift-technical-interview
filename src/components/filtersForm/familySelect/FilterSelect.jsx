import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export const FilterSelect = ({ label, value, options, onChange, disabled }) => {
  const styles = {
    formControl: {
      height: '64px',
      '& .MuiInputLabel-root': {
        fontFamily: 'Lato',
        fontWeight: 500,
        fontSize: '14px',
        lineHeight: '16px',
        letterSpacing: '0.4px',
        color: '#343434'
      }
    },
    select: {
      borderRadius: '4px',
      '& .MuiOutlinedInput-notchedOutline': { 
        borderColor: '#ADB7BE',
        borderWidth: '1px'
      },
      '&:hover .MuiOutlinedInput-notchedOutline': { 
        borderColor: '#ADB7BE' 
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': { 
        borderColor: '#ADB7BE' 
      },
      '& .MuiSelect-select': {
        fontFamily: 'Lato',
        fontSize: '14px',
        lineHeight: '24px',
        letterSpacing: '0.44px',
        color: '#ADB7BE'
      }
    }
  };

  return (
    <FormControl fullWidth sx={styles.formControl} disabled={disabled}>
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        label={label}
        onChange={onChange}
        sx={styles.select}
      >
        {options.map((option, index) => (
          <MenuItem 
            key={`${label.toLowerCase()}-${index}-${option}`} 
            value={typeof option === 'string' ? option.toLowerCase() : option}
          >
            {option}
            {label === 'Level' ? ' Level' : ''}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
