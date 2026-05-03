let dragSourceNode = null;
const iframe = document.getElementById('myIframe');
const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
let iframeBody = $("#myIframe body");
let currentSelectElement;
//-----------------------Current Selected Element----------------------

function setAllElementFocusable(){
   let focusableElements = iframeDoc.body.querySelectorAll('*');
   focusableElements.forEach(elem => {
      console.log(elem);
      setFocusable(elem);
   });
   
   console.log("do setFocous");
}

function setFocusable(element){
   element.addEventListener('click', () => {
      if(currentSelectElement){
         currentSelectElement.style.transform = '';
         if (currentSelectElement.Overlay){
            currentSelectElement.removeChild(currentSelectElement.Overlay);
            delete currentSelectElement.Overlay;
         }
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
         parentElement.appendChild(Overlay);
      }

      let border = "1px solid blue"

      OverLayerPadding = document.createElement('div');
      element.Overlay = OverLayerPadding;
      let paddingHight = currentSelectElement.offsetHeight;
      let paddingWidth = currentSelectElement.offsetWidth;
      addOverLayer(element,OverLayerPadding,paddingHight,paddingWidth,0,0,border);
      
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
      
   });
}

//-----------------------addElement------------------------------------
function addDiv(text){
   newDiv = iframeDoc.createElement('div');
   newDiv.class = "element"; 
   newDiv.innerHTML = "<p>"+text+"</p>";
   iframeDoc.body.appendChild(newDiv);
   newDiv.style.margin = "6px";
   newDiv.style.padding = "6px";
   
   newDiv.draggable="true";
   newDiv.addEventListener('dragstart', handleDragStart); //用于拖拽该元素
   newDiv.addEventListener('dragover', handleDragOver); //当处于该元素上方时触发 用于高亮元素
   newDiv.addEventListener('drop', handleDrop); //用于放置拖拽元素到该元素
//   console.log("do addDiv");
   setFocusable(newDiv);
   buildDOMTree();
}

//----------------------- Drag Element action ----------------------------

function handleDragStart(event) {
   event.dataTransfer.setData('text/plain', '');
   event.dataTransfer.effectAllowed = 'move';
   dragSourceNode = event.currentTarget;
   event.stopPropagation();
}
function handleDragOver(event) {
   event.preventDefault();
   event.dataTransfer.dropEffect = 'move';
}

function handleDrop(event) {
   const targetContent = event.currentTarget;
   targetContent.insertAdjacentElement('afterend', dragSourceNode);
}

function handleDropLi(event) {
   const targetContent = event.currentTarget;
   const refTargetContent = targetContent.refElement;
   const refDragSourceNode = dragSourceNode.refElement;
   targetContent.insertAdjacentElement('afterend', dragSourceNode);
   refTargetContent.insertAdjacentElement('afterend', refDragSourceNode);
}
//-----------------------leftClickMenu------------------------------------
const menu = document.getElementById("leftClickMenu");

iframeDoc.addEventListener('contextmenu',function(e){
   e.preventDefault();

   menu.style.display = 'block';
   menu.style.position = "fixed";
   menu.style.left = e.clientX + 'px';
   menu.style.top = e.clientY + 'px';
})

iframeDoc.addEventListener('click', function(){menu.style.display = 'none';});
menu.addEventListener('click', function(e){e.stopPropagation()});

//-------------------------exportIframe-----------------------------------
function exportIframeContent(iframeElement, fileName = 'index.html') {
  const doc = iframeElement.contentDocument || iframeElement.contentWindow.document;
  
  const fullHtml = '<!DOCTYPE html>\n' + doc.documentElement.outerHTML;
  
  const blob = new Blob([fullHtml], { type: 'text/html' });
  
  const url = URL.createObjectURL(blob);
  
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
      buildDOMTree();
});