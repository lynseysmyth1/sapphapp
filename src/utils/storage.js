/**
 * Safe localStorage utilities with error handling
 */

export const storage = {
  /**
   * Safely get item from localStorage
   * @param {string} key - Storage key
   * @param {any} defaultValue - Default value if key doesn't exist or error occurs
   * @returns {any} Stored value or default
   */
  getItem(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item !== null ? item : defaultValue;
    } catch (error) {
      console.warn(`Error reading from localStorage for key "${key}":`, error);
      return defaultValue;
    }
  },

  /**
   * Safely set item in localStorage
   * @param {string} key - Storage key
   * @param {any} value - Value to store
   * @returns {boolean} Success status
   */
  setItem(key, value) {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.warn(`Error writing to localStorage for key "${key}":`, error);
      return false;
    }
  },

  /**
   * Safely remove item from localStorage
   * @param {string} key - Storage key
   * @returns {boolean} Success status
   */
  removeItem(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.warn(`Error removing from localStorage for key "${key}":`, error);
      return false;
    }
  },

  /**
   * Check if localStorage is available
   * @returns {boolean} Availability status
   */
  isAvailable() {
    try {
      const test = '__localStorage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }
};
