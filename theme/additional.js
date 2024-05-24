document.addEventListener('DOMContentLoaded', () => {
    const terminal = new Terminal({
        cols: 80,
        rows: 24,
        theme: {
            background: '#000000',
            foreground: '#0f0'
        }
    });
    terminal.open(document.getElementById('terminal'));

    const prompt = 'S1(config)# ';
    terminal.write(prompt);

    let command = '';

    terminal.onKey(e => {
        const { key, domEvent } = e;

        if (domEvent.key === 'Enter') { // Enter key
            terminal.write('\r\n');
            if (command === 'show version') {
                terminal.write('Cisco IOS Software, C2960 Software (C2960-LANBASEK9-M), Version 15.0(2)SE, RELEASE SOFTWARE (fc1)\r\n');
            } else if (command.startsWith('boot system')) {
                terminal.write('Configuración de boot system actualizada.\r\n');
            } else {
                terminal.write('Comando no reconocido.\r\n');
            }
            terminal.write(prompt);
            command = '';
        } else if (domEvent.key === 'Backspace') { // Backspace key
            if (command.length > 0) {
                terminal.write('\b \b');
                command = command.slice(0, -1);
            }
        } else if (!domEvent.ctrlKey && !domEvent.altKey && !domEvent.metaKey) { // Filtra las teclas de control
            terminal.write(key);
            command += key;
        }
    });

    terminal.focus();
});


/********************************** */
window.onload = function() {
    setupNetwork1();
    setupNetwork2();
};

function setupNetwork1() {
    const canvas = document.getElementById('networkCanvas1');
    const context = canvas.getContext('2d');
    const playPauseButton = document.getElementById('playPauseButton1');
    const progressBar = document.getElementById('progressBar1');

    const trunkInfo = document.getElementById('trunkInfo1');
    trunkInfo.style.display = 'block';

    const packetElement = document.createElement('div');
    packetElement.className = 'packet';
    packetElement.innerText = 'Dirección';
    document.body.appendChild(packetElement);

    const img = new Image();
    img.src = './images/image-2.png';
    img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        drawInitial();
    };

    const path = [
        { x: 170, y: 40 },    // Inicio
        { x: 310, y: 190 },   // S2
        { x: 420, y: 40 },    // S1
        { x: 580, y: 190 },   // S3
        { x: 710, y: 40 }     // PC4
    ];

    let step = 0;
    let isPlaying = false;
    let animationFrameId;

    function drawInitial() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = '#ffffff';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0);

        context.font = '12px Arial';
        context.fillStyle = '#000000';
        context.fillText('Cuerpo docente', 20, 40);
        context.fillText('VLAN 10', 20, 55);
        context.fillText('172.17.10.21/24', 20, 70);  // PC1
        context.fillText('Estudiante', 20, 160);
        context.fillText('VLAN 20', 20, 175);
        context.fillText('172.17.20.22/24', 20, 190);  // PC2
        context.fillText('Cuerpo docente', 720, 40);
        context.fillText('VLAN 10', 720, 55);
        context.fillText('172.17.10.24/24', 720, 70);  // PC4
        context.fillText('Estudiante', 720, 160);
        context.fillText('VLAN 20', 720, 175);
        context.fillText('172.17.20.25/24', 720, 190);  // PC5
    }

    function drawPacket(x, y) {
        drawInitial();
        context.fillStyle = '#800080';
        context.fillRect(x - 40, y - 20, 80, 20);
        context.fillStyle = '#ffffff';
        context.font = '12px Arial';
        context.fillText('Dirección', x - 30, y - 5);
    }

    function animatePacket() {
        if (step < path.length) {
            drawPacket(path[step].x, path[step].y);
            progressBar.value = (step / (path.length - 1)) * 100;
            step++;
            animationFrameId = setTimeout(animatePacket, 500); // Ajuste del tiempo para saltos más cortos
        } else {
            isPlaying = false;
            playPauseButton.textContent = '▶️';
            step = 0; // Reinicia el paso al final
        }
    }

    playPauseButton.addEventListener('click', () => {
        if (isPlaying) {
            clearTimeout(animationFrameId);
            isPlaying = false;
            playPauseButton.textContent = '▶️';
        } else {
            isPlaying = true;
            playPauseButton.textContent = '⏸️';
            animatePacket();
        }
    });

    progressBar.addEventListener('input', () => {
        if (!isPlaying) {
            step = Math.round((progressBar.value / 100) * (path.length - 1));
            drawPacket(path[step].x, path[step].y);
        }
    });
}



