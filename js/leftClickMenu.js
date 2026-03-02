const workArea = document.getElementById("workArea");
const menu = document.getElementById("leftClickMenu");

workArea.addEventListener('contextmenu',function(event){
   event.preventDefault();

   const x = event.clientX;
   const y = event.clientY;

   menu.style.display = 'block';
   menu.style.position = "fixed";
   menu.style.left = x + 'px';
   menu.style.top = y + 'px';

})

document.addEventListener('click', function() {
   menu.style.display = 'none';
});

menu.addEventListener('click', function(event) {
   event.stopPropagation(); // limita evento dentro de elemento "menu"
});