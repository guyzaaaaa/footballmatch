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
        $sql = "SELECT id, name, province, color, shirt_data, image FROM teams";
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
        $name = $data['name'];
        $province = $data['province'];
        $color = $data['color'];
        $shirt_data = $data['shirt_data'];
        $image = $data['image'];

        $sql = "INSERT INTO teams (name, province, color, shirt_data, image) VALUES ('$name', '$province', '$color', '$shirt_data', '$image')";

        if ($conn->query($sql) === TRUE) {
            $response = array('status' => 'success', 'message' => 'Record inserted successfully');
        } else {
            $response = array('status' => 'error', 'message' => 'Error inserting record: ' . $conn->error);
        }

        echo json_encode($response);
        break;

    case 'PUT':
        $id = $data['id'];
        $name = $data['name'];
        $province = $data['province'];
        $color = $data['color'];
        $shirt_data = $data['shirt_data'];
        $image = $data['image'];

        $sql = "UPDATE teams SET name='$name', province='$province', color='$color', shirt_data='$shirt_data', image='$image' WHERE id=$id";

        if ($conn->query($sql) === TRUE) {
            $response = array('status' => 'success', 'message' => 'Record updated successfully');
        } else {
            $response = array('status' => 'error', 'message' => 'Error updating record: ' . $conn->error);
        }

        echo json_encode($response);
        break;

        case 'DELETE':
            // Handle DELETE request to delete data from the "teams" table
            $table = 'teams';
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
