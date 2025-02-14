/**
 * Handles API errors consistently
 * @param {Error} error - The error object
 * @throws {Error} Enhanced error with context
 */
export const handleApiError = (error) => {
    const baseError = {
      timestamp: new Date().toISOString(),
      path: error.config?.url || 'unknown'
    };
  
    if (error.response) {
      return new Error(JSON.stringify({
        ...baseError,
        type: 'SERVER_ERROR',
        status: error.response.status,
        message: error.response.data.message || 'Server error occurred',
        data: error.response.data
      }));
    }
  
    if (error.request) {
      return new Error(JSON.stringify({
        ...baseError,
        type: 'NETWORK_ERROR',
        message: 'Network error - no response received'
      }));
    }
  
    return new Error(JSON.stringify({
      ...baseError,
      type: 'CLIENT_ERROR',
      message: error.message || 'An unexpected error occurred'
    }));
  };