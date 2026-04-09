<!doctype html>
<html lang="us">
<head>
	<meta charset="utf-8">
	<title>Proyect</title>

   <!-- codemirror Corelib -->
   <script src="codeMirror/lib/codemirror.js"></script>
   <!-- JavaScript -->
   <script src="codeMirror/mode/javascript/javascript.js"></script>

   <script src="./js/lib/jquery/jquery.js"></script>
   <script src="./js/lib/jqueryUI/jquery-ui.js"></script>
   <script src="./js/lib/jqueryUI/jquery-ui.min.js"></script>

   <link rel="stylesheet" href="codeMirror/lib/codemirror.css">
   <link rel="stylesheet" href="codeMirror/theme/monokai.css">

   <?php
      $css_dir = 'css/';
      $css_files = glob($css_dir . '*.css');

      foreach($css_files as $css) {
         echo '<link rel="stylesheet" href="' . $css . '">' . "\n";
      }
   ?>

</head>
<body>

   <iframe id="myIframe" src="about:blank"
   srcdoc=" <style id=templateCSS> * {user-select: none;}</style> ">
   </iframe>

   <?php //include("inc/jqueryUIsample.php")?>
   <?php include("inc/leftClickMenu.php")?>
   <?php include("inc/sidebar.php")?>
   <div id="editArea">
   <textarea id="myEditor" sytle=" position:fixed; top:100vh;">
   // escribir algo
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

   <script src="./js/autoLoader.js"></script>
</body>
</html>
