const BASE_URL = "https://backend-cv-generator.onrender.com/api";
// const BASE_URL = "http://localhost:3000/api"

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

export const getVisibleCvs = () => apiRequest("cv/visible");


export const createCv = (cvData) =>
    apiRequest("cv", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(cvData),
    });

export const updateCv = async (id, updatedData) => {
    const token = localStorage.getItem("token");
    return apiRequest(`cv/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
    });
};
    

export const deleteCv = async (id) => {
    const token = localStorage.getItem("token");
    return apiRequest(`cv/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};


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

export const getRecommendationsForCV = (CVNoteId) =>
    apiRequest(`recommandation/${CVNoteId}`);
    

export const createRecommendation = async (p_recommandationData) => {
    const token = localStorage.getItem("token");
    apiRequest("/recommandation", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(p_recommandationData)
    });
};


export const deleteRecommendation = async (p_id) => {
    const token = localStorage.getItem("token");
    apiRequest(`/recommandation/${p_id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    })
};

export const updateRecommandation = async (p_id, p_recommandationData) => {
    const token = localStorage.getItem("token");
    apiRequest(`/recommandation/${p_id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(p_recommandationData)
    })
};

export const getRecommendationsForUser = async () => {
    const token = localStorage.getItem("token");
    return apiRequest("recommandation", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    });
}
