import React, { useState, useEffect } from "react";
import axios from "axios";

const EditFootballNews = ({ fetchNewsData, handleCloseModal, selectedNewsItem }) => {
  const [editedNews, setEditedNews] = useState(selectedNewsItem);

  useEffect(() => {
    setEditedNews(selectedNewsItem);
  }, [selectedNewsItem]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedNews((prevNews) => ({
      ...prevNews,
      [name]: value,
    }));
  };

  const handleSave = () => {
    axios
      .put(`http://localhost/footballnews/index.php/${editedNews.news_id}`, editedNews, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log("News updated successfully.");
        fetchNewsData();
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Error updating news:", error);
      });
  };

  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Edit Football News</p>
          <button
            className="delete"
            aria-label="close"
            onClick={handleCloseModal}
          ></button>
        </header>
        <section className="modal-card-body">
          <div className="field">
            <label className="label">ID:</label>
            <div className="control">
              <input
                type="text"
                name="news_id"
                value={editedNews.news_id}
                onChange={handleInputChange}
                disabled
                className="input is-static"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">หัวข้อ:</label>
            <div className="control">
              <input
                type="text"
                name="title"
                value={editedNews.title}
                onChange={handleInputChange}
                className="input"
              />
            </div>
          </div>
          <div className="bg-gray-200 has-text-left">
            <label className="label">เนื้อหา:</label>
            <div className="control">
              <textarea
                name="content"
                value={editedNews.content}
                onChange={handleInputChange}
                className="textarea"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">รูปภาพ:</label>
            <div className="control">
              <input
                type="text"
                name="news_image_url"
                value={editedNews.news_image_url}
                onChange={handleInputChange}
                className="input"
              />
            </div>
          </div>
        </section>
        <footer className="modal-card-foot">
          <button
            onClick={handleSave}
            className="button is-success"
          >
            บันทึก
          </button>
          <button
            onClick={handleCloseModal}
            className="button"
          >
            ยกเลิก
          </button>
        </footer>
      </div>
    </div>
  );
};

export default EditFootballNews;
