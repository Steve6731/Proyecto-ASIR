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

// si ya existen la carpeta
if (is_dir($fullPath)) {
    echo json_encode([
        'success' => false,
        'message' => 'Carpeta ya existen',
        'path' => $fullPath
    ]);
    exit;
}

// crea nueva carpeta
if (mkdir($fullPath, 0777, true)) {
    echo json_encode([
        'success' => true,
        'message' => 'mkdir correct',
        'path' => $fullPath
    ]);
} else { // si falla
    echo json_encode([
        'success' => false,
        'message' => 'Error: fall permisses'
    ]);
}
?>