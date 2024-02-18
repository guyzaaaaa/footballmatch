import React from "react";
import axios from "axios";

const DeletePlayers = ({ playerId, onClose, onDelete }) => {
  const handleDelete = async () => {
    const data = {
      player_id: playerId,
    };

    try {
      await axios.delete("http://localhost/players/index.php", {
        data,
      });
      onDelete();  // ทำการ refresh ข้อมูลหลังจากลบเสร็จ
    } catch (error) {
      console.error("Error deleting player:", error);
    } finally {
      onClose();  // ปิด Modal
    }
  };

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-content">
        <div className="box">
          <h1 className="title is-4">ยืนยันการลบ</h1>
          <p className="subtitle is-6 mb-4">เมื่อลบแล้วจะไม่สามารถกู้คืนได้</p>

          <div className="buttons is-right">
            <button
              onClick={handleDelete}
              className="button is-danger"
            >
              ยืนยัน
            </button>
            <button
              onClick={onClose}
              className="button is-light"
            >
              ยกเลิก
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeletePlayers;
