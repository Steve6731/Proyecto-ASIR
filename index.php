<!DOCTYPE html>
<html>
<head>
   <meta charset="utf-8">
   <title>HTML</title>
   <meta name="viewport" content="width = device-width, initial-scale=1.0">
   <link rel="stylesheet" href="style.css">
</head>
<body>
   
   <div id="workArea"> </div>
   
   <div id="leftClickMenu" class="custom-menu">
      <ul>
         <li onclick="leftClickMenuAcction('add')">Add</li>
         <li onclick="leftClickMenuAcction('del')">Delete</li>
         <hr>
         <li onclick="leftClickMenuAcction('conf')">Property</li>
         <hr>
         <li onclick="exportWorkArea()">Exportar</li>
      </ul>
   </div>
   
   <script src="./js/exportaWorkArea.js"></script>
   <script src="./js/accionesDeMenu.js"></script>
   <script src="./js/selectElement.js"></script>
   <script src="./js/leftClickMenu.js"></script>

</body>
</html>