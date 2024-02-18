import React from "react";
import 'bulma/css/bulma.min.css';
const TeamFormationData = ({ formation, onClose, selectedTeamPlayers }) => {
  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card">
        <div className="modal-content"> {/* เพิ่ม div นี้ */}
          <header className="modal-card-head">
            <p className="modal-card-title">Team Formation Details</p>
            <button className="delete" aria-label="close" onClick={onClose}></button>
          </header>
          <section className="modal-card-body">
            <div className="content">
              {selectedTeamPlayers.map((player) => (
                <p key={player.id} className="text-sm text-gray-500">
                  Player Name: {player.player_name}
                </p>
              ))}
              <p className="text-sm text-gray-500">Position: {formation.position}</p>
              <p className="text-sm text-gray-500">Team: {formation.teamname}</p>
              <img
                src={formation.playersimg}
                alt={formation.playersimg}
                className="w-20 h-20 object-cover"
              />
            </div>
          </section>
          <footer className="modal-card-foot">
            <button
              onClick={onClose}
              className="button is-success"
            >
              Close
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default TeamFormationData;
