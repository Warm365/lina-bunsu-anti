/**
 * Pizza SVG Component
 * Visualizes fractions as pizza slices.
 */

export class PizzaSVG {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        this.totalSlices = options.total || 4;
        this.coloredSlices = options.colored || 0;
        this.interactive = options.interactive || false;
        this.onSliceClick = options.onSliceClick || null;
        this.isUnequal = options.unequal || false;

        this.render();
    }

    render() {
        const svgNS = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("viewBox", "-100 -100 200 200");
        svg.setAttribute("class", "w-full h-full max-w-[300px] mx-auto drop-shadow-lg");

        let currentAngle = -Math.PI / 2;
        const angles = [];
        
        if (this.isUnequal) {
            // Randomize angles to make them unequal
            let remaining = 2 * Math.PI;
            for (let i = 0; i < this.totalSlices; i++) {
                const angle = (i === this.totalSlices - 1) ? remaining : (remaining / (this.totalSlices - i)) * (0.5 + Math.random());
                angles.push(angle);
                remaining -= angle;
            }
        } else {
            const angleStep = (2 * Math.PI) / this.totalSlices;
            for (let i = 0; i < this.totalSlices; i++) angles.push(angleStep);
        }

        for (let i = 0; i < this.totalSlices; i++) {
            const startAngle = currentAngle;
            const endAngle = currentAngle + angles[i];
            currentAngle = endAngle;
            
            const x1 = 80 * Math.cos(startAngle);
            const y1 = 80 * Math.sin(startAngle);
            const x2 = 80 * Math.cos(endAngle);
            const y2 = 80 * Math.sin(endAngle);
            
            const largeArc = angleStep > Math.PI ? 1 : 0;

            const path = document.createElementNS(svgNS, "path");
            path.setAttribute("d", `M 0 0 L ${x1} ${y1} A 80 80 0 ${largeArc} 1 ${x2} ${y2} Z`);
            path.setAttribute("fill", i < this.coloredSlices ? "#FF8C42" : "#FFF8E7");
            path.setAttribute("stroke", "#8B4513");
            path.setAttribute("stroke-width", "2");
            
            if (this.interactive) {
                path.style.cursor = "pointer";
                path.addEventListener("click", () => {
                    if (this.onSliceClick) this.onSliceClick(i);
                });
                
                // Hover effect
                path.addEventListener("mouseenter", () => path.setAttribute("opacity", "0.8"));
                path.addEventListener("mouseleave", () => path.setAttribute("opacity", "1"));
            }

            svg.appendChild(path);
        }

        // Optional: Center text
        /*
        const text = document.createElementNS(svgNS, "text");
        text.setAttribute("x", "0");
        text.setAttribute("y", "0");
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("dominant-baseline", "middle");
        text.setAttribute("fill", "#8B4513");
        text.setAttribute("font-size", "12");
        text.setAttribute("font-weight", "bold");
        text.textContent = `${this.coloredSlices}/${this.totalSlices}`;
        svg.appendChild(text);
        */

        this.container.innerHTML = '';
        this.container.appendChild(svg);
    }

    update(colored) {
        this.coloredSlices = colored;
        this.render();
    }
}
