<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
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
        // Code to retrieve data from the "comment1" table
        $sql = "SELECT comment_id, comment, id FROM comment1";

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
        // Handle POST request to insert data into the "comment1" table
        $comment = $data['comment'];
        $id = $data['id'];

        $sql = "INSERT INTO comment1 (comment, id) VALUES ('$comment', '$id')";

        if ($conn->query($sql) === TRUE) {
            // Get the inserted comment_id from the database
            $commentId = $conn->insert_id;

            $response = array(
                'status' => 'success',
                'message' => 'Record inserted successfully',
                'comment_id' => $commentId // Send the inserted comment_id back to the client
            );
        } else {
            $response = array('status' => 'error', 'message' => 'Error inserting record: ' . $conn->error);
        }

        echo json_encode($response);
        break;

    // ... (Remaining cases: PUT, DELETE)

    default:
        // Invalid request method
        $response = array('status' => 'error', 'message' => 'Invalid request method');
        echo json_encode($response);
        break;
}
?>
