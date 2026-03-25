// ------------------------ ACCTIONES DE MENU -----------------------------


function addElement(type,context) {
   const newElementArea = document.createElement('div');
   let newElement = "";
   switch(type){
      case 'p': newElement = document.createElement('p'); newElement.textContent = context; break;
      case 'img': newElement = document.createElement('img'); newElement.src = context; break;
   }
   newElementArea.appendChild(newElement);

   newElementArea.addEventListener('click', function(event) {
         event.stopPropagation();
         selectElement(this);
   });

   newElementArea.style.display = "flex";
   newElementArea.style.justifyContent = "center";

   workArea.appendChild(newElementArea);
   
   newElementArea.addEventListener('dragstart', handleDragStart); //用于拖拽该元素
   newElementArea.addEventListener('dragover', handleDragOver); //当处于该元素上方时触发 用于高亮元素
   newElementArea.addEventListener('drop', handleDrop); //用于放置拖拽元素到该元素
}

let dragSourceNode = null;

// move element
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


function delElement(){
   if (selectedElement) {
            selectedElement.remove();
            selectedElement = null;
      } else {
            alert('your need select a element first');
      }
   menu.style.display = "hidden";
}

function confElement(){
   null;
}

