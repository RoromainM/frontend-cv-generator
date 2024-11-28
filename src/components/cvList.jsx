import React, { useState, useEffect, useContext } from "react";
import CvCard from "../components/cvCard";
import { getCvs } from "../service/backendFetch";
import { AuthContext } from "../context/AuthContext";

const CvList = ({ filterUser = false, title }) => {
  const { user } = useContext(AuthContext);
  const [cvs, setCvs] = useState([]);
  const [filteredCvs, setFilteredCvs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Fonction de recherche
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filtrer les CVs en fonction du nom si la recherche est activée
  const filterCvsBySearch = (cvList) => {
    if (!searchQuery) return cvList;
    return cvList.filter((cv) =>
      cv.information.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  useEffect(() => {
    const fetchCvs = async () => {
      try {
        const allCvs = await getCvs();
        const filteredCvs = filterUser && user?.userId
          ? allCvs.filter((cv) => String(cv.user) === String(user.userId))
          : allCvs;

        // Appliquer la recherche uniquement si ce n'est pas une liste filtrée par utilisateur
        if (!filterUser) {
          setFilteredCvs(filterCvsBySearch(filteredCvs));
        } else {
          setFilteredCvs(filteredCvs);
        }
        setCvs(filteredCvs);
        console.log("CVs loaded:", filteredCvs);
        
      } catch (error) {
        setError("Failed to load CVs");
        console.error("Error fetching CVs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCvs();
  }, [filterUser, user, searchQuery]);

  // Si la liste est en cours de chargement ou si une erreur survient
  if (loading) return <p>Loading CVs...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="cv-list">
      <h1>{title}</h1>

      {!filterUser && (
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by CV name..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      )}

      {filteredCvs.length === 0 ? (
        <p>{filterUser ? "You have no CVs yet." : "No CVs found."}</p>
      ) : (
        <div className="cv-cards-container">
          {filteredCvs.map((cv) => (
            <CvCard key={cv._id} cv={cv} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CvList;
