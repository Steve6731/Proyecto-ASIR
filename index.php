<!doctype html>
<html lang="us">
<head>
	<meta charset="utf-8">
	<title>Proyect</title>

   <!-- codemirror Corelib -->
   <script src="codeMirror/lib/codemirror.js"></script>
   <!-- JavaScript for codeMirror-->
   <script src="codeMirror/mode/javascript/javascript.js"></script>

   <script src="./js/lib/jquery/jquery.js"></script>
   <script src="./js/lib/sortableJS/Sortable.js"></script>
   
   <link rel="stylesheet" href="codeMirror/lib/codemirror.css">
   <link rel="stylesheet" href="codeMirror/theme/monokai.css">
   <link rel="stylesheet" href="css/main.css">

</head>
<body>

   <iframe id="myIframe" src="about:blank"
   srcdoc="
   <head>
      <style id=templateCSS> * {user-select: none;}</style>
      <meta charset='UTF-8'>
      <title>MyFirstWeb</title>
   </head>
   <body></body>
   ">
   </iframe>

   <div id="editArea">
   <textarea id="myEditor" sytle=" position:fixed; top:100vh;">
   // Esto es solo un ejemplo para probar cómo funciona CodeMirror, 
   // por favor, no le den importancia.

   function greet(name) {
      console.log("Hello, " + name);
   }
   </textarea>
   </div>
   <script>
      var myCodeMirror = CodeMirror.fromTextArea(document.getElementById('myEditor'), {
         lineNumbers: true,
         mode: "javascript",
         theme: "monokai",
         lineWrapping: true
      });
   </script>
   <?php include("inc/leftClickMenu.php")?>
   <?php include("inc/sidebar.php")?>

   <script src="./js/autoLoader.js"></script>
</body>
</html>
