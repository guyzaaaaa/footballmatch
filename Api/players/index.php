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
        // Code to retrieve data from the "players" table
        $sql = "SELECT player_id, player_name, team_name, position, nationality, player_image_url FROM players";

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
        // Handle POST request to insert data into the "players" table
        $player_name = $data['player_name'];
        $team_name = $data['team_name'];
        $position = $data['position'];
        $nationality = $data['nationality'];
        $player_image_url = $data['player_image_url'];

        $sql = "INSERT INTO players (player_name, team_name, position, nationality, player_image_url) VALUES ('$player_name', '$team_name', '$position', '$nationality', '$player_image_url')";

        if ($conn->query($sql) === TRUE) {
            $response = array('status' => 'success', 'message' => 'Record inserted successfully');
        } else {
            $response = array('status' => 'error', 'message' => 'Error inserting record: ' . $conn->error);
        }

        echo json_encode($response);
        break;

        case 'PUT':
            $player_id = $data['player_id'];
            $player_name = $data['player_name'];
            $team_name = $data['team_name'];
            $position = $data['position'];
            $nationality = $data['nationality'];
            $player_image_url = $data['player_image_url'];
        
            $sql = "UPDATE players SET player_name='$player_name', team_name='$team_name', position='$position', nationality='$nationality', player_image_url='$player_image_url' WHERE player_id=$player_id";
        
            if ($conn->query($sql) === TRUE) {
                $response = array('status' => 'success', 'message' => 'Record updated successfully');
            } else {
                $response = array('status' => 'error', 'message' => 'Error updating record: ' . $conn->error);
            }
        
            echo json_encode($response);
            break;
        
        
            case 'OPTIONS':
                header("Allow: POST, GET, PUT, DELETE, OPTIONS");
                http_response_code(200);
                break;
            

    // ... (บันทึก code ที่มีอยู่)

    case 'DELETE':
        // Handle DELETE request to delete data from the "players" table
        $table = 'players';
        $player_id = isset($data['player_id']) ? $data['player_id'] : null;
    
        if ($player_id !== null) {
            $sql = "DELETE FROM $table WHERE player_id='$player_id'";
    
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
    

// ... (คงเหลือของ case อื่นๆ)



    default:
    // Invalid request method
    $response = array('status' => 'error', 'message' => 'Invalid request method');
    echo json_encode($response);
    break;
}

?>
