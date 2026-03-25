<?php
// jsLoader.php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// JS dir
$jsDir = __DIR__ . '/../js';

if (!file_exists($jsDir)) {
    echo json_encode([
        'success' => false,
        'error' => 'JS directory not found',
        'path' => $jsDir
    ]);
    exit;
}

// obtener todo js document
$files = scandir($jsDir);
$jsFiles = array_filter($files, function($file) {
    return pathinfo($file, PATHINFO_EXTENSION) === 'js';
});

// Reindexing
$jsFiles = array_values($jsFiles);

//return
echo json_encode([
    'success' => true,
    'count' => count($jsFiles),
    'files' => $jsFiles,
    'path' => '/js/'
]);
?>