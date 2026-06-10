let currentTop = 0; let currentLeft = 0;
let iframeView = document.getElementById("iframeView");
let moveIframe = false;
let iframeViewDragging = false;

function moveIframeToggle(element){
   moveIframe = !moveIframe;
   if (moveIframe){
      iframe.style.pointerEvents= "none";
      element.style.border = "1px solid blue"
   }else{
      iframe.style.pointerEvents= "auto";
      element.style.border = ""
   }
}

document.getElementById('IframeScaleController').addEventListener('change', function(e) {
   setIframeScale(e.target.value)
});

function setIframeScale(Scale){
   IframeScale = Scale;
   $iframe.css({
      "transform": `scale(${Scale})`,
      "top":`calc(-100% * ( 1 - ${Scale} ) )`,
      "left":`calc(-100% * ( 1 - ${Scale} ) )`,
   });   
}

iframeView.addEventListener('pointerdown', function (e) {
   //Si haces clic con el boton izquierdo del raton
   if (e.button === 0 && moveIframe) {
      console.log("do pointer down")
      iframeViewDragging = true;
      let matrix = iframe.style.translate.split(' ');;
      currentTop = parseFloat(matrix[1]) || 0;
      currentLeft = parseFloat(matrix[0]) || 0;
      iframeView.mouseLastY = e.clientY;
      iframeView.mouseLastX = e.clientX;
      iframeView.mouseStartY = currentTop;
      iframeView.mouseStartX = currentLeft;
      e.stopPropagation();
   }
});

document.addEventListener('pointermove', function (e) {
   if (iframeViewDragging && moveIframe) {
      // calcula cuanto moueve el raton y obtener nuevo posicion del scroll
      let mouseMoveLengthY = e.clientY - iframeView.mouseLastY;
      let mouseMoveLengthX = e.clientX - iframeView.mouseLastX;
      iframeView.mouseLastY = e.clientY;
      iframeView.mouseLastX = e.clientX;
      currentTop = currentTop + mouseMoveLengthY;
      currentLeft = currentLeft + mouseMoveLengthX;

      iframe.style.translate = `${currentLeft}px ${currentTop}px`;
   }
});

document.addEventListener('pointerup', function (e) {
   if (iframeViewDragging) {
      e.stopPropagation();
      iframeViewDragging = false;
   }
});
