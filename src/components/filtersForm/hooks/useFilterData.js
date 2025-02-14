import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ApiService from '../../../api/services/api.service';

const normalizeData = (data, key) => {
  if (!data) return [];
  const arrayData = Array.isArray(data) ? data : data?.data || [];
  return arrayData.map(item => 
    typeof item === 'object' ? item[key] || item.name || item[item.key] : item
  );
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

  useEffect(() => {
    const loadFilterData = async () => {
      try {
        const [ageData, statesData, levelsData, genderData] = await Promise.all([
          ApiService.getAgeData(),
          ApiService.getAllStates(),
          ApiService.getAllLevels(),
          ApiService.getGenderData()
        ]);

        setFilterOptions({
          ages: normalizeData(ageData, 'age'),
          states: normalizeData(statesData, 'state'),
          levels: normalizeData(levelsData, 'level'),
          genders: normalizeData(genderData, 'gender')
        });
      } catch (error) {
        console.error('Error loading filter data:', error);
        setError('Failed to load filter data. Please try again.');
        toast.error('Failed to load filter data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    loadFilterData();
  }, []);

  return { filterOptions, isLoading, error };
};