
// ------------------ inicializacion -------------------
$( iframeDoc ).ready( function() {
   console.log(iframeDoc.body)
   createNewSortable(iframeDoc.body);
   buildDOMTree(iframeDoc.body,DOMTreeMainUl);
})

createNewUlSortable(DOMTreeMainUl);

window.addEventListener('load', () => {
   iframeDoc = document.getElementById('myIframe').contentWindow.document;
 });