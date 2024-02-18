import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FootballScores = () => {
  const [teamData, setTeamData] = useState([]);
  const [playerData, setPlayerData] = useState([]);
  const [team1, setTeam1] = useState('');
  const [team2, setTeam2] = useState('');
  const [goalsTeam1, setGoalsTeam1] = useState(0);
  const [goalsTeam2, setGoalsTeam2] = useState(0);
  const [additionalScorers, setAdditionalScorers] = useState([]);

  const handleTeamChange = async (team, selectedTeam) => {
    team === 'team1' ? setTeam1(selectedTeam) : setTeam2(selectedTeam);
    if (selectedTeam) {
      try {
        const response = await axios.get(`http://localhost/players/index.php/${selectedTeam}`);
        if (response.status === 200) {
          setPlayerData(response.data);
        } else {
          console.error('Error fetching player data');
        }
      } catch (error) {
        console.error('Error fetching player data:', error);
      }
    } else {
      setPlayerData([]);
    }
  };

  const handleUpdateResults = async () => {
    try {
      if (!team1 || !team2) {
        console.error('Please select both teams.');
        return;
      }

      const response = await fetch('http://localhost/football_scores/index.php/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          team1: {
            team_name: team1,
            matches_played: 1,
            goals_for: goalsTeam1,
            goals_against: goalsTeam2,
          },
          team2: {
            team_name: team2,
            matches_played: 1,
            goals_for: goalsTeam2,
            goals_against: goalsTeam1,
          },
          additionalScorers: additionalScorers.map(scorer => ({
            scorer1: scorer.scorer1,
            goals1: scorer.goals1,
            scorer2: scorer.scorer2,
            goals2: scorer.goals2,
          })),
          playerData: playerData.map(player => ({ player_name: player.player_name })),
        }),
      });

      if (response.ok) {
        console.log('Football scores updated successfully!');
        fetchTeamData();
        setAdditionalScorers([]);
        setGoalsTeam1(0);
        setGoalsTeam2(0);
      } else {
        console.error('Error updating football scores');
      }
    } catch (error) {
      console.error('Error updating football scores:', error);
    }
  };

  const fetchTeamData = () => {
    fetch('http://localhost/football_scores/index.php/')
      .then(response => response.json())
      .then(data => {
        const sortedData = data.sort((a, b) => b.points - a.points);
        setTeamData(sortedData);
      })
      .catch(error => console.error('Error fetching team data:', error));
  };

  useEffect(() => {
    fetchTeamData();
  }, []);

  const handleAddScorer = () => {
    setAdditionalScorers([...additionalScorers, { scorer1: '', scorer2: '', goals1: 0, goals2: 0 }]);
  };

  const handleScorerChange = async (index, field, value) => {
    const updatedScorers = [...additionalScorers];
    updatedScorers[index][field] = value;
    setAdditionalScorers(updatedScorers);

    if (field === 'scorer1' && value) {
      try {
        const response = await axios.get(`http://localhost/players/index.php/${value}`);
        if (response.status === 200) {
          setPlayerData(response.data);
        } else {
          console.error('Error fetching player data');
        }
      } catch (error) {
        console.error('Error fetching player data:', error);
      }
    }

    if (field === 'scorer2' && value) {
      try {
        const response = await axios.get(`http://localhost/players/index.php/${value}`);
        if (response.status === 200) {
          setPlayerData(response.data);
        } else {
          console.error('Error fetching player data');
        }
      } catch (error) {
        console.error('Error fetching player data:', error);
      }
    }
  };

  const handleUpdateGoalsButton = async (index) => {
    try {
      const scorer = additionalScorers[index];

      const responseTeam1 = await axios.post(`http://localhost/scores/index.php/`, {
        player_name: scorer.scorer1,
        goals: scorer.goals1,
      });

      if (responseTeam1.status !== 200) {
        console.error('Error updating goals for Scorer Team 1');
      }

      const responseTeam2 = await axios.post(`http://localhost/scores/index.php/`, {
        player_name: scorer.scorer2,
        goals: scorer.goals2,
      });

      if (responseTeam2.status !== 200) {
        console.error('Error updating goals for Scorer Team 2');
      }

      const updatedScorers = [...additionalScorers];
      updatedScorers[index].goals1 += 1;
      updatedScorers[index].goals2 += 1;
      setAdditionalScorers(updatedScorers);

      console.log('Goals updated successfully!');
    } catch (error) {
      console.error('Error updating goals:', error);
    }
  };

  const handleResetSeason = async () => {
    try {
      const response = await fetch('http://localhost/football_scores/index.php/reset-season', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Add any necessary data for resetting the season
        }),
      });

      if (response.ok) {
        console.log('Season reset successfully!');
        fetchTeamData();
      } else {
        console.error('Error resetting season');
      }
    } catch (error) {
      console.error('Error resetting season:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">บันทึกเเมตเเข่งขัน</h1>

      <div className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">ทีมเหย้า:</label>
          <select
            value={team1}
            onChange={(event) => handleTeamChange('team1', event.target.value)}
            className="p-2 border rounded-md w-full"
          >
            <option value="">เลือกทีม</option>
            {teamData.map(team => (
              <option key={team.id} value={team.team_name}>
                {team.team_name}
              </option>
            ))}
          </select>
        </div>

        {team1 && (
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">จำนวนประตู ทีมเหย้า:</label>
            <input
              type="number"
              value={goalsTeam1}
              onChange={(event) => setGoalsTeam1(parseInt(event.target.value, 10))}
              className="p-2 border rounded-md w-full"
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">ทีมเยือน:</label>
          <select
            value={team2}
            onChange={(event) => handleTeamChange('team2', event.target.value)}
            className="p-2 border rounded-md w-full"
          >
            <option value="">เลือกทีม</option>
            {teamData.map(team => (
              <option key={team.id} value={team.team_name}>
                {team.team_name}
              </option>
            ))}
          </select>
        </div>

        {team2 && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">จำนวนประตู ทีมเยือน:</label>
              <input
                type="number"
                value={goalsTeam2}
                onChange={(event) => setGoalsTeam2(parseInt(event.target.value, 10))}
                className="p-2 border rounded-md w-full"
              />
            </div>
            <button
              onClick={handleUpdateResults}
              className="p-2 bg-blue-500 text-white rounded-md"
              disabled={!team1 || !team2}
            >
              บันทึก
            </button>
          </>
        )}
      </div>

      {additionalScorers.map((scorer, index) => (
        <div key={index} className="grid grid-cols-2 gap-4 mt-4">
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">{`Scorer ${index + 1} (Team 1):`}</label>
            <select
              value={scorer.scorer1}
              onChange={(event) => handleScorerChange(index, 'scorer1', event.target.value)}
              className="p-2 border rounded-md w-full"
            >
              <option value="">เลือกผู้เล่น</option>
              {playerData.map(player => (
                <option key={player.id} value={player.player_name}>
                  {player.player_name}
                </option>
              ))}
            </select>
            <div className="mt-2">
              <label className="block text-sm font-semibold mb-1">Goals:</label>
              <input
                type="number"
                value={scorer.goals1 || 0}
                onChange={(event) => handleScorerChange(index, 'goals1', parseInt(event.target.value, 10))}
                className="p-2 border rounded-md w-full"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">{`Scorer ${index + 1} (Team 2):`}</label>
            <select
              value={scorer.scorer2}
              onChange={(event) => handleScorerChange(index, 'scorer2', event.target.value)}
              className="p-2 border rounded-md w-full"
            >
              <option value="">เลือกผู้เล่น</option>
              {playerData.map(player => (
                <option key={player.id} value={player.player_name}>
                  {player.player_name}
                </option>
              ))}
            </select>
            <div className="mt-2">
              <label className="block text-sm font-semibold mb-1">Goals:</label>
              <input
                type="number"
                value={scorer.goals2 || 0}
                onChange={(event) => handleScorerChange(index, 'goals2', parseInt(event.target.value, 10))}
                className="p-2 border rounded-md w-full"
              />
              <button
                onClick={() => handleUpdateGoalsButton(index)}
                className="p-2 bg-green-500 text-white rounded-md mt-2"
              >
                ตกลง
              </button>
            </div>
          </div>
        </div>
      ))}

      <button onClick={handleAddScorer} className="p-2 bg-yellow-500 text-white rounded-md mt-4">
        เพิ่มผู้ทำประตู
      </button>

      <button onClick={handleResetSeason} className="p-2 bg-red-500 text-white rounded-md mt-4">
        รีเซ็ตฤดูกาล
      </button>

      <table className="w-full mt-4 border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">อันดับ</th>
            <th className="p-2">ชื่อทีม</th>
            <th className="p-2">จำนวนเเมต</th>
            <th className="p-2">ชนะ</th>
            <th className="p-2">เสมอ</th>
            <th className="p-2">แพ้</th>
            <th className="p-2">ได้ประตู</th>
            <th className="p-2">เสียประตู</th>
            <th className="p-2">เเต้ม</th>
          </tr>
        </thead>
        <tbody>
          {teamData.map((team, index) => (
            <tr key={team.id}>
              <td className="p-2">{index + 1}</td>
              <td className="p-2">{team.team_name}</td>
              <td className="p-2">{team.matches_played}</td>
              <td className="p-2">{team.wins}</td>
              <td className="p-2">{team.draws}</td>
              <td className="p-2">{team.losses}</td>
              <td className="p-2">{team.goals_for}</td>
              <td className="p-2">{team.goals_against}</td>
              <td className="p-2">{team.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FootballScores;
