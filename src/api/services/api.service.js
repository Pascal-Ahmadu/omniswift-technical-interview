// api.service.js
import apiClient from '../clients/api.client';
import { CONFIG } from '../config/api.config';
import { handleApiError } from '../utils/error-handler';

class ApiService {
  #cache = new Map();
  #retryConfig = {
    maxRetries: 3,
    baseDelay: 1000,
    maxDelay: 10000
  };

  /**
   * Implements exponential backoff for retries
   * @private
   * @param {number} retryCount - Current retry attempt
   * @param {number} retryAfter - Server specified retry delay in seconds
   * @returns {number} Delay in milliseconds
   */
  #calculateBackoff(retryCount, retryAfter) {
    if (retryAfter) {
      return Math.min(retryAfter * 1000, this.#retryConfig.maxDelay);
    }
    
    const delay = Math.min(
      this.#retryConfig.baseDelay * Math.pow(2, retryCount),
      this.#retryConfig.maxDelay
    );
    return delay + Math.random() * 1000; // Add jitter
  }

  /**
   * Handles caching for GET requests
   * @private
   * @param {string} key - Cache key
   * @param {Function} fetchFn - Function to fetch data if cache miss
   * @param {number} ttl - Cache TTL in milliseconds
   */
  async #withCache(key, fetchFn, ttl = 5 * 60 * 1000) {
    const cached = this.#cache.get(key);
    if (cached && Date.now() - cached.timestamp < ttl) {
      return cached.data;
    }

    const data = await fetchFn();
    this.#cache.set(key, {
      data,
      timestamp: Date.now()
    });
    return data;
  }

  /**
   * Enhanced fetch method with retry logic and rate limiting handling
   * @private
   * @param {string} endpoint - API endpoint
   * @param {Object} [options={}] - Axios request options
   * @param {number} [retryCount=0] - Current retry attempt
   * @returns {Promise<any>}
   */
  async #fetchData(endpoint, options = {}, retryCount = 0) {
    try {
      return await apiClient(endpoint, options);
    } catch (error) {
      const isRateLimit = error.response?.status === 429;
      const retryAfter = error.response?.headers?.['retry-after'];
      
      if (isRateLimit && retryCount < this.#retryConfig.maxRetries) {
        const delay = this.#calculateBackoff(retryCount, retryAfter);
        console.warn(`Rate limited, retrying in ${delay}ms (Attempt ${retryCount + 1}/${this.#retryConfig.maxRetries})`);
        
        await new Promise(resolve => setTimeout(resolve, delay));
        return this.#fetchData(endpoint, options, retryCount + 1);
      }

      throw handleApiError(error);
    }
  }

  /**
   * GET request with caching
   * @private
   * @param {string} endpoint - API endpoint
   * @param {Object} [options={}] - Axios request options
   */
  async #fetchWithCache(endpoint, options = {}) {
    if (options.method && options.method !== 'GET') {
      return this.#fetchData(endpoint, options);
    }

    return this.#withCache(
      endpoint,
      () => this.#fetchData(endpoint, options)
    );
  }

  // Public API methods with caching for GET requests
  async getAllData() {
    return this.#fetchWithCache(CONFIG.ENDPOINTS.ALL_DATA);
  }

  async getAllLevels() {
    return this.#fetchWithCache(CONFIG.ENDPOINTS.ALL_LEVELS);
  }

  async getAllStates() {
    return this.#fetchWithCache(CONFIG.ENDPOINTS.ALL_STATES);
  }

  async getGenderData() {
    return this.#fetchWithCache(CONFIG.ENDPOINTS.ALL_GENDER);
  }

  async getAgeData() {
    return this.#fetchWithCache(CONFIG.ENDPOINTS.ALL_AGES);
  }

  /**
   * @param {import('../types/api.types').FilterCriteria} filters - Filter criteria
   */
  async filterData(filters) {
    return this.#fetchData(CONFIG.ENDPOINTS.FILTER_DATA, {
      method: 'POST',
      data: filters
    });
  }

  /**
   * @param {number|string} id - Result ID
   */
  async viewResult(id) {
    if (!id) throw new Error('Result ID is required');
    return this.#fetchData(`${CONFIG.ENDPOINTS.VIEW_RESULT}/${id}`, {
      method: 'POST'
    });
  }

  /**
   * Clear the cache
   * @param {string} [key] - Specific cache key to clear, or all if not provided
   */
  clearCache(key) {
    if (key) {
      this.#cache.delete(key);
    } else {
      this.#cache.clear();
    }
  }
}

export default new ApiService();