function setupNetwork2() {
    const canvas = document.getElementById('networkCanvas2');
    const context = canvas.getContext('2d');
    const playPauseButton = document.getElementById('playPauseButton2');
    const progressBar = document.getElementById('progressBar2');

    const trunkInfo = document.getElementById('trunkInfo2');
    trunkInfo.style.display = 'block';

    const packetElement = document.createElement('div');
    packetElement.className = 'packet';
    packetElement.innerText = 'Difusión';
    document.body.appendChild(packetElement);

    const img = new Image();
    img.src = './images/image-3.png';
    img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        drawInitial();
    };

    const path = [
        { x: 90, y: 40 },     // PC1
        { x: 240, y: 120 },   
        { x: 280, y: 160 },   // S2
        { x: 320, y: 280 },   // S1
        { x: 480, y: 120 },   
        { x: 520, y: 160 },    // S3
        { x: 560, y: 160 }
    ];

    const splitPoints = {
        3: [
            { x: 90, y: 120 }, // PC2
            { x: 90, y: 280 }, // PC3
            { x: 400, y: 40 }   // S1
        ],
        6: [
            { x: 630, y: 40 },  // PC4
            { x: 630, y: 160 }, // PC5
            { x: 620, y: 280 }  // PC6
        ]
    };

    let step = 0;
    let isPlaying = false;
    let animationFrameId;

    function drawInitial() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = '#ffffff';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0);

        context.font = '12px Arial';
        context.fillStyle = '#000000';
        context.fillText('Cuerpo docente', 20, 30);
        context.fillText('172.17.40.21/24', 20, 45);  // PC1
        context.fillText('Estudiante', 20, 150);
        context.fillText('172.17.40.22/24', 20, 165);  // PC2
        context.fillText('Invitado', 20, 270);
        context.fillText('172.17.40.23/24', 20, 285);  // PC3
        context.fillText('Cuerpo docente', 700, 30);
        context.fillText('172.17.40.24/24', 700, 45);  // PC4
        context.fillText('Estudiante', 700, 150);
        context.fillText('172.17.40.25/24', 700, 165);  // PC5
        context.fillText('Invitado', 700, 270);
        context.fillText('172.17.40.26/24', 700, 285);  // PC6
    }

    function drawPacket(x, y, text = 'Difusión') {
        context.fillStyle = '#800080';
        context.fillRect(x - 40, y - 20, 80, 20);
        context.fillStyle = '#ffffff';
        context.font = '12px Arial';
        context.fillText(text, x - 30, y - 5);
    }

    function animatePacket() {
        if (step < path.length) {
            drawInitial();
            if (splitPoints[step]) {
                splitPoints[step].forEach(point => drawPacket(point.x, point.y));
            } else {
                drawPacket(path[step].x, path[step].y);
            }
            progressBar.value = (step / (path.length - 1)) * 100;
            step++;
            animationFrameId = setTimeout(animatePacket, 500); // Ajuste del tiempo para saltos más cortos
        } else {
            isPlaying = false;
            playPauseButton.textContent = '▶️';
            step = 0; // Reinicia el paso al final
        }
    }

    playPauseButton.addEventListener('click', () => {
        if (isPlaying) {
            clearTimeout(animationFrameId);
            isPlaying = false;
            playPauseButton.textContent = '▶️';
        } else {
            isPlaying = true;
            playPauseButton.textContent = '⏸️';
            animatePacket();
        }
    });

    progressBar.addEventListener('input', () => {
        if (!isPlaying) {
            step = Math.round((progressBar.value / 100) * (path.length - 1));
            drawPacket(path[step].x, path[step].y);
        }
    });
}
