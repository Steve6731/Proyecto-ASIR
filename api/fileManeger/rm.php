<?php
header('Content-Type: application/json');

// obtener datos
$requestData = json_decode(file_get_contents('php://input'), true);

// check parameter
if (!isset($requestData['targetPath']) || empty($requestData['targetPath'])) {
    echo json_encode([
        'success' => false,
        'message' => 'Need parameter'
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

// check path
if ($fullPath == $baseDir || $fullPath == $baseDir . '..') {
    echo json_encode([
        'success' => false,
        'message' => 'Erorr: can not remove root dir'
    ]);
    exit;
}

// function remove dir
function deleteDirectory($dir) {
    if (!file_exists($dir)) {
        return true;
    }
    
    if (!is_dir($dir)) {
        return unlink($dir);
    }
    
    $items = scandir($dir);
    foreach ($items as $item) {
        if ($item == '.' || $item == '..') {
            continue;
        }
        
        $path = $dir . DIRECTORY_SEPARATOR . $item;
        if (is_dir($path)) {
            if (!deleteDirectory($path)) {
                return false;
            }
        } else {
            if (!unlink($path)) {
                return false;
            }
        }
    }
    
    return rmdir($dir);
}

// check path
if (!file_exists($fullPath)) {
    echo json_encode([
        'success' => false,
        'message' => 'Error: Target no exit',
        'path' => $fullPath
    ]);
    exit;
}

// do delete
if (is_dir($fullPath)) {
    // remove dir
    if (deleteDirectory($fullPath)) {
        echo json_encode([
            'success' => true,
            'message' => 'Delete dir correct',
            'path' => $fullPath
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Error: No pude eliminar carpeta'
        ]);
    }
} else {
    // remove file
    if (unlink($fullPath)) {
        echo json_encode([
            'success' => true,
            'message' => 'Delete documento correctly',
            'path' => $fullPath
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Error: No pude eliminar documento'
        ]);
    }
}
?>