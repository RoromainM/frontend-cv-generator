import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCvById } from '../service/backendFetch';

const CvDetail = () => {
  const { id } = useParams();
  const [cv, setCv] = useState(null);

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

  if (!cv) {
    return <p>Loading...</p>;
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
    </div>
  );
};

export default CvDetail;
