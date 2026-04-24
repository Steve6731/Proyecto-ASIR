let dragSourceNode = null;
const iframe = document.getElementById('myIframe');
const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
let iframeBody = $("#myIframe body")

//-----------------------addElement------------------------------------
function addDiv(text){
   newDiv = iframeDoc.createElement('div');
   newDiv.class = "element"; 
   newDiv.innerHTML = "<p>"+text+"</p>";
   iframeDoc.body.appendChild(newDiv);
   
   newDiv.draggable="true"
   newDiv.addEventListener('dragstart', handleDragStart); //用于拖拽该元素
   newDiv.addEventListener('dragover', handleDragOver); //当处于该元素上方时触发 用于高亮元素
   newDiv.addEventListener('drop', handleDrop); //用于放置拖拽元素到该元素
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