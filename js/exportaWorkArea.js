// ------------------------ EXPORTAR HTML -----------------------------
// AI version
function exportWorkArea() {
    const workAreaContent = workArea.innerHTML;
    const htmlDocm = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi documento exportado</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
            margin: 0;
        }
        #container {
            max-width: 1200px;
            margin: 0 auto;
        }
    </style>
</head>
<body>
    <div id="container">
        ${workAreaContent}
    </div>
</body>
</html>`;

    // Crear un blob con el contenido HTML
    const blob = new Blob([htmlDocm], { type: 'text/html' });
    
    // Crear URL del blob
    const url = URL.createObjectURL(blob);
    
    // Crear enlace de descarga
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = `export_${new Date().toISOString().slice(0,19).replace(/:/g, '-')}.html`;
    
    // Simular clic para descargar
    document.body.appendChild(downloadLink);
    downloadLink.click();
    
    // Limpiar
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);
    
    console.log('Exportación completada');
}