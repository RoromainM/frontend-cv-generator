import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCvById, getRecommendationsForCV, createRecommendation, deleteRecommendation, updateRecommandation, deleteCv } from '../service/backendFetch';
import { AuthContext } from "../context/AuthContext";
import FormInput from '../components/FormInput'; 
import '../pagesCss/CvDetail.css';  // Chemin du fichier CSS

const CvDetail = () => {
const { id } = useParams();
const [cv, setCv] = useState(null);
const [v_recommendations, setRecommendations] = useState([]);
const [error, setError] = useState(null);
const { v_isConnected, user } = useContext(AuthContext);
const [newRecommendation, setNewRecommendation] = useState("");
const [v_CvOwner, setCvOwner] = useState("");
const [editingRec, setEditingRec] = useState(null);
const [updatedContent, setUpdatedContent] = useState("");

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

const handleEditRecommendation = (rec) => {
  setEditingRec(rec._id);
  setUpdatedContent(rec.content);
};

const handleSaveRecommendation = async (e) => {
  e.preventDefault();

  if (updatedContent.trim() === "") {
    return;
  }

  try {
    const updatedRecommendation = await updateRecommandation(editingRec, {
      CVNote: id,
      content: updatedContent,
    });

    const updatedRecommendations = v_recommendations.map((rec) =>
      rec._id === editingRec ? { ...rec, content: updatedContent } : rec
    );
    setRecommendations(updatedRecommendations);

    setEditingRec(null);
    setUpdatedContent("");
  } catch (error) {
    console.error("Erreur lors de la modification :", error);
  }
};

handleDeleteCv = async (id) => {
  if (window.confirm("Are you sure you want to delete this CV?")) {
    try {
      await deleteCv(id);
      history.push("/userCv");
    } catch (error) {
      console.error("Failed to delete CV:", error);
    }
  }
};

handleEditCv = async (id) => {
  const updatedCv = {
    information: {
      name: "Updated Name",
      description: "Updated Description",
    },
  };

  try {
    const response = await updateCv(id, updatedCv);
    setCv(response);
    console.log("CV updated successfully:", response);
  } catch (error) {
    console.error("Failed to update CV:", error);
  }
};

handleSaveCv = async (id) => {
  const updatedCv = {
    information: {
      name: "Updated Name",
      description: "Updated Description",
    },
  };

  try {
    const response = await updateCv(id, updatedCv);
    setCv(response);
    console.log("CV updated successfully:", response);
  }
  catch (error) {
    console.error("Failed to update CV:", error);
  }
};



  if (!cv) {
    return <p>Loading CV...</p>;
  }

  return (
    <div>
      {/* 
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
      */}
      {v_isConnected && (
        (user.userId === rec.author?._id || user.userId === v_CvOwner) && (
          <div className="actionButtons">
            <button onClick={() => handleEditCv(cv._id)} className="editButton">
              ✏️ Edit CV
            </button>
            <button onClick={() => handleDeleteCv(cv._id)} className="deleteButton">
              🗑️ Delete CV
            </button>
          </div>
        )
      )}


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

            <span>
              <span>
                {editingRec === rec._id ? (
                  <span
                    contentEditable
                    suppressContentEditableWarning={true}
                    className="editableContent"
                    onBlur={(e) => setUpdatedContent(e.target.innerText)}
                    dangerouslySetInnerHTML={{ __html: rec.content }}
                  />
                ) : (
                  <span>{rec.content}</span>
                )}
              </span>

              {v_isConnected && (
                (user.userId === rec.author?._id || user.userId === v_CvOwner) && (
                  <span className="actionButtons">
                    {user.userId === rec.author?._id ? (
                      editingRec === rec._id ? (
                        <span>
                          <button
                            onClick={handleSaveRecommendation}
                            className="saveButton"
                          >
                            💾 Save
                          </button>
                          <button
                            onClick={() => setEditingRec(null)}
                            className="cancelButton"
                          >
                            ❌ Cancel
                          </button>
                        </span>
                      ) : (
                        <button
                          onClick={() => handleEditRecommendation(rec)}
                          className="editButton"
                        >
                          ✏️
                        </button>
                      )
                    ) : null}

                    <button
                      onClick={() => handleDeleteRecommendation(rec._id)}
                      className="deleteButton"
                    >
                      🗑️
                    </button>
                  </span>
                )
              )}
            </span>
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
