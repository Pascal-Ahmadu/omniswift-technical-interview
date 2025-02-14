export const CONFIG = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  DEFAULT_HEADERS: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  ENDPOINTS: {
    ALL_DATA: '/viewAllData',
    ALL_LEVELS: '/viewAllLevels',
    ALL_STATES: '/viewAllStates',
    ALL_GENDER: '/viewAllGender',
    ALL_AGES: '/viewAllAges',
    FILTER_DATA: '/filterData',
    VIEW_RESULT: '/viewResult'
  }
}