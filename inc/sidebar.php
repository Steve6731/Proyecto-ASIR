<div class="sidebar Left" id="sidebarLeft">
   <button class="menu-toggle Left" id="toggleSidebarBtnLeft"> ☰ </button>
   <!-- -->
   <div class="tabs Left">
      <div><button onclick="sidebarChangeTabLeft('tabElement')">Element</button></div>
      <div><button onclick="sidebarChangeTabLeft('tabDOMTree')">DOM Tree</button></div>
      <div><button onclick="sidebarChangeTabLeft('tabPaginas')">Paginas</button></div>
   </div>
   <!-- -->
   <div id="tabElement" class="tab Left">
      <nav class="nav-menu">
         <div class="nav-item" onclick="addDiv('hello world')"><i>📄</i> hello world</div>
         <div class="nav-item" onclick="addDiv('The quick brown fox jumps over the lazy dog')"><i>📄</i> fox&dog</div>
         <div class="nav-item" onclick=""><i>🖼️</i> image</div>
      </nav>
      <div class="sidebar-footer">
         <div>Espero que disfrutes diseñando la página web y que el resultado sea perfecto.</div>
      </div>
   </div>
    <!-- -->
   <div id="tabDOMTree" class="tab Left hidden">
      <div>Body</div>
      <ul id="body-DOM-Tree-list" class="DOM-Tree-list">

      </ul>
   </div>
   <!-- -->
   <div id="tabPaginas"  class="tab Left hidden">
      <nav class="nav-menu">
         <div class="nav-item" > por ahora no hay nada</div>
         <div class="nav-item" > por ahora no hay nada</div>
         <div class="nav-item" > por ahora no hay nada</div>
      </nav>
   </div>
   <!-- -->
</div>

<div class="sidebar Right" id="sidebarRight">
   <button class="menu-toggle Right" id="toggleSidebarBtnRight"> ☰ </button>
   <!-- -->
   <div class="tabs Right">
      <div><button onclick="sidebarChangeTabRight('elementConfig')">Element</button></div>
      <div><button onclick="sidebarChangeTabRight('webConfig')">DOM Tree</button></div>
   </div>
   <!-- -->
   <div id="elementConfig" class="tab Right ">
      <nav class="nav-menu">
         <div>(Pendiente)</div>
         <div>(Pendiente)</div>
         <div>(Pendiente)</div>
      </nav>
   </div>
    <!-- -->
   <div id="webConfig" class="tab Right hidden">
      <nav class="nav-menu">
         <div>(vacio)</div>
         <div>(vacio)</div>
         <div>(vacio)</div>
      </nav>
   </div>
   <!-- -->
   <!-- -->
</div>

