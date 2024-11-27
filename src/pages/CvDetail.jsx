import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCvById, getRecommendationsForCv } from '../service/backendFetch';

const CvDetail = () => {
  const { id } = useParams();
  const [cv, setCv] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loadingRecommendations, setLoadingRecommendations] = useState(true);
  const [errorRecommendations, setErrorRecommendations] = useState(null);

  // Charger les détails du CV
  useEffect(() => {
    const fetchCvDetails = async () => {
      try {
        const data = await getCvById(id);
        setCv(data);
      } catch (error) {
        console.error('Error fetching CV details:', error);
      }
    };

    fetchCvDetails();
  }, [id]);

  // Charger les recommandations pour ce CV
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const data = await getRecommendationsForCv(id);
        setRecommendations(data);
      } catch (error) {
        setErrorRecommendations('Failed to load recommendations');
        console.error('Error fetching recommendations:', error);
      } finally {
        setLoadingRecommendations(false);
      }
    };

    fetchRecommendations();
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

      {/* Afficher les recommandations */}
      <h3>Recommendations</h3>
      {loadingRecommendations ? (
        <p>Loading recommendations...</p>
      ) : errorRecommendations ? (
        <p>{errorRecommendations}</p>
      ) : (
        <div>
          {recommendations.length === 0 ? (
            <p>No recommendations available.</p>
          ) : (
            recommendations.map((recommendation) => (
              <div key={recommendation._id} className="recommendation-card">
                <h4>By {recommendation.author.firstname} {recommendation.author.lastname}</h4>
                <p><strong>Content:</strong> {recommendation.content}</p>
                <p><em>CV: {recommendation.CVNote.personalInfo}</em></p>
                <p><em>{new Date(recommendation.createdAt).toLocaleString()}</em></p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default CvDetail;
