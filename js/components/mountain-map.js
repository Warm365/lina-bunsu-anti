/**
 * Mountain Map Component
 * Renders an interactive SVG map with 20 stages.
 */

export class MountainMap {
    constructor(containerId, onStageSelect) {
        this.container = document.getElementById(containerId);
        this.onStageSelect = onStageSelect;
        this.stages = this.generateStageData();
    }

    generateStageData() {
        const stages = [];
        for (let i = 1; i <= 20; i++) {
            stages.push({
                id: i,
                name: `Stage ${i}`,
                x: 100 + (i % 2 === 0 ? 50 : -50) + (Math.sin(i * 0.5) * 30),
                y: 900 - (i * 40),
                status: i === 1 ? 'active' : 'locked', // Initial state
                stars: 0
            });
        }
        return stages;
    }

    render() {
        const svgNS = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("viewBox", "0 0 400 1000");
        svg.setAttribute("class", "w-full h-full");

        // 0. Draw Background Decorations
        this.drawDecorations(svg, svgNS);

        // 1. Draw Mountain Path (Line)
        const path = document.createElementNS(svgNS, "path");
        let d = `M ${this.stages[0].x} ${this.stages[0].y}`;
        for (let i = 1; i < this.stages.length; i++) {
            d += ` L ${this.stages[i].x} ${this.stages[i].y}`;
        }
        path.setAttribute("d", d);
        path.setAttribute("stroke", "#4A8B4A");
        path.setAttribute("stroke-width", "4");
        path.setAttribute("fill", "none");
        path.setAttribute("stroke-dasharray", "8,8");
        path.setAttribute("opacity", "0.3");
        svg.appendChild(path);

        // 2. Draw Stage Nodes
        this.stages.forEach(stage => {
            const group = document.createElementNS(svgNS, "g");
            group.setAttribute("class", `stage-node ${stage.status}`);
            group.dataset.id = stage.id;

            // Circle
            const circle = document.createElementNS(svgNS, "circle");
            circle.setAttribute("cx", stage.x);
            circle.setAttribute("cy", stage.y);
            circle.setAttribute("r", stage.status === 'active' ? "15" : "12");
            circle.setAttribute("fill", stage.status === 'locked' ? "#B0B0B0" : "#4A8B4A");
            circle.setAttribute("stroke", "white");
            circle.setAttribute("stroke-width", "3");
            circle.setAttribute("class", stage.status === 'active' ? "animate-pulse" : "");
            
            // Text (Number)
            const text = document.createElementNS(svgNS, "text");
            text.setAttribute("x", stage.x);
            text.setAttribute("y", stage.y + 4);
            text.setAttribute("text-anchor", "middle");
            text.setAttribute("fill", "white");
            text.setAttribute("font-size", "10");
            text.setAttribute("font-weight", "bold");
            text.textContent = stage.id;

            group.appendChild(circle);
            group.appendChild(text);

            group.addEventListener('click', () => {
                if (stage.status !== 'locked') {
                    this.onStageSelect(stage.id);
                }
            });

            svg.appendChild(group);
        });

        this.container.innerHTML = '';
        this.container.appendChild(svg);
        
        // Scroll to bottom (Stage 1)
        setTimeout(() => {
            this.container.scrollTo({
                top: this.container.scrollHeight,
                behavior: 'smooth'
            });
        }, 300);
    }

    drawDecorations(svg, svgNS) {
        // Draw some "peaks" in the background
        for (let i = 0; i < 5; i++) {
            const peak = document.createElementNS(svgNS, "path");
            const x = Math.random() * 400;
            const y = Math.random() * 1000;
            const w = 100 + Math.random() * 100;
            const h = 150 + Math.random() * 150;
            peak.setAttribute("d", `M ${x-w/2} ${y} L ${x} ${y-h} L ${x+w/2} ${y} Z`);
            peak.setAttribute("fill", "#4A8B4A");
            peak.setAttribute("opacity", "0.05");
            svg.appendChild(peak);
        }

        // Draw Clouds
        for (let i = 0; i < 8; i++) {
            const cloud = document.createElementNS(svgNS, "text");
            cloud.setAttribute("x", Math.random() * 400);
            cloud.setAttribute("y", Math.random() * 1000);
            cloud.setAttribute("font-size", 20 + Math.random() * 20);
            cloud.setAttribute("opacity", "0.3");
            cloud.textContent = "☁️";
            svg.appendChild(cloud);
        }
    }
}
