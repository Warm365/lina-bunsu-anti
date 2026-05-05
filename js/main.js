/**
 * Main application logic for Lina's Fraction Mountain Conquest
 */

import { db } from './utils/firebase-config.js';
import { MountainMap } from './components/mountain-map.js';
import { Stage01 } from './stages/stage01.js';

// Application State
const state = {
    user: {
        name: '태린',
        currentStage: 1,
        stars: 0,
        badges: []
    },
    currentView: 'mountain', // 'mountain' or 'stage'
    isLoading: true,
    map: null
};

// DOM Elements
const elements = {
    loadingOverlay: document.getElementById('loading-overlay'),
    mountainView: document.getElementById('mountain-view'),
    stageView: document.getElementById('stage-view'),
    stageTitle: document.getElementById('stage-title'),
    stageName: document.getElementById('current-stage-name'),
    starCount: document.getElementById('star-count'),
    progressFill: document.getElementById('progress-fill'),
    progressText: document.getElementById('progress-text'),
    btnBack: document.getElementById('btn-back'),
    btnTTS: document.getElementById('btn-tts'),
    debugHUD: document.getElementById('debug-hud'),
    debugInfo: document.getElementById('debug-info')
};

/**
 * Initialize the application
 */
async function init() {
    console.log("🏔️ 분수산 정복기 초기화 중...");
    
    // Initialize Map
    state.map = new MountainMap('mountain-view', (stageId) => {
        showStageView(stageId);
    });
    state.map.render();

    // Simulate loading for better UX
    setTimeout(() => {
        hideLoading();
        showMountainView();
    }, 1500);

    setupEventListeners();
}

/**
 * Hide loading overlay with animation
 */
function hideLoading() {
    gsap.to(elements.loadingOverlay, {
        opacity: 0,
        duration: 0.8,
        onComplete: () => {
            elements.loadingOverlay.style.display = 'none';
            state.isLoading = false;
        }
    });
}

/**
 * Switch to Mountain Map view
 */
function showMountainView() {
    state.currentView = 'mountain';
    elements.stageTitle.textContent = 'CAMP';
    elements.stageName.textContent = '분수산 지도';
    
    gsap.to(elements.stageView, { opacity: 0, duration: 0.3, onComplete: () => {
        elements.stageView.style.pointerEvents = 'none';
        elements.mountainView.style.pointerEvents = 'auto';
        gsap.to(elements.mountainView, { opacity: 1, duration: 0.5 });
    }});
}

/**
 * Switch to a specific Stage view
 */
function showStageView(stageId) {
    state.currentView = 'stage';
    elements.stageTitle.textContent = `STAGE ${stageId}`;
    
    gsap.to(elements.mountainView, { opacity: 0, duration: 0.3, onComplete: () => {
        elements.mountainView.style.pointerEvents = 'none';
        elements.stageView.style.pointerEvents = 'auto';
        gsap.to(elements.stageView, { opacity: 1, duration: 0.5 });
        
        // Start Stage Logic
        if (stageId === 1) {
            elements.stageName.textContent = "분수 마을";
            const stage = new Stage01(elements.stageView, () => {
                console.log("Stage 1 Complete!");
                showMountainView();
                // Update state and save to Firebase
            });
            stage.start();
        }
    }});
}

/**
 * Global Event Listeners
 */
function setupEventListeners() {
    elements.btnBack.addEventListener('click', () => {
        if (state.currentView === 'stage') {
            showMountainView();
        } else {
            // If already on mountain view, maybe go back to portal?
            console.log("Go back to portal");
        }
    });

    elements.btnTTS.addEventListener('click', () => {
        // TTS logic will go here
        console.log("TTS Triggered");
    });

    // [Stage 3] Debug HUD Toggle (Secret: Long press header for 3 seconds or Ctrl+D)
    let debugTimer;
    const header = document.getElementById('stats-bar');
    header.onmousedown = () => debugTimer = setTimeout(toggleDebug, 3000);
    header.onmouseup = () => clearTimeout(debugTimer);
    header.ontouchstart = () => debugTimer = setTimeout(toggleDebug, 3000);
    header.ontouchend = () => clearTimeout(debugTimer);

    window.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'd') {
            e.preventDefault();
            toggleDebug();
        }
    });

    document.getElementById('debug-close').onclick = toggleDebug;
}

function toggleDebug() {
    const isHidden = elements.debugHUD.classList.contains('opacity-0');
    if (isHidden) {
        elements.debugHUD.classList.remove('opacity-0', 'pointer-events-none');
        updateDebugInfo();
        state.debugInterval = setInterval(updateDebugInfo, 1000);
    } else {
        elements.debugHUD.classList.add('opacity-0', 'pointer-events-none');
        clearInterval(state.debugInterval);
    }
}

function updateDebugInfo() {
    const info = `
        VIEW: ${state.currentView}
        STAGE: ${state.user.currentStage}
        W: ${window.innerWidth}px
        H: ${window.innerHeight}px
        DPR: ${window.devicePixelRatio}
        FIREBASE: OK
    `;
    elements.debugInfo.innerText = info.trim();
}

// Start the app
init();
