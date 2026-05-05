/**
 * Canvas Pad Component
 * Handles handwriting/drawing logic.
 */

export class CanvasPad {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.isDrawing = false;
        this.brushColor = '#4A8B4A';
        this.brushSize = 3;
        this.isEraser = false;

        this.init();
    }

    init() {
        this.canvas.id = 'drawing-canvas';
        this.canvas.className = 'w-full h-full bg-white/50 rounded-xl cursor-crosshair touch-none';
        this.container.appendChild(this.canvas);

        this.resize();
        window.addEventListener('resize', () => this.resize());

        this.setupEventListeners();
    }

    resize() {
        const rect = this.container.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        
        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;
        this.canvas.style.width = `${rect.width}px`;
        this.canvas.style.height = `${rect.height}px`;
        
        this.ctx.scale(dpr, dpr);
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
    }

    setupEventListeners() {
        const startAction = (e) => {
            this.isDrawing = true;
            const { x, y } = this.getCoords(e);
            this.ctx.beginPath();
            this.ctx.moveTo(x, y);
        };

        const moveAction = (e) => {
            if (!this.isDrawing) return;
            const { x, y } = this.getCoords(e);
            
            this.ctx.strokeStyle = this.isEraser ? '#FFF8E7' : this.brushColor;
            this.ctx.lineWidth = this.isEraser ? 20 : this.brushSize;
            
            this.ctx.lineTo(x, y);
            this.ctx.stroke();
        };

        const endAction = () => {
            this.isDrawing = false;
            this.ctx.closePath();
        };

        this.canvas.addEventListener('mousedown', startAction);
        this.canvas.addEventListener('mousemove', moveAction);
        window.addEventListener('mouseup', endAction);

        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            startAction(e.touches[0]);
        });
        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            moveAction(e.touches[0]);
        });
        this.canvas.addEventListener('touchend', endAction);
    }

    getCoords(e) {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    setEraser(active) {
        this.isEraser = active;
    }
}
