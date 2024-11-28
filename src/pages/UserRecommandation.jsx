import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getRecommendationsForUser } from '../service/backendFetch';

const UserRecommendation = () => {
    const { user, v_isConnected } = useContext(AuthContext); // useContext ici
    const [recommendations, setRecommendations] = useState([]);
    const [error, setError] = useState(null);
  
    // On s'assure que le hook useEffect est toujours appelé dans le même ordre
    useEffect(() => {
      // Si l'utilisateur n'est pas connecté, ne pas faire de requêtes
      if (!v_isConnected) {
        setRecommendations([]); // Ou tout autre comportement souhaité
        return;
      }
  
      const fetchRecommendations = async () => {
        try {
          const recData = await getRecommendationsForUser();
          console.log(recData);
          setRecommendations(recData); // Mettre à jour l'état avec les recommandations
        } catch (err) {
          setError(err.message); // Gérer les erreurs
        }
      };
  
      fetchRecommendations();
    }, [v_isConnected]); // On inclut toutes les variables de dépendance nécessaires
  
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
  