// FilterSelect.jsx
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import PropTypes from 'prop-types';

export const FilterSelect = ({ label, value, options, onChange, disabled }) => {
  return (
    <FormControl fullWidth disabled={disabled}>
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        label={label}
        onChange={onChange}
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

FilterSelect.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};