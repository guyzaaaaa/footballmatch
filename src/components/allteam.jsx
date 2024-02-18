import React, { useEffect, useState } from "react";
import axios from "axios";
import "tailwindcss/tailwind.css";

function AllTeam({ datos }) {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFootballData = async () => {
    setLoading(true);
    const options = {
      method: "GET",
      url: "https://football-results-of-today.p.rapidapi.com/today",
      headers: {
        "X-RapidAPI-Key": "ab9cefa600msh83963bcbb17c559p126fecjsn13fe0f01fb7d",
        "X-RapidAPI-Host": "football-results-of-today.p.rapidapi.com",
      },
    };

    try {
      const response = await axios(options);
      setMatches(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching football data:", error);
      setLoading(false);
    }
  };

  const handleUpdate = () => {
    fetchFootballData();
  };

  useEffect(() => {
    fetchFootballData();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-center mb-8">ผลการแข่งขันฟุตบอลสด</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleUpdate}
      >
        อัพเดท
      </button>
      {loading ? (
        <p className="text-center my-8">กำลังโหลด...</p>
      ) : (
        <div>
          {matches?.map((match) => (
            <div key={match.id} className="bg-gray-100 p-6 rounded-lg my-4">
              <h2 className="text-2xl font-bold text-center mb-4">
                <img className="mx-auto mt-2" src={match.competitionLogo} alt="" />
                {match.competition}
              </h2>
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 p-2">ทีมเจ้าบ้าน</th>
                    <th className="border border-gray-300 p-2">โลโก้</th>
                    <th className="border border-gray-300 p-2">vs</th>
                    <th className="border border-gray-300 p-2">ทีมเยือน</th>
                    <th className="border border-gray-300 p-2">ผลลัพธ์ล่าสุด</th>
                    <th className="border border-gray-300 p-2">สถานะ</th>
                  </tr>
                </thead>
                <tbody>
                  {match.match?.map((matchItem) => (
                    <tr key={matchItem.matchId} className={matchItem.live ? "bg-green-100" : "bg-white"}>
                      <td className="border border-gray-300 p-2">
                        <strong>{matchItem.teamA}</strong>
                      </td>
                      <td className="border border-gray-300 p-2">
                        <img className="mx-auto" src={matchItem.teamALogo} alt="โลโก้ทีม A" />
                        <span className="block text-center">{matchItem.teamA}</span>
                      </td>
                      <td className="border border-gray-300 p-2">vs</td>
                      <td className="border border-gray-300 p-2">
                        <img className="mx-auto" src={matchItem.teamBLogo} alt="โลโก้ทีม B" />
                        <span className="block text-center">{matchItem.teamB}</span>
                      </td>
                      <td className="border border-gray-300 p-2">
                        {matchItem.teamAResult} - {matchItem.teamBResult}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {matchItem.liveStatus
                          ? <span className="text-green-600">ถ่ายทอดสด</span>
                          : matchItem.startIn
                          ? `เริ่มใน ${matchItem.startIn}`
                          : "จบแล้ว"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}

      {datos?.map((item) => (
        <div key={item.id} className="bg-gray-100 p-6 rounded-lg my-4">
          <h2 className="text-2xl font-bold text-center mb-4">
            <img className="mx-auto mt-2" src={item.competitionLogo} alt="" />
            {item.competition}
          </h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">ทีมเจ้าบ้าน</th>
                <th className="border border-gray-300 p-2">โลโก้</th>
                <th className="border border-gray-300 p-2">vs</th>
                <th className="border border-gray-300 p-2">ทีมเยือน</th>
                <th className="border border-gray-300 p-2">โลโก้</th>
                <th className="border border-gray-300 p-2">ผลลัพธ์</th>
                <th className="border border-gray-300 p-2">สถานะ</th>
              </tr>
            </thead>
            <tbody>
              {item?.match?.map((itm) => (
                <tr key={itm.matchId} className={itm
                  .live ? "bg-green-100" : "bg-white"}>
                  <td className="border border-gray-300 p-2">
                    <strong>{itm.teamA}</strong>
                  </td>
                  <td className="border border-gray-300 p-2">
                    <img className="mx-auto" src={itm.teamALogo} alt="โลโก้ทีม A" />
                    <span className="block text-center">{itm.teamA}</span>
                  </td>
                  <td className="border border-gray-300 p-2">vs</td>
                  <td className="border border-gray-300 p-2">
                    <img className="mx-auto" src={itm.teamBLogo} alt="โลโก้ทีม B" />
                    <span className="block text-center">{itm.teamB}</span>
                  </td>
                  <td className="border border-gray-300 p-2">
                    {itm.teamAResult} - {itm.teamBResult}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {itm.liveStatus
                      ? <span className="text-green-600">ถ่ายทอดสด</span>
                      : itm.startIn
                      ? `เริ่มใน ${itm.startIn}`
                      : "ไม่ถ่ายทอดสด"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default AllTeam;
