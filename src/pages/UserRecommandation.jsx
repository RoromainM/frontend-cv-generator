import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getRecommendationsForUser } from '../service/backendFetch';

const UserRecommendation = () => {
    const { user, v_isConnected } = useContext(AuthContext);
    const [recommendations, setRecommendations] = useState([]);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      if (!v_isConnected) {
        setRecommendations([]);
        return;
      }
  
      const fetchRecommendations = async () => {
        try {
          const recData = await getRecommendationsForUser();
          console.log(recData);
          setRecommendations(recData);
        } catch (err) {
          setError(err.message);
        }
      };
  
      fetchRecommendations();
    }, [v_isConnected]);
  
    return (
      <div className="recommendation-container">
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <h3 className="recommendation-title">Recommendations for You</h3>

          {recommendations.length > 0 ? (
              <ul className="recommendation-list">
                  {recommendations.map((rec) => (
                      <li key={rec._id} className="recommendation-item">
                          <div className="recommendation-author">
                            <strong>{rec.author?.firstname} {rec.author?.lastname}</strong>
                          </div>
                          <p className="recommendation-content">{rec.content}</p>
                          <p className="recommendation-cv-name">
                              CV Name: {rec.CVNote?.information?.name || 'N/A'}
                          </p>
                      </li>
                  ))}
              </ul>
          ) : (
              <p className="no-recommendations">No recommendations found for your CVs.</p>
          )}
      </div>
  );
    
};
export default UserRecommendation;