// ---------------------------- MUESTRA MENU -------------------------------
const workArea = document.getElementById("workArea");
const menu = document.getElementById("leftClickMenu");

workArea.addEventListener('contextmenu',function(e){
   e.preventDefault();

   menu.style.display = 'block';
   menu.style.position = "fixed";
   menu.style.left = e.clientX + 'px';
   menu.style.top = e.clientY + 'px';

})

document.addEventListener('click', function(){menu.style.display = 'none';});
menu.addEventListener('click', function(e){e.stopPropagation()});