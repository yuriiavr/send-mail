import axios from 'axios';
import { API_ENDPOINTS } from './api'; 

const fetchWithFallback = async (method, endpoint, data = null, options = {}) => {
  const primaryConfig = {
    method,
    url: `${API_ENDPOINTS.primary}${endpoint}`,
    data,
    timeout: options.primaryTimeout || 5000,
    ...options.primaryAxiosConfig,
  };

  const backupConfig = {
    method,
    url: `${API_ENDPOINTS.backup}${endpoint}`,
    data,
    timeout: options.backupTimeout || 10000,
    ...options.backupAxiosConfig,
  };

  try {
    const response = await axios(primaryConfig);
    return response;
  } catch (primaryError) {
    console.warn(`Primary API failed for ${endpoint}:`, primaryError.message);
    console.log('Attempting to use backup API...');
    try {
      const response = await axios(backupConfig);
      return response;
    } catch (backupError) {
      console.error(`Backup API also failed for ${endpoint}:`, backupError.message);
      throw backupError;
    }
  }
};

export default fetchWithFallback;