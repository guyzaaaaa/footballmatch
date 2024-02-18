import React, { useState, useEffect } from "react";
import axios from "axios";

const Card = ({ teams }) => {
    const [showModal, setShowModal] = useState(false);
    const [comment, setComment] = useState("");
    const [commentId, setCommentId] = useState(1);
    const [commentsFromAPI, setCommentsFromAPI] = useState([]);

    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = async () => {
        try {
            const response = await axios.get("http://localhost/comment1/");
            setCommentsFromAPI(response.data);
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const submitComment = async () => {
        try {
            const response = await axios.post("http://localhost/comment1/", {
                comment: comment,
                id: teams.id, // Set the team's id as the value of id in comment1
            });

            console.log("Comment submitted:", response.data);

            setComment("");
            // Fetch comments again to update the list
            fetchComments();
        } catch (error) {
            console.error("Error submitting comment:", error);
        }
    };

    const teamComments = commentsFromAPI.filter((comment1) => comment1.id === teams.id);

    return (
        <div className="bg-white shadow-lg rounded-lg p-4 hover:bg-gray-100 border border-gray-200">
            <img
                src={teams.image}
                alt={teams.name}
                className="w-full h-48 rounded-md object-cover cursor-pointer transition-transform transform hover:scale-105 border-4 border-green-500 bg-gray-200"
                onClick={toggleModal}
            />
            <div className="mt-4 border-t-2 border-gray-300 pt-4">
                <h2
                    className={`text-xl font-bold ${showModal ? "text-blue-500" : "text-black"
                        } transition duration-300 ease-in-out cursor-pointer hover:text-blue-500`}
                    onClick={toggleModal}
                >
                    <span className="border-b-2 border-red-500 pb-1">{teams.name}</span>
                </h2>
                <p className="text-black-600 mt-2">
                    {teams.shirt_data.length > 180 && !showModal
                        ? teams.shirt_data.substring(0, 180) + "..."
                        : teams.shirt_data}
                </p>
            </div>


            <div className="mt-6 flex justify-end">
                <button
                    onClick={toggleModal}
                    className="text-red-500 cursor-pointer hover:underline bg-transparent hover:bg-red-500 text-black font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded transition duration-300 ease-in-out transform hover:scale-105"
                >
                    แสดงรายละเอียด
                </button>
            </div>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg overflow-y-auto h-3/4">
                        <div className="flex justify-end">
                            <button
                                onClick={toggleModal}
                                className="text-red-500 cursor-pointer hover:underline"
                            >
                                ปิด
                            </button>
                        </div>
                        <img
                            src={teams.image}
                            alt={teams.name}

                            className="w-full h-48 rounded-md object-cover border-4 border-green-500 bg-gray-200"
                        />
                        <div className="mt-4 border-t-2 border-gray-300 pt-4">
                            <h2 className="text-xl font-bold text-black hover:text-blue-500 hover:scale-105">
                                <span className="border-b-2 border-red-500 pb-1">{teams.name}</span>
                            </h2>
                            <p className="text-black-500 mt-2">{teams.shirt_data}</p>
                        </div>
                        <div className="mt-6">
                            <textarea
                                value={comment}
                                onChange={handleCommentChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                placeholder="แสดงความคิดเห็น..."
                                rows="3" // เพิ่มจำนวนแถวของ textarea เพื่อให้ความคิดเห็นมีขนาดใหญ่ขึ้น
                            />
                            <button
                                onClick={submitComment}
                                className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                            >
                                ส่งความคิดเห็น
                            </button>
                        </div>
                        {teamComments.length > 0 && (
                            <div className="mt-6">
                                <h3 className="text-lg font-semibold mb-2">[ความคิดเห็น]</h3>
                                <ul>
                                    {teamComments.map((comment1, index) => (
                                        <li key={index} className="border-b border-glay-300 py-2">
                                            {comment1.comment}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Card;
