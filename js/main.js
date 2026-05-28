let dragSourceNode = null;
let IframeScale = 0.5;
const iframe = document.getElementById('myIframe');
let $iframe = $(iframe);
const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
let iframeBody = $("#myIframe body");
let DOMTreeMainUl=document.getElementById("bodyDOMTreeList");
DOMTreeMainUl.refElement=iframeDoc;
var currentSelectElement;
var draggedElement; let dragging;
var draggedDOMTreeElement; var currentHoverElement;

//-----------------------Current Selected Element----------------------

function setAllElementFocusable(){
   let focusableElements = iframeDoc.body.querySelectorAll('*');
   focusableElements.forEach(elem => {
      setFocusable(elem);
   });
   
}
function setFocusable(element){
   element.addEventListener('click', (e) => {
      setFocus(element);
      e.stopPropagation();
   });
}

iframeDoc.addEventListener('click',(e) => {
   setFocus();
   e.stopPropagation();
});

function setFocus(element,showOverlay = true){
   if(currentSelectElement){
      currentSelectElement.style.transform = '';
      if (currentSelectElement.Overlay){
         currentSelectElement.removeChild(currentSelectElement.Overlay);
         iframeView.removeChild(currentSelectElement.dragHandleIcon);
         delete currentSelectElement.dragHandleIcon;
         delete currentSelectElement.Overlay;
      }
   }

   if (element === null || element === undefined){
      currentSelectElement = null;
      return 0;
   }
   currentSelectElement = element;
   
   currentSelectElement.style.transform = 'translate(0, 0)';

   function addOverLayer(parentElement,Overlay,hight,width,top,left,border){
      Overlay.style.position = "absolute";
      Overlay.style.border = border;
      Overlay.style.height = `${hight}px`;
      Overlay.style.width = `${width}px`;
      Overlay.style.left =  `${left}px`;
      Overlay.style.top = `${top}px`;
      Overlay.style.pointerEvents = "none";
      parentElement.appendChild(Overlay);
   }

   let border = "1px solid blue"
   OverLayerPadding = document.createElement('div');
   element.Overlay = OverLayerPadding;
   let paddingHight = currentSelectElement.offsetHeight;
   let paddingWidth = currentSelectElement.offsetWidth;
   addOverLayer(element,OverLayerPadding,paddingHight,paddingWidth,0,0,border);
   
   if (showOverlay){
      $(OverLayerPadding).show();
   }else{
      $(OverLayerPadding).hide();
   }
   OverLayerMargin = document.createElement('div');
   let marginTop = parseFloat(element.style.marginTop);
   let marginLeft = parseFloat(element.style.marginLeft);
   let marginBottom = parseFloat(element.style.marginBottom);
   let marginRight = parseFloat(element.style.marginRight);
   let marginHight = paddingHight + marginTop + marginBottom;
   let marginWidth = paddingWidth + marginLeft + marginRight;
   addOverLayer(OverLayerPadding,OverLayerMargin,marginHight,marginWidth,-marginTop,-marginLeft,border);

   OverLayerContent = document.createElement('div');
   let paddingTop = parseFloat(element.style.paddingTop);
   let paddingLeft = parseFloat(element.style.paddingLeft);
   let paddingBottom = parseFloat(element.style.paddingBottom);
   let paddingRight = parseFloat(element.style.paddingRight);
   let contentHight = paddingHight - paddingTop - paddingBottom;
   let contentWidth = paddingWidth - paddingLeft - paddingRight;
   addOverLayer(OverLayerPadding,OverLayerContent,contentHight,contentWidth,paddingTop,paddingLeft,border);

   dragHandleIcon = document.createElement('div');
   dragHandleIcon.refElement = element;
   dragHandleIcon.setAttribute('draggable', 'true');
   dragHandleIcon.innerHTML="⇲";
   element.dragHandleIcon = dragHandleIcon;
   iframeView.appendChild(dragHandleIcon);
   $(dragHandleIcon).css({
      "pointer-events": "auto", 
      "width":"2em",
      "height":"2em",
      "font-size":"1em",
      "position":"absolute",
      "top":" calc( 100% - 2em)",
      "left":"calc( 100% - 2em)",
      "background":"#EEEEEE",
      "display":" flex",
      "justify-content":" center",
      "align-items":" center ",
      "border-radius":"0.5em",
      "transition":" transform 0.3s ease-out",
   })

   dragHandleIcon.addEventListener('dragstart', (e) => {
      draggedElement = e.currentTarget.refElement;
      dragging = true;
      e.stopImmediatePropagation();
      e.stopPropagation();
   });

}
//-----------------------Sortable--------------------------------------

function createNewSortable(element){
   Sortable.create(element,{
      group: {
         name: 'shared',
         pull: false, 
         revertClone: false,
      },
		animation: 150,
      //swapThreshold: 0.05,
      
      onStart: function (evt) {
         setFocus(evt.item,false);
      },
      onEnd: function (evt) {
         setFocus(evt.item,true);
      }

   });
}

function createNewUlSortable(elementUl){
   Sortable.create(elementUl,{
      handle: '.sortable-handle',
      animation: 150,
      onStart: function () {
         console.log("start")
      },
      onEnd: function (evt) {
         sortRefElement(evt);
      },
   });
}

function sortRefElement(event) {
    let dragElement = event.item;
    let targetUl = event.to;
    let newIndex = event.newIndex;
    let dragNode = dragElement.RefElement || dragElement;
    let targetParent = targetUl.RefElement || targetUl;
    let childCount = targetParent.childElementCount;
    if (newIndex >= childCount - 1) {
        targetParent.appendChild(dragNode);
    } else {
        let referenceNode = targetParent.children[newIndex];
        referenceNode.before(dragNode);
    }
    dragElement.draggable=true;
    //newLiAddEventListener(dragElement);
}

