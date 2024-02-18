import React from "react";
import axios from "axios";

const DeleteFootballNews = ({ handleConfirmDelete, handleCancelDelete, newsItem }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost/footballnews/index.php/`, {
        data: { news_id: newsItem?.news_id },
      });
      handleConfirmDelete();
    } catch (error) {
      console.error("Error deleting news:", error);
    }
  };

  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">ยืนยันการลบ</p>
          <button
            className="delete"
            aria-label="close"
            onClick={handleCancelDelete}
          ></button>
        </header>
        <section className="modal-card-body">
          <h3 className="text-lg font-medium text-gray-900">Are you sure?</h3>
          <p className="text-sm text-gray-500 mb-4">เมื่อลบเเล้วจะไม่สามารถกู้คืนได้</p>
        </section>
        <footer className="modal-card-foot">
          <button
            onClick={handleDelete}
            className="button is-danger"
          >
            ยืนยัน
          </button>
          <button
            onClick={handleCancelDelete}
            className="button"
          >
            ยกเลิก
          </button>
        </footer>
      </div>
    </div>
  );
};

export default DeleteFootballNews;
