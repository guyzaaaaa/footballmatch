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

$table = 'teamformation'; // เปลี่ยนชื่อตารางเป็น teamformation

switch ($method) {
    case 'GET':
        $sql = "SELECT id, teamname, position, playersname, playersimg FROM $table";
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
        $teamname = $data['teamname'];
        $position = $data['position'];
        $playersname = $data['playersname'];
        $playersimg = $data['playersimg'];

        $sql = "INSERT INTO $table (teamname, position, playersname, playersimg) VALUES ('$teamname', '$position', '$playersname', '$playersimg')";

        if ($conn->query($sql) === TRUE) {
            $response = array('status' => 'success', 'message' => 'Record inserted successfully');
        } else {
            $response = array('status' => 'error', 'message' => 'Error inserting record: ' . $conn->error);
        }

        echo json_encode($response);
        break;

    case 'PUT':
        $id = $data['id'];
        $teamname = $data['teamname'];
        $position = $data['position'];
        $playersname = $data['playersname'];
        $playersimg = $data['playersimg'];

        $sql = "UPDATE $table SET teamname='$teamname', position='$position', playersname='$playersname', playersimg='$playersimg' WHERE id=$id";

        if ($conn->query($sql) === TRUE) {
            $response = array('status' => 'success', 'message' => 'Record updated successfully');
        } else {
            $response = array('status' => 'error', 'message' => 'Error updating record: ' . $conn->error);
        }

        echo json_encode($response);
        break;

        case 'DELETE':
            // Handle DELETE request to delete data from the "teamformation" table
            $table = 'teamformation';
            $id = isset($data['id']) ? $data['id'] : null;
        
            if ($id !== null) {
                $sql = "DELETE FROM $table WHERE id='$id'";
        
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
