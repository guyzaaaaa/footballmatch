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
        // Code to retrieve data from the "footballnews" table
        $sql = "SELECT news_id, title, content, news_image_url FROM footballnews";

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
        // Handle POST request to insert data into the "footballnews" table
        $title = $data['title'];
        $content = $data['content'];
        $news_image_url = $data['news_image_url'];

        $sql = "INSERT INTO footballnews (title, content, news_image_url) VALUES ('$title', '$content', '$news_image_url')";

        if ($conn->query($sql) === true) {
            $response = array('status' => 'success', 'message' => 'Record inserted successfully');
        } else {
            $response = array('status' => 'error', 'message' => 'Error inserting record: ' . $conn->error);
        }

        echo json_encode($response);
        break;

    case 'PUT':
        // Handle PUT request to update data in the "footballnews" table
        $news_id = $data['news_id'];
        $title = $data['title'];
        $content = $data['content'];
        $news_image_url = $data['news_image_url'];

        $sql = "UPDATE footballnews SET title='$title', content='$content', news_image_url='$news_image_url' WHERE news_id='$news_id'";

        if ($conn->query($sql) === true) {
            $response = array('status' => 'success', 'message' => 'Record updated successfully');
        } else {
            $response = array('status' => 'error', 'message' => 'Error updating record: ' . $conn->error);
        }

        echo json_encode($response);
        break;

        case 'DELETE':
            // Handle DELETE request to delete data from the "footballnews" table
            $table = 'footballnews';
            $id = isset($data['news_id']) ? $data['news_id'] : null;
        
            if ($id !== null) {
                $sql = "DELETE FROM $table WHERE news_id='$id'";
        
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
        // Preflight request. Respond successfully.
        http_response_code(200);
        break;

    default:
        // Invalid request method
        $response = array('status' => 'error', 'message' => 'Invalid request method');
        echo json_encode($response);
        break;
}
?>