function getElementIndex(element){
   Array.from(element.parentNode.childNodes).indexOf(element);
}


//-----------------------Element Manager--------------------------
function addDiv(text){
   newDiv = iframeDoc.createElement('div');
   newDiv.class = "element"; 
   if (text){
      newDiv.innerHTML = text;
   }
   $newDiv = $(newDiv);
   $newDiv.css({
      "min-width":"10px",
      "min-hight":"10px",
      "margin":"5px",
      "padding":"5px"
   });

   if (currentSelectElement){
      currentSelectElement.appendChild(newDiv);
      setFocus(currentSelectElement);
   }else{
      iframeDoc.body.appendChild(newDiv);
   }
   createNewSortable(newDiv);
   
   setFocusable(newDiv);
   

   newDiv.addEventListener('dragover', (e) => {
      if (!dragging) return null;
      e.dataTransfer.dropEffect = 'move';
      e.preventDefault();
      e.stopPropagation();
   });

   newDiv.addEventListener('drop', (e) => {
      if (!dragging) return null;
      e.currentTarget.appendChild(draggedElement);
      createNewSortable(e.currentTarget);
      createNewSortable(draggedElement);
      draggedElement = null;
      dragging = false;
      e.preventDefault();
      e.stopPropagation();
      buildDOMTree(iframeDoc.body,DOMTreeMainUl);
   });

   buildDOMTree(iframeDoc.body,DOMTreeMainUl);
   
}

function removeCurrentSelectElement(){
   if (currentSelectElement){
      currentSelectElement.remove();
      buildDOMTree(iframeDoc.body,DOMTreeMainUl);
      menu.style.display = 'none';
   }
}

//-----------------------leftClickMenu------------------------------------
const menu = document.getElementById("leftClickMenu");

iframeDoc.addEventListener('contextmenu',function(e){
   e.preventDefault();
   menu.style.display = 'block';
   menu.style.position = "absolute";
   let iframeRect = iframe.getBoundingClientRect();
   menu.style.left = e.clientX*IframeScale+iframeRect.left + 'px';
   menu.style.top = e.clientY*IframeScale+iframeRect.top + 'px';
})

document.addEventListener('contextmenu',function(e){
   e.preventDefault();
   menu.style.display = 'block';
   menu.style.position = "fixed";
   menu.style.left = e.clientX + 'px';
   menu.style.top = e.clientY + 'px';
})
document.addEventListener('click', function(){menu.style.display = 'none';});
iframeDoc.addEventListener('click', function(){menu.style.display = 'none';});
menu.addEventListener('click', function(e){e.stopPropagation()});

//-------------------------exportIframe-----------------------------------
async function exportIframeContent(iframeElement, fileName = 'WebSite.zip') {
    if (typeof setFocus === 'function') setFocus();
    
    const doc = iframeElement.contentDocument || iframeElement.contentWindow.document;
    const clonedDoc = doc.cloneNode(true);
    
    // obtener <img>
    const images = clonedDoc.querySelectorAll('img');
    const imageMap = new Map(); // almacena { originalSrc, blob, localPath }
    
    // Imagen
    for (let i = 0; i < images.length; i++) {
        const img = images[i];
        const src = img.getAttribute('src');
        
        if (!src) continue;
        
        const isExternalUrl = /^https?:\/\//i.test(src); //es imagen externa
        const isDataUrl = src.startsWith('data:');//es data base64
        
        if (isExternalUrl || isDataUrl) continue; // salta al seguiente imagen
        
        // direccion local
        try {
            let blob;
            let actualUrl = src;
            
            //traducir direccion relativa al direccion absoluto
            if (!src.startsWith('/') && !src.startsWith('http')) {
                // es direccion relativo
                const baseUrl = doc.baseURI;
                actualUrl = new URL(src, baseUrl).href;
            } else if (src.startsWith('/')) {
                // es direccion absoluto
                actualUrl = new URL(src, window.location.origin).href;
            }
            
            // descargar con blob
            const response = await fetch(actualUrl);
            if (!response.ok) {
                console.warn(`Can not find image: ${actualUrl}`);
                continue;
            }
            blob = await response.blob();
            
            // genera unico filename
            const urlObj = new URL(actualUrl);
            let filename = urlObj.pathname.split('/').pop();
            if (!filename || !filename.includes('.')) {
                filename = `image_${i}_${Date.now()}.${blob.type.split('/')[1] || 'png'}`;
            }
            
            // guarda al ./img
            const localPath = `img/${filename}`;
            imageMap.set(localPath, blob);
            
            // actualiza path al local
            img.setAttribute('src', localPath);
            
        } catch (error) {
            console.warn(`Error: ${src}`, error);
        }
    }
    
    // obtener contenido completo de iframe
    const fullHtml = '<!DOCTYPE html>\n' + clonedDoc.documentElement.outerHTML;
    const htmlBlob = new Blob([fullHtml], { type: 'text/html' });
    
    // crear zip
    const zip = new JSZip();
    
    // añadir html al zip
    zip.file(fileName.replace('.zip', '.html'), htmlBlob);
    
    // añadir imagen al zip
    for (const [localPath, blob] of imageMap.entries()) {
        zip.file(localPath, blob);
    }
    
    // descarga ZIP
    const zipBlob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(zipBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// ------------------ inicializacion -------------------
$(document).ready(function(){
      iframeDoc.body.style.padding = "20px 0";
      createNewSortable(iframeDoc.body);
});