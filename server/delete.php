<?php

include './dbConnect.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

function removeData($pdo, $id) {
    $query = "DELETE FROM projects WHERE id = $id";
    if ($pdo->query($query)) {
        return 1;
    } else {
        return 0;
    }
}

if(removeData($pdo, $_GET['id'])){
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "failed"]);
}

?>
