import { useState,  useCallback } from 'react';
import ApiService from '../api/services/api.service';

export const useStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStudents = useCallback(async (filters = {}) => {
    setLoading(true);
    setError(null);

    try {
      const activeFilters = Object.entries(filters)
        .reduce((acc, [key, value]) => {
          if (value) acc[key] = value;
          return acc;
        }, {});

      const response = Object.keys(activeFilters).length === 0
        ? await ApiService.getAllData()
        : await ApiService.filterData(activeFilters);

      setStudents(response?.data?.students || []);
    } catch (err) {
      console.error('Error fetching students:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    students,
    loading,
    error,
    fetchStudents
  };
};
