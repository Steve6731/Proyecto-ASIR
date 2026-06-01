<?php
header('Content-Type: application/json');

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

// set default is actual dir
/*
if (empty($targetPath)) {
    $targetPath = '.';
}*/

// Security 
$targetPath = str_replace(['..', './', '\\'], '', $targetPath);
$targetPath = trim($targetPath, '/');

// basedir
include("config.php");
$fullPath = $baseDir . $targetPath;

// check exist
if (!file_exists($fullPath)) {
    echo json_encode([
        'success' => false,
        'message' => 'Path no exist',
        'path' => $fullPath
    ]);
    exit;
}

// check if is dir
if (!is_dir($fullPath)) {
    echo json_encode([
        'success' => false,
        'message' => 'Path is not a dir',
        'path' => $fullPath
    ]);
    exit;
}

// get
$items = scandir($fullPath);
if ($items === false) {
    echo json_encode([
        'success' => false,
        'message' => 'can not read content'
    ]);
    exit;
}

// filter . ..
$items = array_filter($items, function($item) {
    return $item !== '.' && $item !== '..';
});

// result
$files = [];
$folders = [];

foreach ($items as $item) {
    $itemPath = $fullPath . DIRECTORY_SEPARATOR . $item;
    $relativePath = $targetPath === '.' ? $item : $targetPath . '/' . $item;
    
    if (is_dir($itemPath)) {
        $folders[] = [
            'name' => $item,
            'path' => $relativePath,
            'type' => 'folder',
            'full_path' => $itemPath
        ];
    } else {
        $files[] = [
            'name' => $item,
            'path' => $relativePath,
            'type' => 'file',
            'size' => filesize($itemPath),
            'full_path' => $itemPath
        ];
    }
}


sort($folders);
sort($files);
$allItems = array_merge($folders, $files);


$simplePaths = array_map(function($item) {
    return $item['path'];
}, $allItems);

echo json_encode([
    'success' => true,
    'message' => 'Get paths correctly',
    'current_path' => $targetPath === '.' ? '/' : '/' . $targetPath,
    'full_path' => $fullPath,
    'total' => count($allItems),
    'items' => $allItems,  
    'paths' => $simplePaths  
], JSON_PRETTY_PRINT);
?>