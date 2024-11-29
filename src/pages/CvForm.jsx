import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { createCv } from "../service/backendFetch";
import { useNavigate } from "react-router-dom";

const CvForm = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    education: [{ degree: "", institution: "", year: "" }],
    experience: [{ role: "", company: "", description: "" }],
    visibilite: true,
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEducationChange = (e, index) => {
    const { name, value } = e.target;
    const updatedEducation = [...formData.education];
    updatedEducation[index][name] = value;
    setFormData({
      ...formData,
      education: updatedEducation,
    });
  };

  const handleExperienceChange = (e, index) => {
    const { name, value } = e.target;
    const updatedExperience = [...formData.experience];
    updatedExperience[index][name] = value;
    setFormData({
      ...formData,
      experience: updatedExperience,
    });
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [...formData.education, { degree: "", institution: "", year: "" }],
    });
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [...formData.experience, { role: "", company: "", description: "" }],
    });
  };

  const removeEducation = (index) => {
    const updatedEducation = formData.education.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      education: updatedEducation,
    });
  };

  const removeExperience = (index) => {
    const updatedExperience = formData.experience.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      experience: updatedExperience,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("User is not authenticated.");
      return;
    }

    setLoading(true);
    try {
      const cvData = {
        user: user.userId,
        information: {
          name: formData.name,
          description: formData.description,
        },
        education: formData.education,
        experience: formData.experience,
        visibilite: formData.visibilite,
      };

      const response = await createCv(cvData);
      console.log("CV created successfully:", response);
      navigate("/cv");
    } catch (err) {
      console.error("Error during CV creation:", err);
      setError("CV creation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div>
        <p>Create Your CV</p>
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter a brief description"
            />
          </div>

          {/* Education */}
          <div>
            <label>Education</label>
            {formData.education.map((edu, index) => (
              <div key={index}>
                <div>
                  <label htmlFor={`degree-${index}`}>Degree</label>
                  <input
                    type="text"
                    id={`degree-${index}`}
                    name="degree"
                    value={edu.degree}
                    onChange={(e) => handleEducationChange(e, index)}
                    placeholder="Enter your degree"
                  />
                </div>
                <div>
                  <label htmlFor={`institution-${index}`}>Institution</label>
                  <input
                    type="text"
                    id={`institution-${index}`}
                    name="institution"
                    value={edu.institution}
                    onChange={(e) => handleEducationChange(e, index)}
                    placeholder="Enter your institution"
                  />
                </div>
                <div>
                  <label htmlFor={`year-${index}`}>Year</label>
                  <input
                    type="text"
                    id={`year-${index}`}
                    name="year"
                    value={edu.year}
                    onChange={(e) => handleEducationChange(e, index)}
                    placeholder="Enter the year"
                  />
                </div>
                <button type="button" onClick={() => removeEducation(index)}>
                  Remove Education
                </button>
              </div>
            ))}
            <button type="button" onClick={addEducation}>
              Add Education
            </button>
          </div>

          {/* Experience */}
          <div>
            <label>Experience</label>
            {formData.experience.map((exp, index) => (
              <div key={index}>
                <div>
                  <label htmlFor={`role-${index}`}>Role</label>
                  <input
                    type="text"
                    id={`role-${index}`}
                    name="role"
                    value={exp.role}
                    onChange={(e) => handleExperienceChange(e, index)}
                    placeholder="Enter your role"
                  />
                </div>
                <div>
                  <label htmlFor={`company-${index}`}>Company</label>
                  <input
                    type="text"
                    id={`company-${index}`}
                    name="company"
                    value={exp.company}
                    onChange={(e) => handleExperienceChange(e, index)}
                    placeholder="Enter your company"
                  />
                </div>
                <div>
                  <label htmlFor={`description-${index}`}>Description</label>
                  <input
                    type="text"
                    id={`description-${index}`}
                    name="description"
                    value={exp.description}
                    onChange={(e) => handleExperienceChange(e, index)}
                    placeholder="Describe your experience"
                  />
                </div>
                <button type="button" onClick={() => removeExperience(index)}>
                  Remove Experience
                </button>
              </div>
            ))}
            <button type="button" onClick={addExperience}>
              Add Experience
            </button>
          </div>

          {/* Visibility */}
          <div>
            <label htmlFor="visibilite">Visibility</label>
            <input
              type="checkbox"
              id="visibilite"
              name="visibilite"
              checked={formData.visibilite}
              onChange={(e) =>
                setFormData({ ...formData, visibilite: e.target.checked })
              }
            />
          </div>

          {/* Error message */}
          {error && <p>{error}</p>}

          {/* Submit Button */}
          <div>
            <button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create CV"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CvForm;
