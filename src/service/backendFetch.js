const BASE_URL = "https://backend-cv-generator.onrender.com/api";

// Fonction générique pour les appels API
const apiRequest = async (endpoint, options = {}) => {
    try {
        const response = await fetch(`${BASE_URL}/${endpoint}`, options);
        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("API Request Error:", error.message);
        throw error;
    }
};

// Appels spécifiques à votre API
export const getCvs = () => apiRequest("cv");

export const getCvById = (id) => apiRequest(`cv/${id}`);

export const createCv = (cvData) =>
    apiRequest("cv", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(cvData),
    });

export const updateCv = (id, updatedData) =>
    apiRequest(`cv/${id}`, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
    });

export const deleteCv = (id) =>
    apiRequest(`cv/${id}`, {
        method: "DELETE",
    });

export const registerUser = (userData) =>
    apiRequest("auth/register", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });

export const loginUser = (userData) =>
    apiRequest("auth/login", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });
      

export const logoutUser = () =>
    apiRequest("auth/logout", {
        method: "POST",
    });

export const getRecommendationsForCv = async (cvId) => {
    try {
      const response = await fetch(`/api/recommendations/cv/${cvId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch recommendations');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      throw error;
    }
  };
  