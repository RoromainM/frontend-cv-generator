import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCvById, getRecommendationsForCV, createRecommendation, deleteRecommendation  } from '../service/backendFetch';
import { AuthContext } from "../context/AuthContext";
import FormInput from '../components/FormInput'; 

const CvDetail = () => {
const { id } = useParams();
const [cv, setCv] = useState(null);
const [v_recommendations, setRecommendations] = useState([]);
const [error, setError] = useState(null);
const { v_isConnected, user } = useContext(AuthContext);
const [newRecommendation, setNewRecommendation] = useState("");
const [v_CvOwner, setCvOwner] = useState("");

useEffect(() => {
  const fetchCvDetails = async () => {
    try {
      const cvData = await getCvById(id);
      setCvOwner(cvData.user);
      setCv(cvData);

      const recData = await getRecommendationsForCV(id);
      setRecommendations(recData);
    } catch (err) {
      setError(err.message);
    }
  };

  fetchCvDetails();
}, [id]);

const handleRecommendationSubmit = async (e) => {
  e.preventDefault();

  if (newRecommendation.trim() === "") {
    return;
  }

  try {
    const data = await createRecommendation({
      CVNote: id,           
      content: newRecommendation,
    });
    console.log(id);
    console.log('data : ' + data);
    setRecommendations([data, ...v_recommendations]);
    setNewRecommendation("");
    window.location.reload();
  } catch (error) {
    console.error("Erreur lors de l'ajout de la recommandation:", error);
  }
};

const handleDeleteRecommendation = async (id) => {
  if (window.confirm("Are you sure you want to delete this recommendation?")) {
    try {
      await deleteRecommendation(id);
      setRecommendations((prev) => prev.filter((rec) => rec._id !== id));
    } catch (error) {
      console.error("Failed to delete recommendation:", error);
    }
  }
};


  if (!cv) {
    return <p>Loading CV...</p>;
  }

  return (
    <div>
      <h1>{cv.information.name}</h1>
      <p>{cv.information.description}</p>

      <h3>Education</h3>
      <ul>
        {cv.education.map((edu, index) => (
          <li key={index}>
            <strong>{edu.degree}</strong> from {edu.institution} ({edu.year})
          </li>
        ))}
      </ul>

      <h3>Experience</h3>
      <ul>
        {cv.experience.map((exp, index) => (
          <li key={index}>
            <strong>{exp.role}</strong> at {exp.company}: {exp.description}
          </li>
        ))}
      </ul>

      <p><strong>Visibility:</strong> {cv.visibilite ? 'Visible' : 'Hidden'}</p> 

      {v_isConnected && (
        <div style={{ marginBottom: '20px' }}>
          <h4>Ajouter une recommandation</h4>
          <form onSubmit={handleRecommendationSubmit}>
            <FormInput
              label="Votre recommandation"
              type="text"
              name="recommendation"
              value={newRecommendation}
              onChange={(e) => setNewRecommendation(e.target.value)}
              placeholder="Écrivez votre recommandation ici..."
            />
            <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px' }}>
              Soumettre
            </button>
          </form>
        </div>
      )}

      <h3>Recommendations</h3>
      {v_recommendations.length > 0 ? (
        <ul>
          {v_recommendations.map((rec) => (
            <li key={rec._id}>
              {rec.author ? (
                <strong>
                  {rec.author.firstname || "Unknown"} {rec.author.lastname || "Unknown"}:
                </strong>
              ) : (
                <strong>Unknown Author:</strong>
              )} 
              {rec.content}
              {v_isConnected && (
                (user.userId === rec.author?._id || user.userId === v_CvOwner) && (
                  <span style={{ marginLeft: "10px" }}>
                    <button onClick={() => handleEditRecommendation(rec)}
                      style={{
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        color: "blue",
                      }}>
                      ✏️
                    </button>
  
                    <button
                      onClick={() => handleDeleteRecommendation(rec._id)}
                      style={{
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        color: "red",
                        marginLeft: "5px"
                      }}>
                      🗑️
                    </button>
                  </span>
                )
              )}
              
            </li>
          ))}
        </ul>
      ) : (
        <p>No recommendations available for this CV.</p>
      )}   

    </div>
  );
};

export default CvDetail;
