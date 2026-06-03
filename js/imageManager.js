const imageContainer = document.getElementById("imageContainer");
const $imageContainer = $(imageContainer);
const imageGridContainer = document.getElementById("imageGridContainer");

let isLoadImageContainer = false;
async function showImageContainer(){
   if (!isLoadImageContainer){
      let imagesFiles = await phpLs("./img/");
      let paths = imagesFiles.paths;
      console.log(imagesFiles);
      if (paths && Array.isArray(paths)) {
         paths.forEach(path => {
            addImageCard(path);
         });
         isLoadImageContainer = true;
      }
   }

   $imageContainer.show();
   if ($interfaceOverlay.css('display') == "none"){
      $imageContainer.show();
   }
   if (!('wheel' in document.body)){
   document.body.addEventListener('wheel', (e) => {
      e.preventDefault();
   }, { passive: false });
   }
}

function hiddenImageContainer(){
   $imageContainer.hide() 
   if ($interfaceOverlay.css('display') != "none"){
      $imageContainer.hide();
   }
   if ('wheel' in document.body){
      document.body.removeEventListener('wheel', wheelHandler, { passive: false });
   }
}

function addImageCard(path){
   let newCard = document.createElement("div");
   newCard.classList.add("gridCard");
   let newImg = document.createElement("img");
   newImg.src = path;
   newCard.appendChild(newImg);
   imageGridContainer.appendChild(newCard);
   newImg.addEventListener('dblclick', function(e) {
      currentSelectElement.src = newImg.src;
      hiddenImageContainer()
      setFocus(currentSelectElement)
   });
}

$(document).ready(function(){
   hiddenImageContainer();
});

function addNewImage(){
   fileInput.click();
   fileInput.targetElement=imageGridContainer;
}

fileInput.addEventListener('change', async function(event) {
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
   let newPath = await phpUpload(formData);
   
   setTimeout(() => {
      if (fileInput.targetElement == imageGridContainer){
         console.log(newPath);
         addImageCard(newPath);
      }
   }, 500);

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