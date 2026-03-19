
    (function() {
        // 获取元素
        const sidebar = document.getElementById('sidebar');
        const toggleBtn = document.getElementById('toggleSidebarBtn');

        // 辅助函数：判断侧边栏是否具有 hidden 类 (即当前隐藏状态)
        function isSidebarHidden() {
            return sidebar.classList.contains('hidden');
        }

        // 显示侧边栏 (移除 hidden 类)
        function showSidebar() {
            sidebar.classList.remove('hidden');
        }

        // 隐藏侧边栏 (添加 hidden 类)
        function hideSidebar() {
            sidebar.classList.add('hidden');
        }

        // 切换侧边栏显示/隐藏
        function toggleSidebar() {
            if (isSidebarHidden()) {
                showSidebar();
            } else {
                hideSidebar();
            }
        }

        // 给切换按钮绑定点击 (☰ 按钮)
        toggleBtn.addEventListener('click', function(e) {
            e.stopPropagation();  // 防止冒泡（如果有其他逻辑）
            toggleSidebar();
        });

        // 监听窗口变化，当跨越700px断点时，自动调整合适的侧边栏状态（显示/隐藏）
        // 避免在小屏旋转或改变窗口大小时侧边栏意外遮挡
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                const isMobile = window.matchMedia('(max-width: 700px)').matches;
                /*
                  仅在明确需要调整状态时干预：
                     如果当前是移动布局但侧边栏没隐藏 -> 隐藏它；如果是桌面布局且侧边栏隐藏了
                     （且可能是之前手动隐藏？但为了不覆盖用户意愿，
                     做判断：如果当前是桌面但侧边栏隐藏，并且不是手动干预的？但为简单，
                     我们采用策略：进入桌面时若hidden存在，且没有用户强行显示的记忆？
                     为了流畅体验，建议进入桌面时如果hidden存在，
                     但我们想要默认显示？此处可以保留用户操作，
                     但更自然的是：从移动放大到桌面，
                     用户期望看到侧边栏出现？我们只处理初始加载，不频繁覆盖用户手动切换。
                */
                // 但为了不惹恼用户，当从移动放大到桌面时，如果侧边栏隐藏，我们让它显示？
                // 但可能用户故意隐藏了，突然显示会困惑。因此只建议在加载时适配一次。
                // 所以我们不在resize里强制改状态，而是依靠CSS的position和用户操作。
                // 以下resize里只调整因宽度变化导致固定定位可能带来的影响，不自动显示隐藏。
                // (可选：为了更好，小屏时如果侧边栏显示，将其改为fixed并且不占位，已经由CSS完成，无需额外)
            }, 100);
         });
         hideSidebar()
    })();