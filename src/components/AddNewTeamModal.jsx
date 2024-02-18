import React, { useState } from "react";

export default function AddNewTeamModal({ onClose, onSave }) {
  const [newTeamData, setNewTeamData] = useState({
    id: 0,
    name: "",
    province: "",
    color: "",
    shirt_data: "",
    image: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewTeamData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveClick = () => {
    onSave(newTeamData);
    setNewTeamData((prevData) => ({
      ...prevData,
      id: prevData.id + 1,
    }));
  };

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">เพิ่มทีมใหม่</p>
          <button className="delete" aria-label="close" onClick={onClose}></button>
        </header>
        <section className="modal-card-body">
          <label className="label">
            <span className="text-gray-700">ชื่อทีม:</span>
            <input
              type="text"
              name="name"
              value={newTeamData.name}
              onChange={handleInputChange}
              className="input"
            />
          </label>
          <label className="label">
            <span className="text-gray-700">จังหวัด:</span>
            <input
              type="text"
              name="province"
              value={newTeamData.province}
              onChange={handleInputChange}
              className="input"
            />
          </label>
          <label className="label">
            <span className="text-gray-700">สี:</span>
            <input
              type="text"
              name="color"
              value={newTeamData.color}
              onChange={handleInputChange}
              className="input"
            />
          </label>
          <label className="label">
            <span className="text-gray-700">ข้อมูลเสื้อ:</span>
            <input
              type="text"
              name="shirt_data"
              value={newTeamData.shirt_data}
              onChange={handleInputChange}
              className="input"
            />
          </label>
          <label className="label">
            <span className="text-gray-700">รูปภาพ:</span>
            <input
              type="text"
              name="image"
              value={newTeamData.image}
              onChange={handleInputChange}
              className="input"
            />
          </label>
        </section>
        <footer className="modal-card-foot">
          <button className="button is-success" onClick={handleSaveClick}>
            ตกลง
          </button>
          <button className="button" onClick={onClose}>
            ยกเลิก
          </button>
        </footer>
      </div>
    </div>
  );
}
