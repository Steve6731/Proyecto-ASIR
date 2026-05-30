<?php
header('Content-Type: application/json');

// check file
if (!isset($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
    echo json_encode([
        'success' => false,
        'message' => 'Error: no file'
    ]);
    exit;
}

$file = $_FILES['file'];
include("config.php");
$uploadDir = $baseDir .  'img/';

// change to a save name
$fileExtension = pathinfo($file['name'], PATHINFO_EXTENSION);
$safeFilename = time() . '_' . uniqid() . '.' . $fileExtension;
$targetPath = $uploadDir . $safeFilename;

// move to target dir
if (move_uploaded_file($file['tmp_name'], $targetPath)) {
    echo json_encode([
        'success' => true,
        'message' => 'save file correct',
        'path' => 'img/' . $safeFilename,
        'filename' => $safeFilename
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Error: check permissions'
    ]);
}
?>