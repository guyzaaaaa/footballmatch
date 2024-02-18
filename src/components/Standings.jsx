import React, { useState, useEffect, useRef } from 'react';
import * as XLSX from 'xlsx';
import html2canvas from 'html2canvas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faFileExcel, faFileImage } from '@fortawesome/free-solid-svg-icons';

const Standings = () => {
  const [standings, setStandings] = useState([]);
  const tableRef = useRef(null);

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        const response = await fetch('http://localhost/football_scores/index.php/');
        if (response.ok) {
          const data = await response.json();
          const sortedStandings = data.sort((a, b) => b.points - a.points);
          setStandings(sortedStandings);
        } else {
          console.error('Error fetching standings');
        }
      } catch (error) {
        console.error('Error fetching standings:', error);
      }
    };

    fetchStandings();
  }, []);

  const getRecentPerformanceIcons = (team) => {
    const wins = Array.from({ length: team.wins }, (_, i) => '✅');
    const draws = Array.from({ length: team.draws }, (_, i) => '🤝');
    const losses = Array.from({ length: team.losses }, (_, i) => '❌');
    const recentPerformanceIcons = wins.concat(draws, losses);
    const winRatio = ((team.wins + team.draws / 2) / team.matches_played * 100).toFixed(2);
    const sanitizedWinRatio = winRatio > 100 ? 100 : winRatio;
    return { icons: recentPerformanceIcons.join(' '), winRatio: sanitizedWinRatio };
  };

  const handleDownloadExcel = () => {
    const legendRow = ['หมายเหตุ', '✅=ชนะ, 🤝=เสมอ, ❌=แพ้'];

    const updatedStandings = standings.map((team, index) => {
      const totalMatches = team.matches_played;
      const totalWins = team.wins;
      const totalDraws = team.draws;
      const totalLosses = team.losses;
      const winRatio = ((totalWins + totalDraws / 2) / totalMatches * 100).toFixed(2);
      const sanitizedWinRatio = winRatio > 100 ? 100 : winRatio;

      return {
        อันดับ: index + 1,
        ชื่อทีม: team.team_name,
        จำนวนแมตช์: totalMatches,
        ชนะ: totalWins,
        เสมอ: totalDraws,
        แพ้: totalLosses,
        ได้ประตู: team.goals_for,
        เสียประตู: team.goals_against,
        แต้ม: team.points,
        ผลงานล่าสุด: getRecentPerformanceIcons(team).icons,
        อัตราการชนะ: `${sanitizedWinRatio}%`,
      };
    });

    const ws = XLSX.utils.json_to_sheet(updatedStandings);

    const currentDate = new Date();
    const formattedDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;
    XLSX.utils.sheet_add_aoa(ws, [['ข้อมูล ณ วันที่:', formattedDate]], { origin: 'A' + (updatedStandings.length + 3) });

    const legendRowIndex = updatedStandings.length + 5;
    XLSX.utils.sheet_add_aoa(ws, [legendRow], { origin: 'A' + legendRowIndex });

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'FootballStandings');
    XLSX.writeFile(wb, 'FootballStandings.xlsx');
  };

  const handleDownloadImage = () => {
    html2canvas(tableRef.current).then((canvas) => {
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = 'FootballStandings.png';
      link.click();
    });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">ตารางอันดับ</h1>
        <div className="flex space-x-4">
          <button
            onClick={handleDownloadExcel}
            className="p-2 bg-yellow-500 text-white rounded-md"
          >
            <FontAwesomeIcon icon={faFileExcel} className="mr-2" />
            ดาวน์โหลด Excel
          </button>
          <button
            onClick={handleDownloadImage}
            className="p-2 bg-green-500 text-white rounded-md"
          >
            <FontAwesomeIcon icon={faFileImage} className="mr-2" />
            ดาวน์โหลด PNG
          </button>
        </div>
      </div>

      <p className="text-sm">
        หมายเหตุ: ✅=ชนะ, 🤝=เสมอ, ❌=แพ้
      </p>

      <table ref={tableRef} className="w-full table-auto border border-black divide-y divide-black">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="p-2 border-black">อันดับ</th>
            <th className="p-2 border-black">ชื่อทีม</th>
            <th className="p-2 border-black">จำนวนแมตช์</th>
            <th className="p-2 border-black">ชนะ</th>
            <th className="p-2 border-black">เสมอ</th>
            <th className="p-2 border-black">แพ้</th>
            <th className="p-2 border-black">ได้ประตู</th>
            <th className="p-2 border-black">เสียประตู</th>
            <th className="p-2 border-black">แต้ม</th>
            <th className="p-2 border-black">ผลงานล่าสุด</th>
            <th className="p-2 border-black">อัตราการชนะ</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((team, index) => (
            <tr
              key={index + 1}
              className={`${index === 0 ? 'bg-green-500 text-white' :
                index >= standings.length - 3 ? 'bg-red-400 text-white' :
                  index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-100'
                } border border-black divide-x divide-black`}
            >
              <td className="p-2 text-center font-bold border-black">{index + 1}</td>
              <td className="p-2 border-black">{team.team_name}</td>
              <td className="p-2 border-black">{team.matches_played}</td>
              <td className="p-2 border-black">{team.wins}</td>
              <td className="p-2 border-black">{team.draws}</td>
              <td className="p-2 border-black">{team.losses}</td>
              <td className="p-2 border-black">{team.goals_for}</td>
              <td className="p-2 border-black">{team.goals_against}</td>
              <td className="p-2 font-bold border-black">{team.points}</td>
              <td className="p-2 border-black">{getRecentPerformanceIcons(team).icons}</td>
              <td className="p-2 border-black">{`${getRecentPerformanceIcons(team).winRatio}%`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Standings;
