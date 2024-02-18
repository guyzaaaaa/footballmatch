import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bulma/css/bulma.min.css';

const API_URL = "http://localhost/players/";
const POLLING_INTERVAL = 5000; // 5 seconds

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 8;

  useEffect(() => {
    fetchPlayersData();
    const intervalId = setInterval(fetchPlayersData, POLLING_INTERVAL);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [currentPage, searchQuery]);

  const fetchPlayersData = async () => {
    try {
      const response = await axios.get(API_URL);
      const playersWithSizeAndColor = response.data.map((player) => ({
        ...player,
        size: 48,
        color: getRandomColor(),
      }));

      const filteredPlayers = playersWithSizeAndColor.filter((player) =>
        player.player_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        player.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
        player.nationality.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setPlayers(filteredPlayers);
    } catch (error) {
      console.error("Error fetching players data:", error);
    }
  };

  const getRandomColor = () => {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
  };

  const handlePlayerClick = (player) => {
    setSelectedPlayer(player);
  };

  const handleCloseDetails = () => {
    setSelectedPlayer(null);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const paginatedPlayers = players.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container my-6">
      <h1 className="title is-2 has-text-centered mb-4">Football Players</h1>

      <div className="field mb-4">
        <div className="control">
          <input
            type="text"
            className="input"
            placeholder="ค้นหานักเตะด้วยชื่อ, ตำแหน่ง, หรือสัญชาติ"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="columns is-multiline">
        {paginatedPlayers.map((player) => (
          <div key={player.player_id} className="column is-3">
            <div
              className={`box p-4 is-rounded shadow cursor-pointer transform hover:scale-105 transition-transform mb-4`}
              style={{ backgroundColor: player.color }}
              onClick={() => handlePlayerClick(player)}
            >
              <img
                src={player.player_image_url}
                alt={player.player_name}
                className="image is-rounded is-fullwidth"
              />
              <p className="subtitle is-5 has-text-white">{player.player_name}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedPlayer && (
        <div className="modal is-active">
          <div className="modal-background" onClick={handleCloseDetails}></div>
          <div className="modal-content">
            <div className="box">
              <button
                onClick={handleCloseDetails}
                className="button is-primary is-pulled-right"
              >
                Close
              </button>
              <h2 className="title is-2">{selectedPlayer.player_name}</h2>
              <p className="subtitle is-5">Team: {selectedPlayer.team_name}</p>
              <p className="subtitle is-5">Position: {selectedPlayer.position}</p>
              <p className="subtitle is-5">Nationality: {selectedPlayer.nationality}</p>
              <img
                src="https://static.wikia.nocookie.net/logopedia/images/d/d9/T1_Logo2.png/revision/latest?cb=20170117095117"
                alt="T1 Logo"
                className="image is-rounded is-128x128 mt-4 ml-auto"
              />
              <img
                src={selectedPlayer.player_image_url}
                alt={selectedPlayer.player_name}
                className="image is-rounded is-fullwidth mt-4"
              />
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 columns is-centered">
        {[...Array(Math.ceil(players.length / itemsPerPage)).keys()].map((number) => (
          <button
            key={number + 1}
            onClick={() => handlePageChange(number + 1)}
            className={`button mx-2 ${
              currentPage === number + 1 ? "is-primary" : "is-light"
            }`}
          >
            {number + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Players;
