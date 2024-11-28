import React, { useState, useEffect, useContext } from "react";
import CvCard from "../components/cvCard";
import { getCvs } from "../service/backendFetch";
import { AuthContext } from "../context/AuthContext";

const CvList = ({ filterUser = false, title }) => {
  const { user } = useContext(AuthContext);
  const [cvs, setCvs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCvs = async () => {
      try {
        const allCvs = await getCvs();
        const filteredCvs = filterUser && user?.userId 
          ? allCvs.filter((cv) => String(cv.user) === String(user.userId))
          : allCvs;

        setCvs(filteredCvs);
      } catch (error) {
        setError("Failed to load CVs");
        console.error("Error fetching CVs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCvs();
  }, [filterUser, user]);

  if (loading) return <p>Loading CVs...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="cv-list">
      <h1>{title}</h1>
      {cvs.length === 0 ? (
        <p>No CVs found.</p>
      ) : (
        <div className="cv-cards-container">
          {cvs.map((cv) => (
            <CvCard key={cv._id} cv={cv} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CvList;
