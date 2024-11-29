import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCvById, updateCv, deleteCv } from '../service/backendFetch';
import { AuthContext } from '../context/AuthContext';
import FormInput from '../components/FormInput'; 
import '../pagesCss/CvDetail.css';

const CvDetail = () => {
  const { id } = useParams();
  const [cv, setCv] = useState(null);
  const [updatedCv, setUpdatedCv] = useState(null);
  const [editingCv, setEditingCv] = useState(false);
  const { v_isConnected } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCvDetails = async () => {
      try {
        const cvData = await getCvById(id);
        setCv(cvData);
        setUpdatedCv(cvData);
      } catch (err) {
        console.error('Error fetching CV:', err);
      }
    };

    fetchCvDetails();
  }, [id]);

  const handleEditCv = () => {
    setEditingCv(true);
  };

  const handleSaveCv = async () => {
    try {
      const updatedData = await updateCv(cv._id, updatedCv);
      setCv(updatedData);
      setEditingCv(false);
      window.location.reload();
    } catch (error) {
      console.error('Failed to update CV:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingCv(false);
    setUpdatedCv(cv);
  };

  const handleDeleteCv = async () => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this CV?');
      if (confirmDelete) {
        await deleteCv(cv._id);
        navigate('/userCv');
      }
    } catch (error) {
      console.error('Failed to delete CV:', error);
    }
  };

  const addEducation = () => {
    setUpdatedCv((prev) => ({
      ...prev,
      education: [...prev.education, { degree: "", institution: "", year: "" }],
    }));
  };

  const removeEducation = (index) => {
    setUpdatedCv((prev) => {
      const updatedEducation = [...prev.education];
      updatedEducation.splice(index, 1);
      return { ...prev, education: updatedEducation };
    });
  };

  const addExperience = () => {
    setUpdatedCv((prev) => ({
      ...prev,
      experience: [...prev.experience, { role: "", company: "", description: "" }],
    }));
  };

  const removeExperience = (index) => {
    setUpdatedCv((prev) => {
      const updatedExperience = [...prev.experience];
      updatedExperience.splice(index, 1);
      return { ...prev, experience: updatedExperience };
    });
  };

  if (!cv) {
    return <p>Loading CV...</p>;
  }

  return (
    <div>
      {editingCv ? (
        <div>
          {/* Formulaire d'édition */}
          <FormInput
            label="Name"
            type="text"
            value={updatedCv?.information?.name || ''}
            onChange={(e) =>
              setUpdatedCv((prev) => ({
                ...prev,
                information: { ...prev.information, name: e.target.value },
              }))
            }
          />
          <FormInput
            label="Description"
            type="textarea"
            value={updatedCv?.information?.description || ''}
            onChange={(e) =>
              setUpdatedCv((prev) => ({
                ...prev,
                information: { ...prev.information, description: e.target.value },
              }))
            }
          />

          <h3>Education</h3>
          <ul>
            {updatedCv?.education?.map((edu, index) => (
              <li key={index}>
                <FormInput
                  label="Degree"
                  type="text"
                  value={edu.degree || ''}
                  onChange={(e) => {
                    const newEducation = [...updatedCv.education];
                    newEducation[index].degree = e.target.value;
                    setUpdatedCv((prev) => ({
                      ...prev,
                      education: newEducation,
                    }));
                  }}
                />
                <FormInput
                  label="Institution"
                  type="text"
                  value={edu.institution || ''}
                  onChange={(e) => {
                    const newEducation = [...updatedCv.education];
                    newEducation[index].institution = e.target.value;
                    setUpdatedCv((prev) => ({
                      ...prev,
                      education: newEducation,
                    }));
                  }}
                />
                <FormInput
                  label="Year"
                  type="text"
                  value={edu.year || ''}
                  onChange={(e) => {
                    const newEducation = [...updatedCv.education];
                    newEducation[index].year = e.target.value;
                    setUpdatedCv((prev) => ({
                      ...prev,
                      education: newEducation,
                    }));
                  }}
                />
                <button type="button" onClick={() => removeEducation(index)}>
                  Remove Education
                </button>
              </li>
            ))}
          </ul>
          <button type="button" onClick={addEducation}>Add Education</button>

          <h3>Experience</h3>
          <ul>
            {updatedCv?.experience?.map((exp, index) => (
              <li key={index}>
                <FormInput
                  label="Role"
                  type="text"
                  value={exp.role || ''}
                  onChange={(e) => {
                    const newExperience = [...updatedCv.experience];
                    newExperience[index].role = e.target.value;
                    setUpdatedCv((prev) => ({
                      ...prev,
                      experience: newExperience,
                    }));
                  }}
                />
                <FormInput
                  label="Company"
                  type="text"
                  value={exp.company || ''}
                  onChange={(e) => {
                    const newExperience = [...updatedCv.experience];
                    newExperience[index].company = e.target.value;
                    setUpdatedCv((prev) => ({
                      ...prev,
                      experience: newExperience,
                    }));
                  }}
                />
                <FormInput
                  label="Description"
                  type="textarea"
                  value={exp.description || ''}
                  onChange={(e) => {
                    const newExperience = [...updatedCv.experience];
                    newExperience[index].description = e.target.value;
                    setUpdatedCv((prev) => ({
                      ...prev,
                      experience: newExperience,
                    }));
                  }}
                />
                <button type="button" onClick={() => removeExperience(index)}>
                  Remove Experience
                </button>
              </li>
            ))}
          </ul>
          <button type="button" onClick={addExperience}>Add Experience</button>

          <p>
            <strong>Visibility:</strong>
            <select
              value={updatedCv?.visibilite || ''}
              onChange={(e) =>
                setUpdatedCv((prev) => ({
                  ...prev,
                  visibilite: e.target.value === 'true',
                }))
              }
            >
              <option value="true">Visible</option>
              <option value="false">Hidden</option>
            </select>
          </p>

          <button onClick={handleSaveCv}>Save</button>
          <button onClick={handleCancelEdit}>Cancel</button>
        </div>
      ) : (
        <div>
          {/* Affichage du CV */}
          <h1>{cv.information?.name || 'No name available'}</h1>
          <p>{cv.information?.description || 'No description available'}</p>

          <h3>Education</h3>
          <ul>
            {cv.education?.map((edu, index) => (
              <li key={index}>
                <strong>{edu.degree}</strong> from {edu.institution} ({edu.year})
              </li>
            ))}
          </ul>

          <h3>Experience</h3>
          <ul>
            {cv.experience?.map((exp, index) => (
              <li key={index}>
                <strong>{exp.role}</strong> at {exp.company}: {exp.description}
              </li>
            ))}
          </ul>

          <p>
            <strong>Visibility:</strong> {cv.visibilite ? 'Visible' : 'Hidden'}
          </p>

          {v_isConnected && (
            <>
              <button onClick={handleEditCv}>Edit CV</button>
              <button onClick={handleDeleteCv} style={{ backgroundColor: 'red', color: 'white' }}>
                Delete CV
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CvDetail;
