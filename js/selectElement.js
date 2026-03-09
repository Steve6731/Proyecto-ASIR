// ---------------------------- SELECT ELEMENT -------------------------------
let selectedElement = null;

function selectElement(element) {
   if (selectedElement) {
      selectedElement.style.border = 'none';
      selectedElement.setAttribute('data-selected', 'false');
   }
    
   selectedElement = element;
   selectedElement.style.border = '2px solid #0084ff'; 
   selectedElement.setAttribute('data-selected', 'true');
}

if (selectedElement != null){
   document.addEventListener('click', function(event) {
      event.stopPropagation();
      selectedElement.style.border = 'none';
      selectedElement.setAttribute('data-selected', 'false');
      selectedElement = null;
   });
}