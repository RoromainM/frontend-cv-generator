import React from 'react';
import { useNavigate } from 'react-router-dom';

const CvCard = ({ cv }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/cv/${cv._id}`);
  };

  const experience = cv.experience && cv.experience.length > 0 ? cv.experience[0] : null;

  return (
    <div className="cv-card" onClick={handleClick}>
      <h3>{cv.information.name}</h3>
      <p>{cv.information.description}</p>
      
      {experience ? (
        <div className="cv-experience">
          <h4>Experience</h4>
          <p><strong>Role:</strong> {experience.role}</p>
          <p><strong>Company:</strong> {experience.company}</p>
          <p><strong>Description:</strong> {experience.description}</p>
        </div>
      ) : (
        <p>No experience available.</p>
      )}
    </div>
  );
};

export default CvCard;
