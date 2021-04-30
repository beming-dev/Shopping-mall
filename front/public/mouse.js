let canvas = document.createElement('canvas');
document.body.appendChild(canvas);
let ctx = canvas.getContext('2d');

let pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

let width = document.body.clientWidth;
let height = document.body.clientHeight;

window.addEventListener('resize', resize);

let mouseX;
let mouseY;
window.addEventListener('mousemove', onMove);

let realX = 0;
let realY = 0;

resize();

window.requestAnimationFrame(animate);

function resize(){
    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width * pixelRatio;
    canvas.height = height * pixelRatio;

    ctx.scale(pixelRatio, pixelRatio);
}

function animate(){
    window.requestAnimationFrame(animate);

    realX += (mouseX - realX) * 0.12 || 0;
    realY += (mouseY - realY) * 0.12 || 0;

    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = '#FF5050';
    ctx.beginPath();
    ctx.arc(realX, realY, 7, 0, Math.PI*2);
    ctx.fill();
}

function onMove(e){
    mouseX = e.clientX;
    mouseY = e.clientY;
}