/**
 * Fraction Keypad Component
 * Custom input for fractions.
 */

export class FractionKeypad {
    constructor(containerId, onValueChange) {
        this.container = document.getElementById(containerId);
        this.onValueChange = onValueChange;
        this.value = {
            whole: '',
            numerator: '',
            denominator: ''
        };
        this.activeField = 'numerator'; // default
        
        this.render();
    }

    render() {
        this.container.innerHTML = `
            <div class="flex flex-col space-y-2 w-full max-w-xs mx-auto bg-white/40 p-3 rounded-2xl border border-white/20 shadow-inner">
                <!-- Input Display -->
                <div class="flex items-center justify-center space-x-2 h-20 bg-white/80 rounded-xl border border-mountain/20">
                    <input type="number" id="key-whole" placeholder="0" class="w-10 h-14 text-center text-xl font-outfit font-bold bg-transparent outline-none border-b-2 border-transparent focus:border-mountain transition-all" value="${this.value.whole}">
                    <div class="flex flex-col items-center">
                        <input type="number" id="key-num" placeholder="?" class="w-10 h-6 text-center text-lg font-outfit font-bold bg-transparent outline-none border-b-2 border-transparent focus:border-mountain transition-all" value="${this.value.numerator}">
                        <div class="w-12 h-0.5 bg-clay my-0.5"></div>
                        <input type="number" id="key-den" placeholder="?" class="w-10 h-6 text-center text-lg font-outfit font-bold bg-transparent outline-none border-b-2 border-transparent focus:border-mountain transition-all" value="${this.value.denominator}">
                    </div>
                </div>

                <!-- Number Keys -->
                <div class="grid grid-cols-3 gap-1.5">
                    ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 'C', 0, 'OK'].map(key => `
                        <button class="key-btn h-12 rounded-xl bg-white shadow-sm font-bold text-mountain hover:bg-mountain hover:text-white active:scale-95 transition-all" data-key="${key}">
                            ${key}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;

        this.setupEventListeners();
    }

    setupEventListeners() {
        const inputs = {
            whole: this.container.querySelector('#key-whole'),
            num: this.container.querySelector('#key-num'),
            den: this.container.querySelector('#key-den')
        };

        // Track active field
        Object.keys(inputs).forEach(key => {
            inputs[key].addEventListener('focus', () => {
                this.activeField = key === 'whole' ? 'whole' : (key === 'num' ? 'numerator' : 'denominator');
            });
        });

        // Keypad clicks
        this.container.querySelectorAll('.key-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const key = btn.dataset.key;
                this.handleInput(key, inputs);
            });
        });
    }

    handleInput(key, inputs) {
        if (key === 'C') {
            this.value[this.activeField] = '';
        } else if (key === 'OK') {
            this.onValueChange(this.value);
            return;
        } else {
            this.value[this.activeField] += key;
        }

        // Update UI
        inputs.whole.value = this.value.whole;
        inputs.num.value = this.value.numerator;
        inputs.den.value = this.value.denominator;
    }
}
