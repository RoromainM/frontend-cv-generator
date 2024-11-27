import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCvById, getRecommendationsForCV } from '../service/backendFetch';

const CvDetail = () => {
const { id } = useParams();
const [cv, setCv] = useState(null);
const [v_recommendations, setRecommendations] = useState([]);
const [error, setError] = useState(null);

useEffect(() => {
  const fetchCvDetails = async () => {
    try {
      const cvData = await getCvById(id);
      setCv(cvData);

      const recData = await getRecommendationsForCV(id);
      setRecommendations(recData);
    } catch (err) {
      setError(err.message);
    }
  };

  fetchCvDetails();
}, [id]);


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

      <h3>Recommendations</h3>
      {v_recommendations.length > 0 ? (
        <ul>
          {v_recommendations.map((rec) => (
            <li key={rec._id}>
              <strong>{rec.author.firstname} {rec.author.lastname}:</strong> {rec.content}
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
