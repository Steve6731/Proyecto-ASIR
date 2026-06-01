<?php
header('Content-Type: application/json');

// obtener datos
$requestData = json_decode(file_get_contents('php://input'), true);

// existen datos
if (!isset($requestData['targetPath']) || empty($requestData['targetPath'])) {
    echo json_encode([
        'success' => false,
        'message' => 'Error: need parameter'
    ]);
    exit;
}

$targetPath = $requestData['targetPath'];

// Security 
$targetPath = str_replace(['..', './', '\\'], '', $targetPath);
$targetPath = trim($targetPath, '/');

// config
include("config.php");
$fullPath = $baseDir . $targetPath;

// if dir exit
if (!file_exists($fullPath) || !is_file($fullPath)) {
    echo json_encode([
        'success' => false,
        'message' => 'File no exit'
    ]);
    exit;
}

// read content
$fileContent = file_get_contents($fullPath);

if ($fileContent === false) {
    echo json_encode([
        'success' => false,
        'message' => 'Can not read'
    ]);
    exit;
}

// return
echo json_encode([
    'success' => true,
    'filename' => basename($fullPath),
    'content' => base64_encode($fileContent),
    'size' => filesize($fullPath)
]);
?>