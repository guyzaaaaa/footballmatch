import React, { useState } from "react";
import axios from "axios";

const AddFootballNews = ({ fetchNewsData, handleCloseModal }) => {
  const [newNews, setNewNews] = useState({
    title: "",
    content: "",
    news_image_url: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNews((prevNews) => ({
      ...prevNews,
      [name]: value,
    }));
  };

  const handleSaveNews = async () => {
    try {
      await axios.post("http://localhost/footballnews/index.php/", newNews);
      handleCloseModal();
      fetchNewsData();
    } catch (error) {
      console.error("Error saving new football news:", error);
    }
  };

  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">เพิ่มข่าวใหม่</p>
          <button
            className="delete"
            aria-label="close"
            onClick={handleCloseModal}
          ></button>
        </header>
        <section className="modal-card-body">
          <form>
            <div className="field">
              <label className="label">หัวข้อข่าว:</label>
              <div className="control">
                <input
                  type="text"
                  name="title"
                  value={newNews.title}
                  onChange={handleInputChange}
                  className="input"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">เนื้อหาข่าว:</label>
              <div className="control">
                <textarea
                  name="content"
                  value={newNews.content}
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
                  value={newNews.news_image_url}
                  onChange={handleInputChange}
                  className="input"
                />
              </div>
            </div>
          </form>
        </section>
        <footer className="modal-card-foot">
          <button
            type="button"
            onClick={handleSaveNews}
            className="button is-success"
          >
            บันทึก
          </button>
          <button
            type="button"
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

export default AddFootballNews;
