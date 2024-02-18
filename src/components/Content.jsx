import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import 'bulma/css/bulma.min.css';

const API_URL = "http://localhost/footballthaileague11/";

const Content = () => {
  const [places, setPlaces] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const teamsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchPlaces();
  }, []);

  const fetchPlaces = async () => {
    try {
      const response = await axios.get(API_URL);
      setPlaces(response.data);
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };

  const indexOfLastTeam = currentPage * teamsPerPage;
  const indexOfFirstTeam = indexOfLastTeam - teamsPerPage;

  const filteredTeams = places.filter((team) =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.shirt_data.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentTeams = filteredTeams.slice(indexOfFirstTeam, indexOfLastTeam);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="field mb-4 mx-auto text-center">
        <input
          type="text"
          placeholder="ค้นหาทีม..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input is-rounded"
        />
      </div>
      <div className="columns is-multiline">
        {currentTeams.map((team, index) => (
          <div key={index} className="column is-4">
            <Card teams={team} />
          </div>
        ))}
      </div>
      <div className="mt-4 has-text-centered">
        {Array.from({ length: Math.ceil(filteredTeams.length / teamsPerPage) }, (_, i) => (
          <button
            key={i}
            className={`button mx-2 ${currentPage === i + 1 ? "is-primary" : ""}`}
            onClick={() => paginate(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Content;
