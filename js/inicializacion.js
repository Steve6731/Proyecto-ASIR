
// ------------------ inicializacion -------------------
$( iframeDoc ).ready( function() {
   createNewSortable(iframeDoc.body);
   buildDOMTree(iframeDoc.body,DOMTreeMainUl);
   iframeDoc.addEventListener("click",() => {
      setFocus();
   });
})

createNewUlSortable(DOMTreeMainUl);

window.addEventListener('load', () => {
   iframeDoc = document.getElementById('myIframe').contentWindow.document;
 });