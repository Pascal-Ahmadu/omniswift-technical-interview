import apiClient from '../clients/api.client';
import { CONFIG } from '../config/api.config';
import { handleApiError } from '../utils/error-handler';

class ApiService {
  /**
   * Generic fetch method to reduce code duplication
   * @private
   * @param {string} endpoint - API endpoint
   * @param {Object} [options={}] - Axios request options
   * @returns {Promise<any>}
   */
  async #fetchData(endpoint, options = {}) {
    try {
      return await apiClient(endpoint, options);
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Public API methods
  async getAllData() {
    return this.#fetchData(CONFIG.ENDPOINTS.ALL_DATA);
  }

  async getAllLevels() {
    return this.#fetchData(CONFIG.ENDPOINTS.ALL_LEVELS);
  }

  async getAllStates() {
    return this.#fetchData(CONFIG.ENDPOINTS.ALL_STATES);
  }

  async getGenderData() {
    return this.#fetchData(CONFIG.ENDPOINTS.ALL_GENDER);
  }

  async getAgeData() {
    return this.#fetchData(CONFIG.ENDPOINTS.ALL_AGES);
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
}

export default new ApiService();