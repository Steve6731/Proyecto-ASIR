
fileInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    
    if (!file) {
        return;
    }
    
    // check file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
        alert('only (JPEG, PNG, GIF, WEBP)');
        fileInput.value = ''; // remove file
        return;
    }
    
    // check file size
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
        alert('file size max: 5MB');
        fileInput.value = '';
        return;
    }
    // show formData
    const formData = new FormData();
    formData.append('file', file);

    phpUpload(formData);
    /*
    // css
    const loadingMsg = document.createElement('div');
    loadingMsg.textContent = '上传中...';
    loadingMsg.style.position = 'fixed';
    loadingMsg.style.top = '50%';
    loadingMsg.style.left = '50%';
    loadingMsg.style.transform = 'translate(-50%, -50%)';
    loadingMsg.style.background = 'rgba(0,0,0,0.8)';
    loadingMsg.style.color = 'white';
    loadingMsg.style.padding = '10px 20px';
    loadingMsg.style.borderRadius = '5px';
    loadingMsg.style.zIndex = '9999';
    document.body.appendChild(loadingMsg);
    */
});