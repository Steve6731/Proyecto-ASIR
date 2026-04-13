let dragSourceNode = null;
const iframe = document.getElementById('myIframe');
const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
let DOMTree = $("#myIframe body")
//let $iframeBody = $(iframeDoc.body);
//------------------------DOMTree---------------------------------------
function buildDOMTree(element, maxDepth = Infinity, currentDepth = 0) {

    if (currentDepth >= maxDepth) return null;
    if (element.nodeType !== 1) return null;
    
    //get
    let $element = $(element);
    let treeNode = {
        tag: element.tagName.toLowerCase(),
        id: element.id || null,
        class: element.className || null,
        depth: currentDepth,
        DOMelement: element,
        children: []
    };
    
    //execute
    $element.children().each(function() {
        var childNode = buildDOMTree(this, maxDepth, currentDepth + 1);
        if (childNode) {
            treeNode.children.push(childNode);
        }
    });
    
    return treeNode;
}

function showDOMTree(node, indent = 0) {
    if (!node) return;
    
    let indentStr = '  '.repeat(indent);
    let output = indentStr + node.tag;
    
    if (node.id) output += '#' + node.id;
    if (node.class) output += '.' + node.class;
    
    console.log(output);
    
    // 递归处理子节点，增加缩进
    for (let child of node.children) {
        showDOMTree(child, indent + 1);
    }
}
//-----------------------addElement------------------------------------
function addDiv(text){
   newDiv = iframeDoc.createElement('div');
   newDiv.class = "element"; 
   newDiv.innerHTML = "<p>"+text+"</p>";
   iframeDoc.body.appendChild(newDiv);
   addStaticElementDraggable(newDiv);
   // move element
   DOMTree = buildDOMTree(iframeDoc.body);
   console.log(DOMTree);
   showDOMTree(DOMTree);
}

function addStaticElementDraggable(element){
   element.draggable="true"
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
   
   element.addEventListener('dragstart', handleDragStart); //用于拖拽该元素
   element.addEventListener('dragover', handleDragOver); //当处于该元素上方时触发 用于高亮元素
   element.addEventListener('drop', handleDrop); //用于放置拖拽元素到该元素

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

//---------------------------sidebar----------------------------------------

const sidebar = document.getElementById('sidebar');
const toggleBtn = document.getElementById('toggleSidebarBtn');

function toggleSidebar() {
   if (sidebar.classList.contains('hidden')) {
         sidebar.classList.remove('hidden');
   } else {
         sidebar.classList.add('hidden');
   }
   console.log("sidebar change mode");
}

toggleBtn.addEventListener('click', function(e) {
   e.stopPropagation();
   toggleSidebar();
});

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