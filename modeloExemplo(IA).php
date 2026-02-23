<!DOCTYPE html>
<html>
<head>
    <style>
        .container {
            display: flex;
            gap: 20px;
            padding: 20px;
        }
        .control-panel {
            width: 300px;
            padding: 20px;
            background: #f5f5f5;
            border-radius: 8px;
        }
        .display-area {
            flex: 1;
            min-height: 400px;
            border: 2px dashed #ccc;
            padding: 20px;
            border-radius: 8px;
        }
        .added-element {
            margin: 10px 0;
            padding: 10px;
            background: #e3f2fd;
            border-radius: 4px;
            cursor: move;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="control-panel">
            <h3>Añadir</h3>
            <input type="text" id="elementText" placeholder="输入内容" />
            <select id="elementType">
                <option value="text">texto</option>
                <option value="button">botton</option>
                <option value="image">imagen</option>
            </select>
            <button onclick="addElement()">add</button>
            
            <h4>Style</h4>
            <input type="color" id="colorPicker" value="#ff0000" />
            <input type="range" id="fontSize" min="12" max="48" value="16" />
        </div>
        
        <div class="display-area" id="displayArea">
            <!-- nuevo elemento va añadir aquí -->
        </div>
    </div>

    <script>
        function addElement() {
            const text = document.getElementById('elementText').value;
            const type = document.getElementById('elementType').value;
            const color = document.getElementById('colorPicker').value;
            const fontSize = document.getElementById('fontSize').value;
            
            if (!text && type !== 'image') return;
            
            const element = document.createElement('div');
            element.className = 'added-element';
            element.style.color = color;
            element.style.fontSize = fontSize + 'px';
            
            switch(type) {
                case 'text':
                    element.textContent = text;
                    break;
                case 'button':
                    const btn = document.createElement('button');
                    btn.textContent = text;
                    btn.style.backgroundColor = color;
                    element.appendChild(btn);
                    break;
                case 'image':
                    const img = document.createElement('img');
                    img.src = text || 'https://via.placeholder.com/100';
                    img.style.width = '100px';
                    element.appendChild(img);
                    break;
            }
            
            // añadir un botton de eliminar
            const deleteBtn = document.createElement('span');
            deleteBtn.textContent = ' ❌';
            deleteBtn.style.cursor = 'pointer';
            deleteBtn.style.marginLeft = '10px';
            deleteBtn.onclick = function() {
                element.remove();
            };
            element.appendChild(deleteBtn);
            
            document.getElementById('displayArea').appendChild(element);
        }
    </script>
</body>
</html>