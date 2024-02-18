import React from "react";
import Content from "./components/Content";
import Nav from "./components/Nav";
import { Route, Routes } from "react-router-dom";
import Contact from "./components/contact";
import AdminPage from "./components/AdminPage";
import Players from "./players";
import FootballNews from "./components/footballnews";
import CrudFootballNews from "./components/crudfootballnews";
import CrudPlayers from "./components/crudplayers";
import AllTeams from "./components/allteam";
import TeamFormation from "./components/teamformation";
import LoginWithLocalStorage from "./components/LoginWithLocalStorage";
import AllTeam from "./components/allteam";
import FootballScores from "./components/football_scores";
import Standings from "./components/Standings";
import Topscores from "./components/topscores";
const App = () => {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Players />} />
        <Route path="contact" element={<Content />} />
        <Route path="AdminPage" element={<AdminPage />} />
        <Route path="players" element={<Players />} />
        <Route path="footballnews" element={<FootballNews />} />
        <Route path="crudfootballnews" element={<CrudFootballNews />} />
        <Route path="crudplayers" element={<CrudPlayers />} />
        {/* Add the Route for "All Teams" */}
        <Route path="allteam" element={<AllTeams />} />
        <Route path="teamformation" element={<TeamFormation />} />
        <Route path="LoginWithLocalStorage" element={<LoginWithLocalStorage />} />
        <Route path="allteam" element={<AllTeam />} />
        <Route path="football_scores" element={<FootballScores />} />
        <Route path="Standings" element={<Standings />} />
        <Route path="Topscores" element={<Topscores />} />
      </Routes>
    </div>
  );
};

export default App;
