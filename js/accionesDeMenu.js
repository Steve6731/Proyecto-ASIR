// ------------------------ ACCTIONES DE MENU -----------------------------
function leftClickMenuAcction(mode){
   switch(mode){
      case 'add':
         addElement();
         break;
      case 'del':
         delElement();
         break;
      case 'conf':
         confElement();
         break;
      default:
         console.log(`Mode "${mode}" is not supported for handMenuClick()`);
         break;
   }
   menu.style.display = 'none';
}

function addElement() {
   const element = document.createElement('div');
   element.textContent = "hello world";

   element.addEventListener('click', function(event) {
         event.stopPropagation();
         selectElement(this);
   });

   workArea.appendChild(element);
}

function delElement(){
   if (selectedElement) {
            selectedElement.remove();
            selectedElement = null;
      } else {
            alert('your need select a element first');
      }
}

function confElement(){
   null;
}

