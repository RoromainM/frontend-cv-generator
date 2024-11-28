import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { user } = useContext(AuthContext);

  if (!user) return <p>Please log in to view your profile.</p>;

  return <div>Welcome, {user.userId}!</div>;
};

export default Home;
