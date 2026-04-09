
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


<?php
/*
function scanJsFiles($dir, $baseDir = '') {
    $array = [];
    $items = scandir($dir);
    
    foreach ($items as $item) {
        if ($item === '.' || $item === '..') continue;
        
        $path = $dir . '/' . $item;
        $relativePath = $baseDir ? $baseDir . '/' . $item : $item;
        
        if (is_dir($path)) {
            $array = array_merge($array, scanJsFiles($path, $relativePath));
        } elseif (pathinfo($item, PATHINFO_EXTENSION) === 'js') {
            $array[] = $relativePath;
        }
    }
    
    return $array;
}



$loaderDir = __DIR__ . '/../';
$jsFiles = scanJsFiles($loaderDir);

echo json_encode([
    'success' => true,
    'count' => count($jsFiles),
    'files' => $jsFiles,
    'path' => '/'
]);
*/
?>