
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
}

function sidebarChangeTabRight(elementId){
   currentTabRight.classList.add('hidden');
   currentTabRight = document.getElementById(elementId);
   currentTabRight.classList.remove('hidden');
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
   let newLi = document.createElement('li');
   let newDiv = document.createElement('div');
   let PositionSign = "?";
   if (element == iframeDoc.body){
      PositionSign = "root";
   }else{
      let position = window.getComputedStyle(element).position;
      switch (position){
         case "static":   PositionSign = "STA";break;
         case "relative": PositionSign = "REL";break;
         case "absolute": PositionSign = "ABS";break;
         case "fixed":    PositionSign = "FIX";break;
         case "sticky":   PositionSign = "STI";break;
      }
   }

   let output = element.tagName;
   if (element.id) output += '#' + element.id;
   if (element.className) output += '.' + element.className.trim().split(/\s+/).join('.');

   newLi.RefElement = element;
   newDiv.RefElement = element;
   newDiv.innerHTML = `
      <span class="sortable-handle">⋮⋮</span>
      <span class="nodeTag" style="color:gray;padding:0px 2px;">
         ${PositionSign}
      </span>
         ${output}`;
   newLi.appendChild(newDiv);
   elementRefUL.appendChild(newLi);
   newLi.draggable = true;

   newDiv.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      setFocus(e.target.RefElement)
   });

   newLiAddEventListener(newLi);
   
   let childUl = document.createElement('ul');
   childUl.RefElement = element;
   newLi.RefUl = childUl;
   newLi.appendChild(childUl);

   if (element.children.length != 0){
      Array.from(element.children).forEach(child => {
         buildDOMTree(child,childUl, maxDepth, currentDepth + 1);
      });
      createNewUlSortable(childUl);
   }
}

function newLiAddEventListener(newLi){
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
      setFocus(draggedDOMTreeElement.RefElement);
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
   
   newLi.addEventListener('dragstart', (e) => {
      let realTarget = document.elementFromPoint(e.clientX, e.clientY);
      if (realTarget && realTarget.closest('.sortable-handle')) return null;
      e.stopImmediatePropagation();
      e.stopPropagation();
      draggedDOMTreeElement = e.currentTarget;
      dragging = true;
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
}

//------------------ inicializacion -------------------
const $StyleForm = $("#StyleForm");

function HiddenStyleForm(){
   $StyleForm.hide();
}

function ShowStyleForm(){
   $StyleForm.show();
}

$StyleForm.on('input change', function(e) {
   let inputName = e.target.name;
   let inputValue = $(e.target).val();
   if (currentSelectElement){
      switch (inputName){
         case "backgroundColor": currentSelectElement.style.backgroundColor = inputValue;
            break;
         case "color": currentSelectElement.style.color = inputValue;
            break;
      }
   }
});
