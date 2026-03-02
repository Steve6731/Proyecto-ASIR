function handleMenuClick(mode){
   switch(mode){
      case 'add':
         const element = document.createElement('div');
         element.textContent = "hellow word";

         element.addEventListener('click', function(event) {
               event.stopPropagation();
               selectElement(this);
         });

         workArea.appendChild(element);
         break;
      case 'del':
         if (selectedElement) {
                selectedElement.remove();
                selectedElement = null;
            } else {
                alert('your need select a element first');
            }
         break;
      case 'property':
         null;
         break;
      default:
         console.log(`Mode "${mode}" is not supported for handMenuClick()`);
         break;
   }
   menu.style.display = 'none';
}

function selectElement(element) {
   if (selectedElement) {
      selectedElement.style.border = 'none';
      selectedElement.setAttribute('data-selected', 'false');
   }
    
   selectedElement = element;
   selectedElement.style.border = '2px solid #0084ff'; 
   selectedElement.setAttribute('data-selected', 'true');
}

document.addEventListener('click', function(event) {
   event.stopPropagation();
   selectedElement.style.border = 'none';
   selectedElement.setAttribute('data-selected', 'false');
   selectedElement = null;
});