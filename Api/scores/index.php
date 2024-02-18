<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
header("Content-Type: application/json");

// Include the database connection file
require_once 'connection.php';

// Get request method
$method = $_SERVER['REQUEST_METHOD'];

// Retrieve the input data
$data = json_decode(file_get_contents("php://input"), true);

// Perform operations based on the request method
switch ($method) {
    case 'GET':
        // Code to retrieve data from the "scores" table
        $sql = "SELECT id, player_name, goals FROM scores";

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
        // Handle POST request to insert data into the "scores" table
        $player_name = $data['player_name'];
        $goals = $data['goals'];

        // Check if player_name is not empty
        if (!empty($player_name)) {
            // Check if player_name exists
            $checkPlayerExists = "SELECT * FROM scores WHERE player_name='$player_name'";
            $resultPlayerExists = $conn->query($checkPlayerExists);

            if ($resultPlayerExists->num_rows > 0) {
                // Update goals for existing player_name
                $sqlUpdateGoals = "UPDATE scores SET goals=goals+$goals WHERE player_name='$player_name'";
                if ($conn->query($sqlUpdateGoals) !== TRUE) {
                    $response = array('status' => 'error', 'message' => 'Error updating goals: ' . $conn->error);
                    echo json_encode($response);
                    break;
                }

                $response = array('status' => 'success', 'message' => 'Goals updated successfully');
                echo json_encode($response);
            } else {
                // Insert new record if player_name doesn't exist
                $sqlInsert = "INSERT INTO scores (player_name, goals) VALUES ('$player_name', $goals)";

                if ($conn->query($sqlInsert) === TRUE) {
                    $response = array('status' => 'success', 'message' => 'Record inserted successfully');
                } else {
                    $response = array('status' => 'error', 'message' => 'Error inserting record: ' . $conn->error);
                }

                echo json_encode($response);
            }
        } else {
            $response = array('status' => 'error', 'message' => 'Player name cannot be empty');
            echo json_encode($response);
        }

        break;

    case 'OPTIONS':
        header("Allow: POST, GET, PUT, DELETE, OPTIONS");
        http_response_code(200);
        break;

    case 'DELETE':
        // Handle DELETE request to delete data from the "scores" table
        $table = 'scores';
        $id = isset($data['id']) ? $data['id'] : null;

        if ($id !== null) {
            $sql = "DELETE FROM $table WHERE id=$id";

            if ($conn->query($sql) === true) {
                $response = array('status' => 'success', 'message' => 'Record deleted successfully');
            } else {
                $response = array('status' => 'error', 'message' => 'Error deleting record: ' . $conn->error);
            }
        } else {
            $response = array('status' => 'error', 'message' => 'Invalid ID provided for deletion');
        }

        echo json_encode($response);
        break;

    default:
        // Invalid request method
        $response = array('status' => 'error', 'message' => 'Invalid request method');
        echo json_encode($response);
        break;
}
?>
