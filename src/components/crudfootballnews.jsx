import React, { useState, useEffect } from "react";
import axios from "axios";
import AddFootballNews from "./Addfootballnews";
import EditFootballNews from "./Editfootballnews";
import DeleteFootballNews from "./deletefootballnews";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const CrudFootballNews = () => {
  const [news, setNews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedNewsItem, setSelectedNewsItem] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchNewsData();
  }, [currentPage]);

  const fetchNewsData = async () => {
    try {
      const response = await axios.get("http://localhost/footballnews/index.php/");
      setNews(response.data);
    } catch (error) {
      console.error("Error fetching news data:", error);
    }
  };

  const handleOpenModal = (newsItem) => {
    setSelectedNewsItem(newsItem);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    fetchNewsData();
  };

  const handleDelete = (newsItem) => {
    setSelectedNewsItem(newsItem);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost/footballnews/index.php/${selectedNewsItem?.news_id}`);
      setShowDeleteModal(false);
      fetchNewsData();
    } catch (error) {
      console.error("Error deleting news:", error);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const itemsPerPage = 8;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentNews = news.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(news.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">จัดการข่าวสารฟุตบอล</h1>
      <button
        onClick={() => handleOpenModal(null)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        <FontAwesomeIcon icon={faPlus} className="mr-2" />
        เพิ่มข่าวใหม่
      </button>
      {showModal && (
        selectedNewsItem ? (
          <EditFootballNews
            fetchNewsData={fetchNewsData}
            handleCloseModal={handleCloseModal}
            selectedNewsItem={selectedNewsItem}
          />
        ) : (
          <AddFootballNews
            fetchNewsData={fetchNewsData}
            handleCloseModal={handleCloseModal}
          />
        )
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <DeleteFootballNews
          handleConfirmDelete={handleConfirmDelete}
          handleCancelDelete={handleCancelDelete}
          newsItem={selectedNewsItem}
        />
      )}

      <div className="mt-4 overflow-x-auto">
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200 has-text-centered">
              <th className="border p-2">ID</th>
              <th className="border p-2">หัวข้อข่าว</th>
              <th className="border p-2">เนื้อหาข่าว</th>
              <th className="border p-2">รูปภาพ</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentNews.map((newsItem) => (
              <tr key={newsItem.news_id} className="text-center">
                <td className="border p-2">{newsItem.news_id}</td>
                <td className="border p-2">{newsItem.title}</td>
                <td className="border p-2">{newsItem.content}</td>
                <td className="border p-2">
                  <img
                    src={newsItem.news_image_url}
                    alt={newsItem.title}
                    className="w-16 h-auto"
                  />
                </td>
                <td className="border p-2 flex justify-center">
                  <button
                    onClick={() => handleOpenModal(newsItem)}
                    className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-700 focus:outline-none focus:ring focus:border-blue-300"
                  >
                    <FontAwesomeIcon icon={faEdit} className="mr-2" />
                    แก้ไข
                  </button>
                  <button
                    onClick={() => handleDelete(newsItem)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    <FontAwesomeIcon icon={faTrash} className="mr-2" />
                    ลบ
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4">
          <ul className="flex justify-center">
            {pageNumbers.map((number) => (
              <li
                key={number}
                className={`px-3 py-1 mx-2 cursor-pointer ${
                  number === currentPage ? "bg-blue-500 text-white" : "bg-gray-300"
                }`}
                onClick={() => setCurrentPage(number)}
              >
                {number}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CrudFootballNews;
