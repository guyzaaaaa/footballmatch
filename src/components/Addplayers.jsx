import React, { useState } from "react";
import axios from "axios";

const AddPlayers = ({ handleCloseForm, fetchPlayersData }) => {
  const [newPlayer, setNewPlayer] = useState({
    player_name: "",
    team_name: "",
    position: "",
    nationality: "",
    player_image_url: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPlayer((prevPlayer) => ({
      ...prevPlayer,
      [name]: value,
    }));
  };

  const handleSavePlayer = async () => {
    try {
      await axios.post("http://localhost/players/index.php/", newPlayer);
      handleCloseForm();
      fetchPlayersData();
    } catch (error) {
      console.error("Error saving new player:", error);
    }
  };

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={handleCloseForm}></div>
      <div className="modal-content">
        <div className="box">
          <h1 className="title is-4">เพิ่มข้อมูลนักเตะ</h1>
          <form>
            <div className="field">
              <label className="label">ชื่อ:</label>
              <div className="control">
                <input
                  type="text"
                  name="player_name"
                  value={newPlayer.player_name}
                  onChange={handleInputChange}
                  className="input"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">ทีมที่อยู่:</label>
              <div className="control">
                <input
                  type="text"
                  name="team_name"
                  value={newPlayer.team_name}
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
                  value={newPlayer.position}
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
                  value={newPlayer.nationality}
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
                  value={newPlayer.player_image_url}
                  onChange={handleInputChange}
                  className="input"
                />
              </div>
            </div>
            <div className="field is-grouped">
              <div className="control">
                <button
                  type="button"
                  onClick={handleSavePlayer}
                  className="button is-success"
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

export default AddPlayers;
