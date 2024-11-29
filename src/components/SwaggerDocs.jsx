// src/components/SwaggerDocs.js
import React from 'react';
import SwaggerUI from 'swagger-ui-react'; // Importation de Swagger UI React
import 'swagger-ui-react/swagger-ui.css'; // Importation du CSS pour Swagger UI

const SwaggerDocs = () => {
  return (
    <div>
      <h1>Documentation de l'API</h1>
      <SwaggerUI url="http://localhost:3000/api-docs" /> {/* Lien vers la documentation Swagger */}
    </div>
  );
};

export default SwaggerDocs; // Export du composant pour pouvoir l'utiliser dans d'autres fichiers
