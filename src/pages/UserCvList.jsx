import React, { useState, useEffect, useContext } from "react";
import { getCvs } from "../service/backendFetch";
import { AuthContext } from "../context/AuthContext";

export const UserCvList = () => {
  const { userId } = useContext(AuthContext);
  const [cvs, setCvs] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCvs = async () => {
      try {
        const allCvs = await getCvs();
        const userCvs = allCvs.filter((cv) => cv.userId === userId);
        setCvs(userCvs);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchCvs();
    }
  }, [userId]);

  if (loading) return <p>Loading your CVs...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>My CVs</h1>
      <p>Here you can see all your CVs:</p>
      {cvs.length === 0 ? (
        <p>You have no CVs yet.</p>
      ) : (
        <ul>
          {cvs.map((cv) => (
            <li key={cv.id}>
              <h3>{cv.title}</h3>
              <p>Created on: {new Date(cv.createdAt).toLocaleDateString()}</p>
              <p>{cv.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
