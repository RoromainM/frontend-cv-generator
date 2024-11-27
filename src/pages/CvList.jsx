import React, { useEffect, useState } from 'react';
import CvCard from '../components/cvCard';
import { getCvs } from '../service/backendFetch';

const CvList = () => {
  const [cvs, setCvs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCvs = async () => {
      try {
        const data = await getCvs();
        setCvs(data);
      } catch (error) {
        setError('Failed to load CVs');
        console.error('Error fetching CVs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCvs();
  }, []);

  if (loading) {
    return <p>Loading CVs...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="cv-list">
      <h1>List of CVs</h1>
      <div className="cv-cards-container">
        {cvs.map((cv) => (
          <CvCard key={cv._id} cv={cv} />
        ))}
      </div>
    </div>
  );
};

export default CvList;
