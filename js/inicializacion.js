
// ------------------ inicializacion -------------------

// !important!
window.addEventListener('load', () => {
   iframeDoc = document.getElementById('myIframe').contentWindow.document;
 });
 
// For main.js & DOMTree of sidebar.js
$( iframeDoc ).ready( function() {
   createNewSortable(iframeDoc.body);
   buildDOMTree(iframeDoc.body,DOMTreeMainUl);
   iframeDoc.addEventListener("click",() => {
   });
})

createNewUlSortable(DOMTreeMainUl);

// For StyleForm of sidebar.js
 HiddenStyleForm();