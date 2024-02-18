import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import EditTeamModal from "./EditTeamModal";
import AddNewTeamModal from "./AddNewTeamModal";
import DeleteTeamModal from "./deleteteam";
import axios from "axios";
import { Link } from 'react-router-dom';

export default function AdminPage() {
  const [teams, setTeams] = useState([]);
  const [visibleTeams, setVisibleTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const handleClick = () => {
    localStorage.clear();
    window.location.href = '/LoginWithLocalStorage';
  };

  useEffect(() => {
    getTeams();
  }, []);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setVisibleTeams(teams.slice(startIndex, endIndex));
  }, [teams, currentPage]);

  const handleEditClick = (team) => {
    setSelectedTeam(team);
    setIsEditing(true);
  };

  const handleAddNewClick = () => {
    setIsAddingNew(true);
  };

  const handleAddNewClose = () => {
    setIsAddingNew(false);
  };

  const handleModalClose = () => {
    setIsEditing(false);
    setIsDeleting(false);
    setSelectedTeam(null);
  };

  const handleDeleteClick = (team) => {
    setSelectedTeam(team);
    setIsDeleting(true);
  };

  const handleDeleteClose = () => {
    setIsDeleting(false);
  };

  const handleDeleteConfirm = () => {
    axios
      .delete(`http://localhost/footballthaileague11/index.php/${selectedTeam.id}`)
      .then((response) => {
        console.log("Team deleted successfully.");
        getTeams();
        handleModalClose();
      })
      .catch((error) => {
        console.error("Error deleting team:", error);
      });
  };

  function getTeams() {
    axios
      .get("http://localhost/footballthaileague11/")
      .then((response) => {
        const data = response.data;
        setTeams(data);
      })
      .catch((error) => {
        console.error("Error fetching teams:", error);
      });
  }

  const handleAddNewSave = (newTeam) => {
    axios
      .post("http://localhost/footballthaileague11/", newTeam)
      .then((response) => {
        console.log("Team added successfully.");
        getTeams();
        handleAddNewClose();
      })
      .catch((error) => {
        console.error("Error adding new team:", error);
      });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleModalSave = (updatedTeam) => {
    axios
      .put(`http://localhost/footballthaileague11/${updatedTeam.id}`, updatedTeam)
      .then((response) => {
        console.log("Team updated successfully.");
        getTeams();
        handleModalClose();
      })
      .catch((error) => {
        console.error("Error updating team:", error);
      });
  };

  return (
    <div className="container mx-auto p-4">
      <button onClick={handleClick} className="button is-danger mb-4">
        <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
        Logout
      </button>
      <h1 className="title is-3 mb-4">จัดการข้อมูลทีม</h1>
  
      <div className="buttons is-pulled-right mb-4">
        <Link to="/crudfootballnews" className="button is-primary ml-auto">
          จัดการข้อมูลข่าวฟุตบอล
        </Link>
        <Link to="/crudplayers" className="button is-primary ml-4">
          จัดการข้อมูลนักเตะ
        </Link>
        <Link to="/football_scores" className="button is-primary ml-4">
          บันทึกเเมตเเข่งขัน
        </Link>
      </div>
  
      <button onClick={handleAddNewClick} className="button is-success mb-4">
        <FontAwesomeIcon icon={faPlus} className="mr-2" />
        เพิ่มทีมใหม่
      </button>

      <table className="table is-fullwidth">
        <thead>
          <tr>
            <th className="has-text-centered">ID</th>
            <th className="has-text-centered">ชื่อทีม</th>
            <th className="has-text-centered">จังหวัด</th>
            <th className="has-text-centered">สี</th>
            <th className="has-text-centered">ข้อมูลเสื้อ</th>
            <th className="has-text-centered">รูปภาพ</th>
            <th className="has-text-centered">แก้ไข</th>
            <th className="has-text-centered">ลบ</th>
          </tr>
        </thead>
        <tbody>
          {visibleTeams.map((team) => (
            <tr key={team.id}>
              <td>{team.id}</td>
              <td>{team.name}</td>
              <td>{team.province}</td>
              <td>{team.color}</td>
              <td>{team.shirt_data}</td>
              <td>
                <img src={team.image} alt={team.name} className="image" />
              </td>
              <td>
                <button onClick={() => handleEditClick(team)} className="button is-info">
                  <FontAwesomeIcon icon={faEdit} className="mr-2" />
                  แก้ไข
                </button>
              </td>
              <td>
                <button onClick={() => handleDeleteClick(team)} className="button is-danger">
                  <FontAwesomeIcon icon={faTrash} className="mr-2" />
                  ลบ
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="buttons mt-4 is-centered">
        {Array.from({ length: Math.ceil(teams.length / itemsPerPage) }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`button mx-1 ${index + 1 === currentPage ? "is-info" : "is-light"}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      {isEditing && selectedTeam && (
        <EditTeamModal
          team={selectedTeam}
          onClose={handleModalClose}
          onSave={handleModalSave}
        />
      )}
      {isAddingNew && (
        <AddNewTeamModal onClose={handleAddNewClose} onSave={handleAddNewSave} />
      )}
      {isDeleting && selectedTeam && (
        <DeleteTeamModal
          team={selectedTeam}
          onClose={handleDeleteClose}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
}
