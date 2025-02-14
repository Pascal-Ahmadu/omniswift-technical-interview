import { useState, useCallback } from 'react';
import { INITIAL_FILTERS } from '../constants';

export const useFilters = (onFilterApply) => {
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  const handleFilterChange = useCallback((filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  }, []);

  const handleSearch = useCallback(() => {
    onFilterApply(filters);
  }, [filters, onFilterApply]);

  const handleResetFilters = useCallback(() => {
    setFilters(INITIAL_FILTERS);
    onFilterApply(INITIAL_FILTERS);
  }, [onFilterApply]);

  return {
    filters,
    handleFilterChange,
    handleSearch,
    handleResetFilters
  };
};