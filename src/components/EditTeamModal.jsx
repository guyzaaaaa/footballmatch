import React, { useState } from "react";
import axios from "axios";

export default function EditTeamModal({ team, onClose, onSave }) {
  const [editedTeam, setEditedTeam] = useState(team);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTeam((prevTeam) => ({
      ...prevTeam,
      [name]: value,
    }));
  };

  const handleSave = () => {
    axios
      .put(`http://localhost/footballthaileague11/index.php/${editedTeam.id}`, editedTeam, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log("Team updated successfully.");
        onSave(editedTeam);
        onClose();
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error updating team:", error);
      });
  };

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">แก้ไขข้อมูลทีม</p>
          <button className="delete" aria-label="close" onClick={onClose}></button>
        </header>
        <section className="modal-card-body">
          <div className="field">
            <label className="label">ID:</label>
            <div className="control">
              <input
                type="text"
                name="id"
                value={editedTeam.id}
                onChange={handleInputChange}
                disabled
                className="input"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">ชื่อทีม:</label>
            <div className="control">
              <input
                type="text"
                name="name"
                value={editedTeam.name}
                onChange={handleInputChange}
                className="input"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">จังหวัด:</label>
            <div className="control">
              <input
                type="text"
                name="province"
                value={editedTeam.province}
                onChange={handleInputChange}
                className="input"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">สี:</label>
            <div className="control">
              <input
                type="text"
                name="color"
                value={editedTeam.color}
                onChange={handleInputChange}
                className="input"
              />
            </div>
          </div>
          <div className="field shirt-data-field">
            <label className="label">ข้อมูลเสื้อ:</label>
            <div className="control">
              <input
                type="text"
                name="shirt_data"
                value={editedTeam.shirt_data}
                onChange={handleInputChange}
                className="input"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">รูปภาพ:</label>
            <div className="control">
              <input
                type="text"
                name="image"
                value={editedTeam.image}
                onChange={handleInputChange}
                className="input"
              />
            </div>
          </div>
        </section>
        <footer className="modal-card-foot">
          <button className="button is-success" onClick={handleSave}>
            บันทึก
          </button>
          <button className="button" onClick={onClose}>
            ยกเลิก
          </button>
        </footer>
      </div>
    </div>
  );
}
