import React, { useState, useEffect } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";

const API_URL = "http://localhost/footballnews/";
const ITEMS_PER_PAGE = 6;

const FootballNews = () => {
  const [news, setNews] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchNews();
  }, [currentPage]);

  const fetchNews = async () => {
    try {
      const response = await axios.get(API_URL);
      setNews(response.data);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  const handleReadMore = (selectedNewsItem) => {
    setSelectedNews(selectedNewsItem);
  };

  const handleCloseModal = () => {
    setSelectedNews(null);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleDownloadPdf = (newsItem) => {
    const pdf = new jsPDF();

    const textX = 10;
    const titleY = 20;
    const contentY = 30;

    const imageX = 10;
    const imageY = 50;
    const imageWidth = 180;
    const imageHeight = 100;

    pdf.setFont("Arial");
    pdf.setFontSize(12);

    pdf.text(newsItem.title, textX, titleY);
    pdf.text(newsItem.content, textX, contentY);
    pdf.addImage(newsItem.news_image_url, "JPEG", imageX, imageY, imageWidth, imageHeight);

    pdf.save(`${newsItem.title}.pdf`);
  };

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentNews = news.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(news.length / ITEMS_PER_PAGE);

  const handleDownloadAll = () => {
    currentNews.forEach((newsItem) => {
      handleDownloadPdf(newsItem);
    });
  };

  return (
    <div className="container my-6">
      <h1 className="title is-3 mb-6">ข่าวสารบอลไทย</h1>
      <div className="columns is-multiline">
        {currentNews.map((newsItem) => (
          <div key={newsItem.news_id} className="column is-4 mb-4">
            <div className="card">
              <div className="card-image">
                <figure className="image is-4by3">
                  <img
                    src={newsItem.news_image_url}
                    alt={newsItem.title}
                    className="w-full h-full object-cover mb-4 rounded-md"
                  />
                </figure>
              </div>
              <div className="card-content">
                <h2 className="title is-5">{newsItem.title}</h2>
                <button
                  onClick={() => handleReadMore(newsItem)}
                  className="button is-primary mt-2"
                >
                  อ่านต่อ
                </button>
                <button
                  onClick={() => handleDownloadPdf(newsItem)}
                  className="button is-success mt-2"
                >
                  ดาวน์โหลด
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex mt-4" role="navigation" aria-label="pagination">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`button ${currentPage === index + 1 ? "mx-1" : "mx-1"}`}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <button
        onClick={handleDownloadAll}
        className="button is-info mt-4"
      >
        ดาวน์โหลดทั้งหมด
      </button>

      {selectedNews && (
        <div className="modal is-active">
          <div className="modal-background" onClick={handleCloseModal}></div>
          <div className="modal-content has-text-black has-background-white box">
            <p className="image">
              <img
                src={selectedNews.news_image_url}
                alt={selectedNews.title}
                className="w-full h-64 object-cover mb-4 rounded-md"
              />
            </p>
            <h2 className="title is-4 mb-4 has-text-weight-semibold">
              {selectedNews.title}
            </h2>
            <p className="content">{selectedNews.content}</p>
            <button
              onClick={handleCloseModal}
              className="button is-primary mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FootballNews;
