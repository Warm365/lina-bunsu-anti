/**
 * Speech Engine for Korean TTS
 */

export const speech = {
    speak(text) {
        if (!('speechSynthesis' in window)) {
            console.warn('Speech Synthesis not supported');
            return;
        }

        // Cancel previous speech
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ko-KR';
        utterance.rate = 0.9;  // Slightly slower for children
        utterance.pitch = 1.1; // Slightly higher/brighter

        // Handle iOS interaction requirement
        window.speechSynthesis.speak(utterance);
    }
};
