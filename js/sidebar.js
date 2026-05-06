
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
   if (currentSelectElement){
      if ( currentSelectElement && element == currentSelectElement.Overlay) return null;
   }
   //if (currentDepth >= maxDepth) return null;
   if (element.nodeType !== 1) return null;
   //get
   let output = element.tagName;
   if (element.id) output += '#' + element.id;
   if (element.className) output += '.' + element.className.trim().split(/\s+/).join('.');
   let newLi = document.createElement('li');
   let newDiv = document.createElement('div');
   newDiv.RefElement = element;
   newDiv.innerHTML = `
      <span class="sortable-handle">⋮⋮</span>
      <span class="nodeTag" style="color:gray;padding:0px 2px;">
         ${element.tagName}
      </span>
         ${output}`;
   newLi.appendChild(newDiv);
   elementRefUL.appendChild(newLi);
   
   if (element.children){
      let childUl = document.createElement('ul');
      Array.from(element.children).forEach(child => {
         buildDOMTree(child,childUl, maxDepth, currentDepth + 1);
      });
      newLi.appendChild(childUl);
   }
}


/*
   Sortable.create(childUl,{
      handle: '.sortable-handle',
		animation: 150,
		fallbackOnBody: true,
   })
      
   
   Sortable.create(DOMTreeMainUl,{
      handle: '.sortable-handle',
		animation: 150,
		fallbackOnBody: true,
   })*/