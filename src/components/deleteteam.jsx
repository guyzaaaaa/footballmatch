import React from "react";
import axios from "axios";

const DeleteTeamModal = ({ team, onClose, onConfirm }) => {
  const handleDelete = () => {
    if (team && team.id) {
      const data = {
        id: team.id,
      };

      axios
        .delete("http://localhost/footballthaileague11/index.php", {
          data,
        })
        .then(() => {
          console.log("Team deleted successfully.");
          onConfirm();
        })
        .catch((error) => {
          console.error("Error deleting team:", error);
        });
    } else {
      console.error("Invalid team or team.id for deletion");
    }
  };

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">ยืนยันการลบ</p>
          <button className="delete" aria-label="close" onClick={onClose}></button>
        </header>
        <section className="modal-card-body">
          <p className="text-gray-500">เมื่อลบเเล้วจะไม่สามารถกู้คืนได้</p>
        </section>
        <footer className="modal-card-foot">
          <button
            onClick={handleDelete}
            className="button is-danger"
          >
            ยืนยัน
          </button>
          <button
            onClick={onClose}
            className="button"
          >
            ยกเลิก
          </button>
        </footer>
      </div>
    </div>
  );
};

export default DeleteTeamModal;
