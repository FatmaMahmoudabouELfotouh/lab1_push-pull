<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require "./dbConnect.php";

$data = json_decode(file_get_contents("php://input"), true);

$email = $data['useremail'];
$name = $data['username'];
$password = $data['userpassword'];

$sql = "INSERT INTO user (name, email, password) VALUES ('$name', '$email', '$password')";

if ($pdo->query($sql)) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "failed"]);
}
?>
