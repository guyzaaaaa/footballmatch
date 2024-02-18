import React, { useState, useEffect } from "react";
import axios from "axios";
import EditPlayers from "./Editplayers";
import AddPlayers from "./Addplayers";
import DeletePlayers from "./deleteplayers";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const CrudPlayers = () => {
  const [players, setPlayers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [playerToDelete, setPlayerToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchPlayersData();
  }, [currentPage]);

  const fetchPlayersData = async () => {
    try {
      const response = await axios.get("http://localhost/players/index.php/");
      setPlayers(response.data);
    } catch (error) {
      console.error("Error fetching players data:", error);
    }
  };

  const handleOpenForm = () => {
    setShowForm(true);
    setSelectedPlayer(null);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    fetchPlayersData();
  };

  const handleEditPlayer = (player) => {
    setSelectedPlayer(player);
    setShowForm(true);
  };

  const handleDeletePlayer = (playerId) => {
    setShowDeleteModal(true);
    setPlayerToDelete(playerId);
  };

  const handleConfirmDelete = () => {
    setShowDeleteModal(false);
    setPlayerToDelete(null);
    fetchPlayersData();
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPlayers = players.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">จัดการข้อมูลนักเตะ</h1>
      <button
        onClick={handleOpenForm}
        className="button is-primary mb-4"
      >
        <FontAwesomeIcon icon={faPlus} className="mr-2" />
        เพิ่มนักเตะใหม่
      </button>
      {showForm && (
        selectedPlayer ? (
          <EditPlayers
            handleCloseForm={handleCloseForm}
            fetchPlayersData={fetchPlayersData}
            selectedPlayer={selectedPlayer}
          />
        ) : (
          <AddPlayers
            handleCloseForm={handleCloseForm}
            fetchPlayersData={fetchPlayersData}
          />
        )
      )}
      <table className="table is-fullwidth is-bordered is-striped is-narrow">
        <thead>
          <tr>
            <th>ID</th>
            <th>ชื่อ</th>
            <th>ทีมที่อยู่</th>
            <th>ตำเเหน่ง</th>
            <th>สัญชาติ</th>
            <th>รูปนักเตะ</th>
            <th>จัดการข้อมูล</th>
          </tr>
        </thead>
        <tbody>
          {currentPlayers.map((player) => (
            <tr key={player.player_id}>
              <td>{player.player_id}</td>
              <td>{player.player_name}</td>
              <td>{player.team_name}</td>
              <td>{player.position}</td>
              <td>{player.nationality}</td>
              <td>
                <img
                  src={player.player_image_url}
                  alt={`Player: ${player.player_name}`}
                  className="image is-64x64"
                />
              </td>
              <td>
                <button
                  onClick={() => handleEditPlayer(player)}
                  className="button is-warning"
                >
                  <FontAwesomeIcon icon={faEdit} className="mr-2" />
                  เเก้ไข
                </button>
                <button
                  onClick={() => handleDeletePlayer(player.player_id)}
                  className="button is-danger ml-2"
                >
                  <FontAwesomeIcon icon={faTrash} className="mr-2" />
                  ลบ
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showDeleteModal && (
        <DeletePlayers
          playerId={playerToDelete}
          onClose={handleConfirmDelete}
          onDelete={fetchPlayersData}
        />
      )}

      <div className="pagination is-centered mt-4">
        <ul className="pagination-list">
          {[...Array(Math.ceil(players.length / itemsPerPage)).keys()].map((number) => (
            <li key={number + 1}>
              <button
                className={`button pagination-link ${
                  currentPage === number + 1 ? "is-current" : ""
                }`}
                onClick={() => paginate(number + 1)}
              >
                {number + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CrudPlayers;
