(function() {
    async function loadJsFiles() {
        try {
            const response = await fetch('./api/jsLoader.php');
            const data = await response.json();
            
            if (data.success) {
                data.files.forEach(file => {
                    const script = document.createElement('script');
                    script.src = 'js/' + file;
                    document.head.appendChild(script);
                    console.log('Loading:', file);
                });
            }
        } catch (error) {
            console.error('Failed to load JS files:', error);
        }
    }
    
    window.addEventListener('DOMContentLoaded', loadJsFiles);
})();