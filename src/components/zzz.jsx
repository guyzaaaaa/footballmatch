import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EditTeamModal from "./EditTeamModal";

export default function AdminPage() {
    const [teams, setTeams] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = (team) => {
        setSelectedTeam(team);
        setIsEditing(true);
    };

    const handleModalClose = () => {
        setIsEditing(false);
        setSelectedTeam(null);
    };

    const handleModalSave = (editedTeam) => {
        // Make a PUT request to the API to update the team data
        fetch(`http://localhost/footballthaileague/${editedTeam.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(editedTeam),
        })
            .then((response) => {
                if (response.ok) {
                    console.log("Team updated successfully.");
                    getTeams();
                } else {
                    throw new Error("Error updating team");
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        getTeams();
    }, []);

    function getTeams() {
        fetch("http://localhost/footballthaileague/")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setTeams(data);
            })
            .catch((error) => {
                console.error("Error fetching teams:", error);
            });
    }

    const handleDelete = (id) => {
        fetch(`http://localhost/footballthaileague/${id}`, {
            method: "DELETE",
        })
            .then((response) => {
                if (response.ok) {
                    console.log("Team deleted successfully.");
                    getTeams();
                } else {
                    throw new Error("Error deleting team");
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold my-4">Admin Page</h1>
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">ชื่อทีม</th>
                        <th className="px-4 py-2">จังหวัด</th>
                        <th className="px-4 py-2">สี</th>
                        <th className="px-4 py-2">ข้อมูลเสื้อ</th>
                        <th className="px-4 py-2">รูปภาพ</th>
                        <th className="px-4 py-2">Edit</th>
                        <th className="px-4 py-2">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {teams.map((team) => (
                        <tr key={team.id}>
                            <td className="border px-4 py-2">{team.id}</td>
                            <td className="border px-4 py-2">{team.name}</td>
                            <td className="border px-4 py-2">{team.province}</td>
                            <td className="border px-4 py-2">{team.color}</td>
                            <td className="border px-4 py-2">{team.shirt_data}</td>
                            <td className="border px-4 py-2">
                                <img
                                    src={team.image}
                                    alt={team.name}
                                    className="w-24 h-auto"
                                />
                            </td>
                            <td className="border px-4 py-2">
                                <button
                                    onClick={() => handleEditClick(team)}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Edit
                                </button>
                            </td>
                            <td className="border px-4 py-2">
                                <button
                                    onClick={() => handleDelete(team.id)}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {isEditing && selectedTeam && (
                <EditTeamModal
                    team={selectedTeam}
                    onClose={handleModalClose}
                    onSave={handleModalSave}
                />
            )}
        </div>
    );
}
