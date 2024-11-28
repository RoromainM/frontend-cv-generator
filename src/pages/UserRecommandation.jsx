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
      <div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
  
        <h3>Recommendations for You</h3>
  
        {recommendations.length > 0 ? (
          <ul>
            {recommendations.map((rec) => (
              <li key={rec._id}>
                <strong>{rec.author?.firstname} {rec.author?.lastname}</strong>:
                <p>{rec.content}</p>
                <p><strong>CV Name :</strong> {rec.CVNote.information.name}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No recommendations found for your CVs.</p>
        )}
      </div>
    );
  };
  
  export default UserRecommendation;
  