
function phpMkdir(Path){
   fetch(`./api/fileManeger/mkdir.php/`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         targetPath: Path
      })
   })
   .then(response => response.json())
   .then(data => console.log(data));
}


function phpRm(Path){
   fetch(`./api/fileManeger/rm.php/`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         targetPath: Path
      })
   })
   .then(response => response.json())
   .then(data => console.log(data));
}

function phpUpload(formData){
    fetch('./api/fileManeger/upload.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        //loadingMsg.remove();
        
        if (data.success) {
            alert('Upload file: ' + data.filename);
            console.log(fileInput.currentTarget)
            fileInput.currentTarget.src = data.path;
        } else {
            alert('Error: ' + data.message);
        }
        
        // remove file
        fileInput.value = '';
    })
    .catch(error => {
        //loadingMsg.remove();
        console.error('Error:', error);
        alert('Fall update');
        fileInput.value = '';
    });
}