import React, { useState, useEffect } from "react";
import axios from "axios";
import DeleteTeamFormation from "./deleteteamformation";
import TeamFormationData from "./TeamFormationData";
import 'bulma/css/bulma.min.css';

const API_URL = "http://localhost/players/";

const TeamFormation = () => {
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [teamsByPosition, setTeamsByPosition] = useState([]);
  const [playersByPosition, setPlayersByPosition] = useState([]);
  const [playerImageUrl, setPlayerImageUrl] = useState("");
  const [teamFormations, setTeamFormations] = useState([]);
  const [addedTeamCount, setAddedTeamCount] = useState(0);
  const [selectedFormationData, setSelectedFormationData] = useState(null);
  const [selectedTeamPlayers, setSelectedTeamPlayers] = useState([]);
  const [downloadedPlayers, setDownloadedPlayers] = useState([]);

  useEffect(() => {
    fetchPlayersData();
    fetchTeamFormations();
  }, [currentPage, selectedTeam]);

  useEffect(() => {
    if (selectedTeam) {
      const positions = players
        .filter((player) => player.team_name === selectedTeam)
        .map((player) => player.position);

      setTeamsByPosition([...new Set(positions)]);
    }
  }, [selectedTeam]);

  useEffect(() => {
    if (selectedPosition && selectedTeam) {
      const relevantPlayers = players
        .filter(
          (player) => player.position === selectedPosition && player.team_name === selectedTeam
        )
        .map((player) => player.player_name);

      setPlayersByPosition([...new Set(relevantPlayers)]);
    }
  }, [selectedPosition, selectedTeam]);

  useEffect(() => {
    if (selectedPlayer) {
      const player = players.find((player) => player.player_name === selectedPlayer);
      if (player) {
        setPlayerImageUrl(player.player_image_url);
      }
    }
  }, [selectedPlayer, players]);

  useEffect(() => {
    if (selectedTeam && selectedPosition) {
      const playersInSelectedTeamAndPosition = players.filter(
        (player) => player.team_name === selectedTeam && player.position === selectedPosition
      );
      setSelectedTeamPlayers(playersInSelectedTeamAndPosition);
    }
  }, [selectedTeam, selectedPosition]);

  useEffect(() => {
    setDownloadedPlayers(players);
  }, [players]);

  const fetchPlayersData = async () => {
    try {
      const response = await axios.get(API_URL);
      const playersWithSize = response.data.map((player) => ({
        ...player,
        size: 48,
      }));
      setPlayers(playersWithSize);
    } catch (error) {
      console.error("Error fetching players data:", error);
    }
  };

  const fetchTeamFormations = async () => {
    try {
      const response = await axios.get("http://localhost/teamformation/");
      setTeamFormations(response.data);
    } catch (error) {
      console.error("Error fetching team formations data:", error);
    }
  };

  const handlePlayerClick = (player) => {
    setSelectedPlayer(player);
  };

  const handleTeamChange = (team) => {
    setSelectedTeam(team);
    setSelectedPosition(null);
  };

  const handlePositionChange = (position) => {
    setSelectedPosition(position);
  };

  const handleCloseDetails = () => {
    setSelectedTeam(null);
    setSelectedPosition(null);
    setSelectedPlayer(null);
    setPlayerImageUrl("");
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const deleteTeamFormation = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this team formation?");
    if (!confirmDelete) {
      return;
    }

    try {
      const response = await axios.delete(`http://localhost/teamformation/index.php/${id}`);

      if (response.data.status === 'success') {
        console.log('Team formation deleted successfully!');
        fetchTeamFormations();
      } else {
        console.error('Error deleting team formation:', response.data.message);
      }
    } catch (error) {
      console.error('Error deleting team formation:', error.message);
    }
  };

  const addTeamFormation = async () => {
    if (selectedTeam && selectedPosition && selectedPlayer && playerImageUrl) {
      if (addedTeamCount < 11) {
        try {
          const response = await axios.post("http://localhost/teamformation/", {
            teamname: selectedTeam,
            position: selectedPosition,
            playersname: selectedPlayer,
            playersimg: playerImageUrl,
          });

          if (response.data.status === 'success') {
            console.log('Team formation added successfully!');
            fetchTeamFormations();
            setAddedTeamCount(addedTeamCount + 1);
          } else {
            console.error('Error adding team formation:', response.data.message);
          }
        } catch (error) {
          console.error('Error adding team formation:', error.message);
        }
      } else {
        console.error('You can only add up to 11 teams.');
      }
    } else {
      console.error('Please select a team, position, player, and ensure player image is loaded.');
    }
  };

  const handleFormationDetailsClick = (formation) => {
    setSelectedFormationData(formation);
  };

  const handleDownloadFormationImage = async (imageUrl) => {
    try {
      const response = await axios.get(imageUrl, {
        responseType: 'arraybuffer',
      });

      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'team_formation_image.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading team formation image:', error.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="title is-3 mb-6 has-text-centered">จัดทีม</h1>

      <div className="columns">
        <div className="column">
          <div className="field">
            <label className="label">เลือกทีม</label>
            <div className="control">
              <div className="select">
                <select
                  value={selectedTeam || ""}
                  onChange={(e) => handleTeamChange(e.target.value)}
                >
                  <option value="">All Teams</option>
                  {Object.keys(players.reduce((acc, player) => {
                    acc[player.team_name] = true;
                    return acc;
                  }, {})).map((team) => (
                    <option key={team} value={team}>
                      {team}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {selectedTeam && (
            <div className="field">
              <label className="label">เลือกตำเเหน่งนักเตะ</label>
              <div className="control">
                <div className="select">
                  <select
                    value={selectedPosition || ""}
                    onChange={(e) => handlePositionChange(e.target.value)}
                  >
                    <option value="">All Positions</option>
                    {teamsByPosition.map((position) => (
                      <option key={position} value={position}>
                        {position}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {selectedPosition && selectedTeam && (
            <div className="field">
              <label className="label">เลือกนักเตะ</label>
              <div className="control">
                <div className="select">
                  <select
                    value={selectedPlayer || ""}
                    onChange={(e) => handlePlayerClick(e.target.value)}
                  >
                    <option value="">All Players</option>
                    {playersByPosition.map((player) => (
                      <option key={player} value={player}>
                        {player}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="column is-one-third">
          {playerImageUrl && (
            <div>
              <img
                src={playerImageUrl}
                alt="Selected Player"
                className="image is-rounded"
              />
              <div className="mt-2">
                <button
                  onClick={() => handleDownloadImage(playerImageUrl)}
                  className="button is-success is-small"
                >
                  Download Image
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            onClick={addTeamFormation}
            className="button is-primary"
          >
            ยืนยัน
          </button>
        </div>
        <div className="control">
          <button
            onClick={() => handleCloseDetails()}
            className="button is-danger"
          >
            ยกเลิก
          </button>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="title is-4 mb-4">นักเตะในทีม</h2>
        {teamFormations.length > 0 ? (
          <div className="columns is-multiline">
            {teamFormations.map((formation, index) => (
              <div key={index + 1} className="column is-2">
                <div className="card">
                  <div className="card-image">
                    <figure className="image is-0by0">
                      <img src={formation.playersimg} alt={formation.playersimg} />
                    </figure>
                  </div>
                  <div className="card-content">
                    <div className="content">
                      {selectedTeamPlayers.map((player) => (
                        <p key={player.id}>
                          <strong>Player Name:</strong> {player.player_name}
                        </p>
                      ))}
                      <p>
                        <strong>Position:</strong> {formation.position}
                      </p>
                      <p>
                        <strong>Actions:</strong>{" "}
                        <DeleteTeamFormation teamFormationId={formation.id} onDelete={() => fetchTeamFormations()} />
                        {' '}
                        <button
                          onClick={() => handleFormationDetailsClick(formation)}
                          className="button is-link is-small"
                        >
                          detail
                        </button>
                        {' '}
                        <button
                          onClick={() => handleDownloadFormationImage(formation.playersimg)}
                          className="button is-success is-small"
                        >
                          Download Image
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>ยังไม่มีข้อมูลนักเตะ</p>
        )}
      </div>

      {selectedFormationData && (
        <TeamFormationData
          formation={selectedFormationData}
          onClose={() => setSelectedFormationData(null)}
          selectedTeamPlayers={selectedTeamPlayers}
        />
      )}
    </div>
  );
};

export default TeamFormation;
