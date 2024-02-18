import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFutbol, faDownload } from '@fortawesome/free-solid-svg-icons';
import html2canvas from 'html2canvas';

const Topscores = () => {
  const [scores, setScores] = useState([]);
  const [players, setPlayers] = useState([]);
  const [topScores, setTopScores] = useState([]);

  useEffect(() => {
    fetch('http://localhost/scores/index.php/')
      .then((response) => response.json())
      .then((data) => {
        const sortedScores = data.sort((a, b) => b.goals - a.goals);
        setScores(sortedScores);
        setTopScores(sortedScores.slice(0, 5));

        return fetch('http://localhost/players/');
      })
      .then((response) => response.json())
      .then((playersData) => setPlayers(playersData))
      .catch((error) => console.error('Error fetching data: ', error));
  }, []);

  const getPlayerInfo = (playerName) => {
    const player = players.find((player) => player.player_name === playerName);
    return player
      ? {
          team_name: player.team_name,
          player_image_url: player.player_image_url,
          position: player.position,
        }
      : { team_name: '', player_image_url: '', position: '' };
  };

  const renderGoalProgressBar = (goals) => {
    const maxGoals = 10; // You can adjust the maximum number of goals
    const percentage = (goals / maxGoals) * 100;
    const progressBarStyle = {
      width: `${percentage}%`,
      backgroundColor: '#4CAF50', // Green color
      height: '10px',
      borderRadius: '5px',
    };

    return <div style={progressBarStyle}></div>;
  };

  const handleDownloadImage = () => {
    const table = document.getElementById('topScoresTable');

    html2canvas(table, { allowTaint: true, useCORS: true }).then((canvas) => {
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = 'TopScores.png';
      link.click();
    });
  };

  return (
    <div className="container mt-6">
      <h2 className="text-3xl font-bold mb-4 text-blue-700">อันดับ Topscores 5 อันดับแรก</h2>
      <button
        onClick={handleDownloadImage}
        className="p-2 bg-blue-500 text-white rounded-md mb-4"
      >
        <FontAwesomeIcon icon={faDownload} className="mr-2" />
        ดาวน์โหลด Topscores เป็นไฟล์ภาพ
      </button>
      <table
        id="topScoresTable"
        className="table is-fullwidth is-striped is-hoverable"
        style={{ width: '100%', marginBottom: '20px' }}
      >
        <thead>
          <tr>
            <th>อันดับ</th>
            <th>ผู้เล่น</th>
            <th>ประตู</th>
            <th>ทีม</th>
            <th>ตำแหน่ง</th>
          </tr>
        </thead>
        <tbody>
          {topScores.map((score, index) => {
            const playerInfo = getPlayerInfo(score.player_name);
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <figure className="image is-96x96 mr-2">
                    <img
                      className="is-rounded"
                      src={playerInfo.player_image_url}
                      alt={`ผู้เล่น ${score.player_name}`}
                      style={{ width: '96px', height: '96px', border: '2px solid #3273dc', borderRadius: '50%' }}
                    />
                  </figure>
                  {score.player_name}
                </td>
                <td>
                  {score.goals}
                  {renderGoalProgressBar(score.goals)}
                </td>
                <td>{playerInfo.team_name}</td>
                <td>
                  <FontAwesomeIcon icon={faFutbol} style={{ color: '#3273dc' }} /> {playerInfo.position}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Topscores;
