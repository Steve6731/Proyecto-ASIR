<!DOCTYPE html>
<html>
<head>
   <meta charset="utf-8">
   <title>HTML</title>
   <meta name="viewport" content="width = device-width, initial-scale=1.0">
   <link rel="stylesheet" href="style.css">
</head>
<body>
   
   <div id="workArea">  </div>

    <div id="leftClickMenu" class="custom-menu">
        <ul>
            <li onclick="handleMenuClick('add')">Add</li>
            <li onclick="handleMenuClick('del')">Delete</li>
            <hr>
            <li onclick="handleMenuClick('property')">property</li>
        </ul>
    </div>
   <script src="./js/config.js"></script>
   <script src="./js/function.js"></script>
   <script src="./js/leftClickMenu.js"></script>

</body>
</html>