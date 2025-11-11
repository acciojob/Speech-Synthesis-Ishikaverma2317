//Your code goes here

// Initialize SpeechSynthesisUtterance
const msg = new SpeechSynthesisUtterance();
let voices = [];

// DOM elements
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');

// Function to populate available voices dynamically
function populateVoices() {
  voices = window.speechSynthesis.getVoices();
  voicesDropdown.innerHTML = voices
    .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
    .join('');
}

// Set selected voice
function setVoice() {
  msg.voice = voices.find(voice => voice.name === this.value);
  toggleSpeech(); // restart speech with new voice
}

// Speak text
function toggleSpeech(startOver = true) {
  window.speechSynthesis.cancel();
  if (startOver) {
    window.speechSynthesis.speak(msg);
  }
}

// Update options dynamically (rate, pitch, text)
function setOption() {
  msg[this.name] = this.value;
  toggleSpeech();
}

// Event listeners
speechSynthesis.addEventListener('voiceschanged', populateVoices);
voicesDropdown.addEventListener('change', setVoice);
options.forEach(option => option.addEventListener('change', setOption));
speakButton.addEventListener('click', toggleSpeech);
stopButton.addEventListener('click', () => toggleSpeech(false));

// Initialize defaults
msg.text = document.querySelector('[name="text"]').value;
