
//---------------------------sidebar----------------------------------------
let currentTabLeft = document.getElementById('tabElement');
let currentTabRight = document.getElementById('elementConfig');

function toggleSidebar(parent) {
   if (parent.classList.contains('hidden')) {
      parent.classList.remove('hidden');
   } else {
      parent.classList.add('hidden');
   }
   //console.log("sidebar change mode");
}

document.getElementById('toggleSidebarBtnRight').addEventListener('click', function(e) {
   e.stopPropagation();
   toggleSidebar(this.parentElement);
});
document.getElementById('toggleSidebarBtnLeft').addEventListener('click', function(e) {
   e.stopPropagation();
   toggleSidebar(this.parentElement);
});

function sidebarChangeTabLeft(elementId){
   currentTabLeft.classList.add('hidden');
   currentTabLeft = document.getElementById(elementId);
   currentTabLeft.classList.remove('hidden');
   console.log("do tab change");
}

function sidebarChangeTabRight(elementId){
   currentTabRight.classList.add('hidden');
   currentTabRight = document.getElementById(elementId);
   currentTabRight.classList.remove('hidden');
   console.log("do tab change");
}

//------------------------DOMTree---------------------------------------
function getDOMTree(element, maxDepth = Infinity, currentDepth = 0) {

   //if (currentDepth >= maxDepth) return null;
   //if (element.nodeType !== 1) return null;
   
   //get
   let $element = $(element);
   let obj_DOMTreeNodes = {
      tag: element.tagName,
      id: element.id || null,
      class: element.className || null,
      depth: currentDepth,
      refElement: element,
      children: []
   };
   
   //execute
   $element.children().each(function() {
      var childNode = getDOMTree(this, maxDepth, currentDepth + 1);
      if (childNode) {
         obj_DOMTreeNodes.children.push(childNode);
      }
   });
   
   return obj_DOMTreeNodes;
}

function buildDOMTree() {
   const DOMTreeContent=getElementById("body-DOM-Tree-list");
   let obj_DOMTreeNodes = getDOMTree(iframeDoc.body);

   buildDOMTreeLi(mainLi,obj_DOMTreeNodes, deep = 0)
}

function buildDOMTreeLi(mainLi,obj_DOMTreeNodes, deep = 0) {
   if (!obj_DOMTreeNodes) return;
   
   //let indentStr = '  '.repeat(indent);
   let output = obj_DOMTreeNodes.tag;
   
   if (obj_DOMTreeNodes.id) output += '#' + obj_DOMTreeNodes.id;
   if (obj_DOMTreeNodes.class) output += '.' + obj_DOMTreeNodes.className.trim().split(/\s+/).join('.');
   
   let nodeElement = document.createElement(div);
   nodeElement.refElement = obj_DOMTreeNodes.refElement;
   nodeElement.addEventListener('dragstart', handleDragStart); //用于拖拽该元素
   nodeElement.addEventListener('dragover', handleDragOver); //当处于该元素上方时触发 用于高亮元素
   nodeElement.addEventListener('drop', handleDropLi); //用于放置拖拽元素到该元素

   nodeElement.innerHTML = `<span class="nodeTag">${obj_DOMTreeNodes.tag}</span>${output}`;
   mainLi.appendChild(nodeElement);

   if (obj_DOMTreeNodes.children.length){
   childrenUl = document.createElement(ul);

   for (let child of obj_DOMTreeNodes.children) {
      childLi = document.createElement(li);
      childUl.appendChild(childLi);
      buildDOMTreeLi(childLi,child, deep + 1);
   }
   
   mainLi.appendChild(childrenUl);
   }
}