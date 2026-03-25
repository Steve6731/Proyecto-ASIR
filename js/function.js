// ------------------------ ACCTIONES DE MENU -----------------------------


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

