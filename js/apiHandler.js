function phpDownload(Path){
   return fetch('./api/fileManeger/download.php', {
      method: 'POST',
      headers: {
            'Content-Type': 'application/json',
      },
      body: JSON.stringify({ targetPath: Path })
   })
   .then(response => response.json())
   .then(data => {
      if (data.success) {
            //return data and state
            return {
               success: true,
               fileName: getFileNameFromPath(Path),
               content: data.content
            };
      } else {
            return {
               success: false,
               filePath: Path,
               message: data.message
            };
      }
   })
   .catch(error => {
      return {
         success: false,
         filePath: Path,
         message: error.message
      };
   });
}


function phpLs(Path){
   return fetch(`./api/fileManeger/ls.php`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         targetPath: Path
      })
   })
   .then(response => response.json())
   .then(data => {
      if (data.success) {
         return data;
      } else {
         console.error('Error:', data.message);
         return null;
      }
   });
}

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

function getFileNameFromPath(filePath) {
   return filePath.split('/').pop() || filePath;
}