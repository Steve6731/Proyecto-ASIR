let dragSourceNode = null;
let IframeScale = 0.5;
const iframe = document.getElementById('myIframe');
let iframeDoc = document.getElementById('myIframe').contentWindow.document;
let $iframe = $(iframe);
let iframeBody = $("#myIframe body");
let DOMTreeMainUl=document.getElementById("bodyDOMTreeList");
DOMTreeMainUl.refElement=iframeDoc;
var currentSelectElement;
var draggedDOMTreeElement; var currentHoverElement;
let fileInput = document.getElementById("fileInput");
const $interfaceOverlay = $("#interfaceOverlay");

//-----------------------Current Selected Element----------------------

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
         iframeDoc.body.removeChild(currentSelectElement.Overlay);
         iframeView.removeChild(currentSelectElement.dragHandleIcon);
         delete currentSelectElement.dragHandleIcon;
         delete currentSelectElement.Overlay;
      }
   }

   if (element === null || element === undefined){
      currentSelectElement = null;
      HiddenStyleForm();
      return 0;
   }
   currentSelectElement = element;
   ShowStyleForm();
   let elementRect = element.getBoundingClientRect();
   let elementStyle = window.getComputedStyle(element);
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
   let paddingHight = currentSelectElement.offsetHeight|| 0;
   let paddingWidth = currentSelectElement.offsetWidth|| 0;
   let paddingY = elementRect.top  + iframe.contentWindow.scrollY|| 0;
   let paddingX = elementRect.left + iframe.contentWindow.scrollX|| 0;
   
   addOverLayer(iframeDoc.body,OverLayerPadding,paddingHight,paddingWidth,paddingY,paddingX,border);
   
   if (showOverlay){
      $(OverLayerPadding).show();
   }else{
      $(OverLayerPadding).hide();
   }
   OverLayerMargin = document.createElement('div');
   let marginTop = parseFloat(elementStyle.marginTop) || 0;
   let marginLeft = parseFloat(elementStyle.marginLeft)|| 0;
   let marginBottom = parseFloat(elementStyle.marginBottom)|| 0;
   let marginRight = parseFloat(elementStyle.marginRight)|| 0;
   let marginHight = paddingHight + marginTop + marginBottom|| 0;
   let marginWidth = paddingWidth + marginLeft + marginRight|| 0;
   addOverLayer(OverLayerPadding,OverLayerMargin,marginHight,marginWidth,-marginTop,-marginLeft,border);

   OverLayerContent = document.createElement('div');
   let paddingTop = parseFloat(elementStyle.paddingTop)|| 0;
   let paddingLeft = parseFloat(elementStyle.paddingLeft)|| 0;
   let paddingBottom = parseFloat(elementStyle.paddingBottom)|| 0;
   let paddingRight = parseFloat(elementStyle.paddingRight)|| 0;
   let contentHight = paddingHight - paddingTop - paddingBottom|| 0;
   let contentWidth = paddingWidth - paddingLeft - paddingRight|| 0;
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
      e.stopImmediatePropagation();
      e.stopPropagation();
      draggedElement = e.currentTarget.refElement;
      draggingElement = true;
   });

   dragHandleIcon.addEventListener('dragend', (e) => {
      e.stopImmediatePropagation();
      e.stopPropagation();
      if (!draggingElement) return;
      let elementsUnderCursor = document.elementsFromPoint(e.clientX, e.clientY);
      elementsUnderCursor.forEach(element => {
         if (element == iframeView) {
            try {
               iframeDoc.body.appendChild(draggedElement);
               setFocus(draggedElement);
               buildDOMTree(iframeDoc.body,DOMTreeMainUl);
               draggedElement = null;
               draggingElement = false;
               return;
            } catch (error) {
               console.error('Error: ', error);
            }
         }
      });
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
    setFocus(dragNode);
}

function getElementIndex(element){
   Array.from(element.parentNode.childNodes).indexOf(element);
}


//-----------------------Element Manager--------------------------

var draggedElement;
let draggingElement;

function addElement(tagName,text){
   let newElement = iframeDoc.createElement(tagName);
   if (text){
      newElement.innerHTML = text;
   }

   if (currentSelectElement){
      currentSelectElement.appendChild(newElement);
      setFocus(currentSelectElement);
   }else{
      iframeDoc.body.appendChild(newElement);
   }
   createNewSortable(newElement);
   
   setFocusable(newElement);

   if (tagName == "img"){
      newElement.src = "./img/1.png";
      newElement.addEventListener('dblclick', function(e) {
            showImageContainer();
      });
   }
   

   newElement.addEventListener('dragover', (e) => {
      if (!draggingElement) return null;
      e.dataTransfer.dropEffect = 'move';
      e.preventDefault();
      e.stopPropagation();
   });

   newElement.addEventListener('drop', (e) => {
      if (!draggingElement) return null;
      e.currentTarget.appendChild(draggedElement);
      setFocus(draggedElement)
      createNewSortable(e.currentTarget);
      createNewSortable(draggedElement);
      draggedElement = null;
      draggingElement = false;
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
      setFocus();
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
   menu.style.top  = e.clientY*IframeScale+iframeRect.top  + 'px';
})

document.addEventListener('contextmenu',function(e){
   e.preventDefault();
   menu.style.display = 'block';
   menu.style.position = "fixed";
   menu.style.left = e.clientX + 'px';
   menu.style.top = e.clientY  + 'px';
})
document.addEventListener('click', function(){menu.style.display = 'none';});
iframeDoc.addEventListener('click', function(){menu.style.display = 'none';});
menu.addEventListener('click', function(e){e.stopPropagation()});

//-------------------------exportIframe-----------------------------------
async function exportIframeContent(iframeElement, zipName = 'Web.zip') {
    setFocus(); // remove overlay
    
    // get iframe 
    const doc = iframeElement.contentDocument || iframeElement.contentWindow.document;
    const fullHtml = '<!DOCTYPE html>\n' + doc.documentElement.outerHTML;
    const zip = new JSZip();
    
    // add index.html
    zip.file('index.html', fullHtml);
    
    try {
      let imagesFiles = await phpLs("./img/")
      let paths = imagesFiles.paths;
      // Base64 to Uint8Array 
      function base64ToUint8Array(base64) {
         const binaryString = atob(base64);
         const bytes = new Uint8Array(binaryString.length);
         for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
         }
         return bytes;
      }
      paths.forEach(path => {
         try {
            const result = phpDownload(path);
            let zipFolderPath = "";
            if (result.success) {
               const binaryContent = base64ToUint8Array(result.content);
               const zipPath = zipFolderPath ? `${zipFolderPath}/${result.fileName}` : result.fileName;
               zip.file(zipPath, binaryContent);
               return { success: true, fileName: result.fileName };
            } else {
               console.error(`Error[Download]: ${path}`, result.message);
               return { success: false, fileName: path, error: result.message };
            }
         } catch (error) {
            console.error(`Error[Process]: ${path}`, error);
            return { success: false, fileName: path, error: error.message };
         }
      });
   } catch (error) {
      console.warn('Failed to list img folder contents:', error);
   }
            
   // downlaod zip 
   const content = await zip.generateAsync({ type: 'blob' });
   const url = URL.createObjectURL(content);
   const link = document.createElement('a');
   link.href = url;
   link.download = zipName;
   document.body.appendChild(link);
   link.click();
   document.body.removeChild(link);
   URL.revokeObjectURL(url);
}
