<?php

include './dbConnect.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

function fetchProjects($pdo, $name = '') {
    $stmt = $pdo->query('SELECT * FROM projects WHERE name LIKE "%' . $name . '%"');
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

$name = isset($_GET['name']) ? $_GET['name'] : '';

$searchResults = fetchProjects($pdo, $name);

echo json_encode($searchResults);
?>
