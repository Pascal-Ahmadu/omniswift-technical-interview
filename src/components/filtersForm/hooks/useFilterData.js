import { useEffect, useState, useCallback, useRef } from 'react';
import { toast } from 'react-toastify';
import ApiService from '../../../api/services/api.service';

export const DEBOUNCE_DELAY = 500;
/**
 * Normalizes API response data with enhanced error checking.
 *
 * @param {any} data - Raw API data.
 * @param {string} key - The expected key to extract from objects.
 * @returns {Array} An array of normalized values.
 */
const normalizeData = (data, key) => {
  if (!data) return [];
  
  try {
    // Ensure we are working with an array
    const arrayData = Array.isArray(data) ? data : data?.data || [];
    return arrayData
      .map(item => {
        if (item && typeof item === 'object') {
          // Use the provided key, or fallback to item.name or item.value (if it's a string)
          return item[key] ?? item.name ?? (typeof item.value === 'string' ? item.value : null);
        }
        // Convert primitive types to a string representation
        return String(item);
      })
      .filter(value => value !== null && value !== undefined && value !== '');
  } catch (error) {
    console.error(`Error normalizing ${key} data:`, error);
    return [];
  }
};

export const useFilterData = () => {
  const [filterOptions, setFilterOptions] = useState({
    ages: [],
    states: [],
    levels: [],
    genders: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const MAX_RETRIES = 3;
  // Using a ref to track retry count prevents unnecessary re-renders.
  const retryCountRef = useRef(0);
  // Store timeout ID for cleanup on unmount.
  const timeoutRef = useRef(null);

  const fetchFilterData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [ageData, statesData, levelsData, genderData] = await Promise.all([
        ApiService.getAgeData(),
        ApiService.getAllStates(),
        ApiService.getAllLevels(),
        ApiService.getGenderData()
      ]);

      const normalizedData = {
        ages: normalizeData(ageData, 'age'),
        states: normalizeData(statesData, 'state'),
        levels: normalizeData(levelsData, 'level'),
        genders: normalizeData(genderData, 'gender')
      };

      // Ensure each dataset has data; if not, trigger an error to retry.
      const hasIncompleteData = Object.values(normalizedData).some(arr => !arr.length);
      if (hasIncompleteData) {
        throw new Error('Incomplete data received');
      }

      setFilterOptions(normalizedData);
      retryCountRef.current = 0; // Reset retry count on success
      setIsLoading(false);
    } catch (err) {
      console.error('Error loading filter data:', err);
      setError(`Failed to load filter data: ${err.message}`);
      if (retryCountRef.current < MAX_RETRIES) {
        const delay = 1000 * Math.pow(2, retryCountRef.current);
        retryCountRef.current += 1;
        timeoutRef.current = setTimeout(fetchFilterData, delay);
      } else {
        toast.error('Failed to load filter data. Please refresh the page.');
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    fetchFilterData();
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [fetchFilterData]);

  return { filterOptions, isLoading, error, retry: fetchFilterData };
};
