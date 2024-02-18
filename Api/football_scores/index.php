<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
header("Content-Type: application/json");

require_once 'connection.php';

$method = $_SERVER['REQUEST_METHOD'];
$data = json_decode(file_get_contents("php://input"), true);

switch ($method) {
    case 'GET':
        $sql = "SELECT id, team_name, matches_played, wins, draws, losses, goals_for, goals_against, points FROM football_scores";
        $result = $conn->query($sql);
        $response = array();

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $response[] = $row;
            }
        } else {
            $response = array('status' => 'error', 'message' => 'No records found');
        }

        echo json_encode($response);
        break;

    case 'POST':
        if ($_SERVER['REQUEST_URI'] === '/football_scores/index.php/reset-season') {
            // Reset season logic here
            $resetSql = "UPDATE football_scores SET 
                matches_played = 0,
                wins = 0,
                draws = 0,
                losses = 0,
                goals_for = 0,
                goals_against = 0,
                points = 0";
            if ($conn->query($resetSql) === TRUE) {
                $response = array('status' => 'success', 'message' => 'Season reset successfully');
            } else {
                $response = array('status' => 'error', 'message' => 'Error resetting season: ' . $conn->error);
            }
            echo json_encode($response);
            break;
        }
        // Continue with your existing POST logic
        $team1_name = $data['team1']['team_name'];
        $team2_name = $data['team2']['team_name'];

        // Update data for Team 1
        $sql_team1 = "UPDATE football_scores SET 
            matches_played = matches_played + 1,
            wins = wins + " . ($data['team1']['goals_for'] > $data['team1']['goals_against'] ? 1 : 0) . ",
            draws = draws + " . ($data['team1']['goals_for'] == $data['team1']['goals_against'] ? 1 : 0) . ",
            losses = losses + " . ($data['team1']['goals_for'] < $data['team1']['goals_against'] ? 1 : 0) . ",
            goals_for = goals_for + '{$data['team1']['goals_for']}',
            goals_against = goals_against + '{$data['team1']['goals_against']}',
            points = points + " . (($data['team1']['goals_for'] > $data['team1']['goals_against']) ? 3 : (($data['team1']['goals_for'] == $data['team1']['goals_against']) ? 1 : 0)) . "
            WHERE team_name = '$team1_name'";

        // Update data for Team 2
        $sql_team2 = "UPDATE football_scores SET 
            matches_played = matches_played + 1,
            wins = wins + " . ($data['team2']['goals_for'] > $data['team2']['goals_against'] ? 1 : 0) . ",
            draws = draws + " . ($data['team2']['goals_for'] == $data['team2']['goals_against'] ? 1 : 0) . ",
            losses = losses + " . ($data['team2']['goals_for'] < $data['team2']['goals_against'] ? 1 : 0) . ",
            goals_for = goals_for + '{$data['team2']['goals_for']}',
            goals_against = goals_against + '{$data['team2']['goals_against']}',
            points = points + " . (($data['team2']['goals_for'] > $data['team2']['goals_against']) ? 3 : (($data['team2']['goals_for'] == $data['team2']['goals_against']) ? 1 : 0)) . "
            WHERE team_name = '$team2_name'";

        if ($conn->query($sql_team1) === TRUE && $conn->query($sql_team2) === TRUE) {
            $response = array('status' => 'success', 'message' => 'Records updated successfully');
        } else {
            $response = array('status' => 'error', 'message' => 'Error updating records: ' . $conn->error);
        }

        echo json_encode($response);
        break;

    case 'PUT':
        // PUT method logic here
        break;

    case 'DELETE':
        // DELETE method logic here
        break;

    case 'OPTIONS':
        header("Allow: POST, GET, PUT, DELETE, OPTIONS");
        http_response_code(200);
        break;

    default:
        $response = array('status' => 'error', 'message' => 'Invalid request method');
        http_response_code(405);
        echo json_encode($response);
        break;
}
?>
