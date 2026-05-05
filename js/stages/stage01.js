/**
 * Stage 01: Fraction Village - Logic
 */

import { stage01Problems } from '../data/problems-stage01.js';
import { PizzaSVG } from '../components/pizza-svg.js';
import { CanvasPad } from '../components/canvas-pad.js';
import { FractionKeypad } from '../components/fraction-keypad.js';
import { speech } from '../utils/speech.js';

export class Stage01 {
    constructor(container, onComplete) {
        this.container = container;
        this.onComplete = onComplete;
        this.currentStep = 0; // 0: Intro, 1-3: Concepts, 4: Interactive, 5-11: Problems
        this.totalSteps = 4 + stage01Problems.length;
        this.problems = stage01Problems;
        this.currentProblemIdx = 0;

        this.canvasPad = null;
        this.keypad = null;
        this.pizza = null;
        
        console.log("🔍 Stage01 검증 시스템 가동...");
    }

    start() {
        this.renderStep();
    }

    renderStep() {
        gsap.to(this.container, { opacity: 0, y: -20, duration: 0.3, onComplete: () => {
            this.container.innerHTML = '';
            
            if (this.currentStep === 0) {
                this.renderIntro();
            } else if (this.currentStep <= 3) {
                this.renderConcept(this.currentStep);
            } else if (this.currentStep === 4) {
                this.renderInteractive();
            } else {
                this.renderProblem(this.currentStep - 5);
            }

            // Animate in
            gsap.fromTo(this.container, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });

            // Update progress bar
            const progress = Math.round((this.currentStep / this.totalSteps) * 100);
            gsap.to(document.getElementById('progress-fill'), { width: `${progress}%`, duration: 0.5 });
            document.getElementById('progress-text').textContent = `${this.currentStep}/${this.totalSteps}`;
        }});
    }

    renderIntro() {
        this.container.innerHTML = `
            <div class="flex flex-col items-center justify-center h-full space-y-8 animate-fadeIn">
                <div class="text-8xl animate-bounce">🏠</div>
                <div class="text-center space-y-4">
                    <h1 class="text-4xl font-bold text-mountain">1단계: 분수 마을</h1>
                    <p class="text-xl text-gray-600">분수가 무엇인지 함께 알아볼까요?</p>
                </div>
                <button id="btn-next-step" class="px-12 py-4 bg-mountain text-white rounded-full text-2xl font-bold shadow-lg hover:scale-105 active:scale-95 transition-all">
                    시작하기!
                </button>
            </div>
        `;
        
        document.getElementById('btn-next-step').onclick = () => {
            this.currentStep++;
            this.renderStep();
        };
    }

    renderConcept(step) {
        const concepts = [
            "",
            { text: "피자 한 판이 있어요.", icon: "🍕", voice: "피자 한 판이 있어요." },
            { text: "4조각으로 똑같이 나누었어요.", icon: "🔪", voice: "네 조각으로 똑같이 나누었어요." },
            { text: "이 중 한 조각을 1/4(사분의 일)이라고 불러요.", icon: "☝️", voice: "이 중 한 조각을 사분의 일 이라고 불러요." }
        ];
        
        const concept = concepts[step];
        this.container.innerHTML = `
            <div class="flex flex-col items-center justify-center h-full space-y-8 animate-fadeIn">
                <div id="visual-area" class="w-64 h-64 flex items-center justify-center"></div>
                <div class="text-center space-y-4">
                    <p class="text-2xl font-bold text-gray-800">${concept.text}</p>
                </div>
                <button id="btn-next-step" class="px-12 py-4 bg-mountain text-white rounded-full text-xl font-bold shadow-md hover:bg-mountain/90 transition-all">
                    다음
                </button>
            </div>
        `;

        // Render visual based on step
        if (step === 1) {
            new PizzaSVG('visual-area', { total: 1, colored: 1 });
        } else if (step === 2) {
            new PizzaSVG('visual-area', { total: 4, colored: 0 });
        } else if (step === 3) {
            new PizzaSVG('visual-area', { total: 4, colored: 1 });
        }

        speech.speak(concept.voice);

        document.getElementById('btn-next-step').onclick = () => {
            this.currentStep++;
            this.renderStep();
        };
    }

    renderInteractive() {
        this.container.innerHTML = `
            <div class="flex flex-col items-center justify-center h-full space-y-6 p-4">
                <h2 class="text-2xl font-bold text-mountain">직접 조절해봐요!</h2>
                <div id="visual-area" class="w-64 h-64"></div>
                <div class="w-full max-w-sm space-y-4 bg-white/50 p-6 rounded-2xl">
                    <div class="flex justify-between items-center">
                        <span class="font-bold text-gray-700">조각 수: <span id="slice-count-text">4</span></span>
                        <input type="range" id="input-slices" min="2" max="12" value="4" class="accent-mountain">
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-bold text-gray-700">색칠하기: <span id="colored-count-text">1</span></span>
                        <input type="range" id="input-colored" min="0" max="4" value="1" class="accent-reward">
                    </div>
                </div>
                <button id="btn-next-step" class="px-12 py-3 bg-mountain text-white rounded-full font-bold shadow-md">
                    다 이해했어요!
                </button>
            </div>
        `;

        const sliceInput = document.getElementById('input-slices');
        const coloredInput = document.getElementById('input-colored');
        const sliceText = document.getElementById('slice-count-text');
        const coloredText = document.getElementById('colored-count-text');

        this.pizza = new PizzaSVG('visual-area', { 
            total: parseInt(sliceInput.value), 
            colored: parseInt(coloredInput.value) 
        });

        const update = () => {
            const total = parseInt(sliceInput.value);
            const colored = Math.min(parseInt(coloredInput.value), total);
            coloredInput.max = total;
            sliceText.textContent = total;
            coloredText.textContent = colored;
            this.pizza = new PizzaSVG('visual-area', { total, colored });
        };

        sliceInput.oninput = update;
        coloredInput.oninput = update;

        document.getElementById('btn-next-step').onclick = () => {
            this.currentStep++;
            this.renderStep();
        };
    }

    renderProblem(idx) {
        const problem = this.problems[idx];
        this.container.innerHTML = `
            <div class="flex flex-col h-full space-y-2 overflow-hidden">
                <!-- Question Area -->
                <div class="bg-white/60 p-3 rounded-2xl border border-white/20 shadow-sm shrink-0">
                    <p class="text-lg md:text-xl font-bold text-gray-800">${problem.question}</p>
                </div>
                
                <div class="flex-1 flex flex-col md:flex-row gap-4 overflow-hidden">
                    <!-- Visual/Canvas Area -->
                    <div class="flex-[1.5] flex flex-col space-y-2 min-h-0 overflow-hidden">
                        <!-- Visual Area (Pizza) -->
                        <div id="visual-area" class="flex-1 bg-white/40 rounded-2xl flex items-center justify-center p-4 min-h-0"></div>
                        
                        <!-- Canvas Area (Handwriting) -->
                        <div id="canvas-area" class="h-32 md:h-48 relative shrink-0">
                            <div class="absolute top-2 left-2 flex space-x-1 z-10">
                                <button id="btn-pen" class="p-2 bg-mountain text-white rounded-lg shadow-sm hover:scale-110 transition-transform"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg></button>
                                <button id="btn-eraser" class="p-2 bg-white text-gray-400 rounded-lg shadow-sm hover:scale-110 transition-transform"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                                <button id="btn-clear" class="p-2 bg-white text-gray-400 rounded-lg shadow-sm hover:scale-110 transition-transform"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg></button>
                            </div>
                            <div id="canvas-container" class="w-full h-full"></div>
                        </div>
                    </div>
                    
                    <!-- Keypad Area (Answer Input) -->
                    <div id="keypad-area" class="w-full md:w-80 flex flex-col justify-center shrink-0">
                        <!-- Keypad component will render here -->
                    </div>
                </div>
            </div>
        `;

        // Initialize Components
        this.canvasPad = new CanvasPad('canvas-container');
        this.keypad = new FractionKeypad('keypad-area', (val) => this.checkAnswer(val, problem));

        if (problem.visual && problem.visual.type === 'pizza') {
            new PizzaSVG('visual-area', { 
                total: problem.visual.total, 
                colored: problem.visual.colored,
                interactive: problem.visual.interactive,
                onSliceClick: (i) => {
                    // Interactive slice logic
                }
            });
        }

        // Setup Canvas Buttons
        document.getElementById('btn-pen').onclick = () => this.canvasPad.setEraser(false);
        document.getElementById('btn-eraser').onclick = () => this.canvasPad.setEraser(true);
        document.getElementById('btn-clear').onclick = () => this.canvasPad.clear();
        
        speech.speak(problem.question);

        // [Stage 2] Health Check 실행
        this.checkIntegrity();
    }

    /**
     * 검증 모드 Stage 2: 구성 요소 무결성 검사
     */
    checkIntegrity() {
        const requiredElements = ['visual-area', 'canvas-container', 'keypad-area'];
        const missing = requiredElements.filter(id => !document.getElementById(id));
        
        if (missing.length > 0) {
            console.error("❌ 필수 구성 요소 누락:", missing);
            this.showFeedback(false, "화면 구성에 문제가 생겼어요. 다시 불러올게요!");
            setTimeout(() => this.renderStep(), 1000);
            return;
        }

        // 요소가 화면 안에 있는지 체크 (오프스크린 방지)
        const keypad = document.getElementById('keypad-area');
        const rect = keypad.getBoundingClientRect();
        if (rect.top > window.innerHeight || rect.bottom < 0) {
            console.warn("⚠️ 키패드가 화면 밖에 있습니다. 레이아웃 재조정 중...");
            keypad.scrollIntoView({ behavior: 'smooth' });
        }
    }

    checkAnswer(val, problem) {
        let isCorrect = false;
        
        if (problem.correctAnswer === "free_form") {
            isCorrect = true;
        } else {
            isCorrect = (
                val.numerator === problem.correctAnswer.numerator &&
                val.denominator === problem.correctAnswer.denominator &&
                val.whole === problem.correctAnswer.whole
            );
        }

        if (isCorrect) {
            this.showFeedback(true, problem.explanation);
        } else {
            this.showFeedback(false, problem.hint);
        }
    }

    showFeedback(isCorrect, message) {
        const toast = document.getElementById('feedback-toast');
        const icon = document.getElementById('feedback-icon');
        const msg = document.getElementById('feedback-message');

        icon.textContent = isCorrect ? '✨' : '🧐';
        msg.textContent = isCorrect ? '정답이에요! ' + message : message;
        toast.classList.remove('opacity-0', 'scale-90', 'pointer-events-none');
        toast.classList.add('opacity-100', 'scale-100');

        if (isCorrect) {
            setTimeout(() => {
                toast.classList.add('opacity-0', 'scale-90', 'pointer-events-none');
                this.currentStep++;
                if (this.currentStep >= this.totalSteps) {
                    this.renderReward();
                } else {
                    this.renderStep();
                }
            }, 2500);
        } else {
            setTimeout(() => {
                toast.classList.add('opacity-0', 'scale-90', 'pointer-events-none');
            }, 2000);
        }
    }

    renderReward() {
        this.container.innerHTML = `
            <div class="flex flex-col items-center justify-center h-full space-y-8 animate-fadeIn">
                <div class="relative">
                    <div class="text-9xl animate-bounce">🏆</div>
                    <div id="confetti-area" class="absolute inset-0 pointer-events-none"></div>
                </div>
                <div class="text-center space-y-4">
                    <h1 class="text-4xl font-bold text-mountain">정복 완료!</h1>
                    <p class="text-xl text-gray-600">리나, 정말 대단해요! 1단계를 완벽하게 정복했어요.</p>
                    <div class="flex justify-center space-x-2 text-4xl text-reward">
                        <span>⭐</span><span>⭐</span><span>⭐</span>
                    </div>
                </div>
                <button id="btn-finish" class="px-12 py-4 bg-mountain text-white rounded-full text-2xl font-bold shadow-lg hover:scale-105 transition-all">
                    산 지도로 돌아가기
                </button>
            </div>
        `;

        speech.speak("축하해요 리나! 일 단계를 정복했어요. 정말 멋져요!");

        document.getElementById('btn-finish').onclick = () => {
            this.onComplete();
        };
    }
}
