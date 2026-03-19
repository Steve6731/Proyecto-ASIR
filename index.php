<!DOCTYPE html>
<html>
<head>
   <meta charset="utf-8">
   <title>HTML</title>
   <meta name="viewport" content="width = device-width, initial-scale=1.0">
   <link rel="stylesheet" href="main.css">
   <link rel="stylesheet" href="sidebarStyle.css">
</head>
<body>

   <div id="workArea">
   </div>
   
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

   <aside class="sidebar" id="sidebar">
         <button class="menu-toggle" id="toggleSidebarBtn"> ☰ </button>
         <div class="sidebar-header">
            <h2>📁 Menu</h2>
         </div>
         <nav class="nav-menu">
            <div class="nav-item" onclick="leftClickMenuAcction('add')"><i>📄</i> text</div>
         </nav>
         <div class="sidebar-footer">
            <div>Espero que disfrutes diseñando la página web y que el resultado sea perfecto.</div>
    </aside>
   
   <script src="./js/sidebar.js"></script>
   <script src="./js/exportaWorkArea.js"></script>
   <script src="./js/accionesDeMenu.js"></script>
   <script src="./js/selectElement.js"></script>
   <script src="./js/leftClickMenu.js"></script>

</body>
</html>