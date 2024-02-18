import React, { useState, useEffect } from "react";
import axios from "axios";

const DeleteTeamFormation = ({ teamFormationId, onDelete }) => {
    const [isLoading, setIsLoading] = useState(false);

    const deleteFormation = async () => {
        const confirmed = window.confirm("Are you sure you want to delete this team formation?");

        if (!confirmed) {
            return; // User cancelled the deletion
        }

        setIsLoading(true);

        try {
            const data = {
                id: teamFormationId,
            };

            await axios.delete("http://localhost/teamformation/index.php", {
                data,
            });

            console.log("Team formation deleted successfully!");
            onDelete(); // Notify the parent component about the deletion
        } catch (error) {
            console.error("Error deleting team formation:", error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={deleteFormation}
            disabled={isLoading}
            className="bg-red-500 text-white px-4 py-2 rounded-md focus:outline-none focus:shadow-outline-red active:bg-red-800"
        >
            {isLoading ? "Deleting..." : "Delete"}
        </button>
    );
};


export default DeleteTeamFormation;
