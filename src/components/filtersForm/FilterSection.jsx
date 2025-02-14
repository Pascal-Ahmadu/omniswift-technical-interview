import React from 'react';
import { toast } from 'react-toastify';
import {
  Grid,
  Paper,
  Typography,
  Box
} from '@mui/material';
import { FilterSelect } from './familySelect/FilterSelect';
import { SearchButton } from './searchButton/SearchButton';
import { useFilterData } from './hooks/useFilterData';

export const FilterSection = ({ filters, onFilterChange, onSearch }) => {
  const { filterOptions, isLoading, error } = useFilterData();

  const handleFilterChange = (filterType, value) => {
    onFilterChange(filterType, value);
    
    if (value) {
      const filterLabels = {
        age: 'Age',
        state: 'State',
        level: 'Level',
        gender: 'Gender'
      };
      
      const displayValue = filterType === 'state' || filterType === 'gender'
        ? value.charAt(0).toUpperCase() + value.slice(1)
        : value;
        
      toast.info(`${filterLabels[filterType]} filter set to: ${displayValue}`);
    }
  };

  const handleSearch = () => {
    const activeFilters = Object.entries(filters)
      .filter(([_, value]) => value)
      .map(([key, value]) => `${key}: ${value}`)
      .join(', ');

    toast.success(activeFilters 
      ? `Searching with filters: ${activeFilters}`
      : 'Searching with no filters applied'
    );
    
    onSearch();
  };

  if (error) {
    return (
      <Paper sx={{ p: 3, textAlign: 'center', color: 'error.main' }}>
        {error}
      </Paper>
    );
  }

  return (
    <Paper
      sx={{
        p: { xs: 2, sm: 3 },
        mb: { xs: 2, sm: 3 },
        borderRadius: 0,
        minHeight: { xs: 'auto', md: 'auto' },
        width: '100%',
        maxWidth: { xs: '100%', md: 1145 },
        backgroundColor: '#FFFFFF',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '100%',
          padding: { xs: '20px', md: '28px' },
          position: 'relative',
          '& .MuiGrid-container': {
            margin: 0
          }
        }}
      >
        <Typography 
          sx={{ 
            mb: 3,
            fontFamily: 'Lato',
            fontSize: '24px',
            lineHeight: '32px',
            letterSpacing: '0.1px',
            color: '#616161',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          Filter Student Table By:
        </Typography>

        <Grid 
          container 
          rowSpacing={{ xs: 2, md: 3 }} 
          columnSpacing={2}
          sx={{
            width: '100%',
            margin: '0 !important'
          }}
        >
          {[
            { label: 'Age', options: filterOptions.ages, value: filters.age },
            { label: 'State', options: filterOptions.states, value: filters.state },
            { label: 'Level', options: filterOptions.levels, value: filters.level },
            { label: 'Gender', options: filterOptions.genders, value: filters.gender }
          ].map(({ label, options, value }) => (
            <Grid item xs={12} md={4} key={label}>
              <FilterSelect
                label={label}
                value={value}
                options={options}
                onChange={(e) => handleFilterChange(label.toLowerCase(), e.target.value)}
                disabled={isLoading}
              />
            </Grid>
          ))}

          <Grid item xs={12} md={4}>
            <SearchButton 
              onClick={handleSearch}
              disabled={isLoading}
            />
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default FilterSection;