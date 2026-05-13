
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
function buildDOMTree(element,elementRefUL, maxDepth = Infinity, currentDepth = 0) {
   if ( currentSelectElement && element == currentSelectElement.Overlay) return null;
   if (elementRefUL.children.length > 0 && elementRefUL == DOMTreeMainUl){
      elementRefUL.innerHTML = '';
   }
   //if (currentDepth >= maxDepth) return null;
   //if (element.nodeType !== 1) return null;
   //get
   let output = element.tagName;
   if (element.id) output += '#' + element.id;
   if (element.className) output += '.' + element.className.trim().split(/\s+/).join('.');
   let newLi = document.createElement('li');
   let newDiv = document.createElement('div');
   newLi.RefElement = element;
   newDiv.innerHTML = `
      <span class="sortable-handle">⋮⋮</span>
      <span class="nodeTag" style="color:gray;padding:0px 2px;">
         ${element.tagName}
      </span>
         ${output}`;
   newLi.appendChild(newDiv);
   elementRefUL.appendChild(newLi);
   newLi.draggable = true;

   newLi.addEventListener('dragstart', (e) => {
      let realTarget = document.elementFromPoint(e.clientX, e.clientY);
      if (realTarget && realTarget.closest('.sortable-handle')) return null;
      draggedDOMTreeElement = e.currentTarget;
      dragging = true;
      e.stopImmediatePropagation();
      e.stopPropagation();
   });

   newLi.addEventListener('dragover', (e) => {
      if (!dragging) return null;
      e.preventDefault();
      e.stopPropagation();
      e.dataTransfer.dropEffect = 'move';
      if( currentHoverElement != undefined && currentHoverElement.classList.contains('hover'))
         currentHoverElement.classList.remove('hover');
      e.currentTarget.classList.add('hover');
      currentHoverElement = e.currentTarget
   });

   newLi.addEventListener('drop', (e) => {
      if (!dragging) return null;
      e.preventDefault();
      e.stopPropagation();
      e.currentTarget.RefUl.appendChild(draggedDOMTreeElement);
      e.currentTarget.RefElement.appendChild(draggedDOMTreeElement.RefElement);
      
      e.currentTarget.classList.remove('hover');
      createNewUlSortable(e.currentTarget.RefUl);
      if(draggedDOMTreeElement.RefUl  == null && draggedDOMTreeElement.RefUl == undefined)
         createNewUlSortable(draggedDOMTreeElement.RefUl);
      createNewSortable(e.currentTarget.RefElement);
      createNewSortable(draggedDOMTreeElement.RefElement);
      draggedDOMTreeElement = null;
      currentHoverElement = null;
      buildDOMTree(iframeDoc.body,DOMTreeMainUl);
      dragging = false;
   });
   
   newLi.addEventListener('dragend', (e) => {
      if (draggedDOMTreeElement) draggedDOMTreeElement = null;
      dragging = false;
      if (currentHoverElement != null && currentHoverElement != undefined)
         currentHoverElement.classList.remove('hover');
      currentHoverElement = null;
      e.dataTransfer.dropEffect = 'none';
      e.stopPropagation();
   });
   
   let childUl = document.createElement('ul');
   newLi.RefUl = childUl;
   newLi.appendChild(childUl);

   if (element.children.length != 0){
      Array.from(element.children).forEach(child => {
         buildDOMTree(child,childUl, maxDepth, currentDepth + 1);
      });
      createNewUlSortable(childUl);
   }
}
