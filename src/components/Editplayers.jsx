import React, { useState, useEffect } from "react";
import axios from "axios";

const EditPlayers = ({ handleCloseForm, fetchPlayersData, selectedPlayer }) => {
  const [editedPlayer, setEditedPlayer] = useState({ ...selectedPlayer });

  useEffect(() => {
    setEditedPlayer({ ...selectedPlayer });
  }, [selectedPlayer]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPlayer((prevPlayer) => ({
      ...prevPlayer,
      [name]: value,
    }));
  };

  const handleUpdatePlayer = async () => {
    try {
      await axios.put(
        `http://localhost/players/index.php/${editedPlayer.player_id}`,
        editedPlayer
      );
      handleCloseForm();
      fetchPlayersData();
    } catch (error) {
      console.error("Error updating player:", error);
    }
  };

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={handleCloseForm}></div>
      <div className="modal-content">
        <div className="box">
          <h1 className="title is-4">เเก้ไขข้อมูลนักเตะ</h1>
          <form>
            <div className="field">
              <label className="label">ชื่อ:</label>
              <div className="control">
                <input
                  type="text"
                  name="player_name"
                  value={editedPlayer.player_name}
                  onChange={handleInputChange}
                  className="input"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">ชื่อทีม:</label>
              <div className="control">
                <input
                  type="text"
                  name="team_name"
                  value={editedPlayer.team_name}
                  onChange={handleInputChange}
                  className="input"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">ตำเเหน่ง:</label>
              <div className="control">
                <input
                  type="text"
                  name="position"
                  value={editedPlayer.position}
                  onChange={handleInputChange}
                  className="input"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">สัญชาติ:</label>
              <div className="control">
                <input
                  type="text"
                  name="nationality"
                  value={editedPlayer.nationality}
                  onChange={handleInputChange}
                  className="input"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">รูปนักเตะ:</label>
              <div className="control">
                <input
                  type="text"
                  name="player_image_url"
                  value={editedPlayer.player_image_url}
                  onChange={handleInputChange}
                  className="input"
                />
              </div>
            </div>
            <div className="field is-grouped">
              <div className="control">
                <button
                  type="button"
                  onClick={handleUpdatePlayer}
                  className="button is-primary"
                >
                  บันทึก
                </button>
              </div>
              <div className="control">
                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="button is-danger"
                >
                  ยกเลิก
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPlayers;
