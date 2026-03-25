// ------------------------ sidebar -----------------------------
(function() {
   const sidebar = document.getElementById('sidebar');
   const toggleBtn = document.getElementById('toggleSidebarBtn');

   function isSidebarHidden() {
      return sidebar.classList.contains('hidden');
   }

   function showSidebar() {
      sidebar.classList.remove('hidden');
   }

   function hideSidebar() {
      sidebar.classList.add('hidden');
   }

   function toggleSidebar() {
      if (isSidebarHidden()) {
            showSidebar();
      } else {
            hideSidebar();
      }
   }

   toggleBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleSidebar();
   });

})();