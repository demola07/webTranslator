//Init Speack Synth API
const synth = window.speechSynthesis;

//DOM Elements
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#voice-select');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');

//Init Voices array
let voices = [];

const getVoices = () => {
  voices = synth.getVoices();

  //Loop through voices  and create option for each one
  voices.forEach((voice) => {
    //create option element
    const option = document.createElement('option');
    //fill option with voice and language
    option.textContent = voice.name + '(' + voice.lang + ')';

    //set needed option attributes
    option.setAttribute('data-lang', voice.lang);
    option.setAttribute('data-name', voice.name);
    voiceSelect.appendChild(option);
  });
};
getVoices();
if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices;
}

//Speak
const speak = () => {
  //check if speaking
  if (synth.speaking) {
    console.error('Aleady speaking...');
    return;
  }
  if (textInput.value !== '') {
    //Get speak text
    const speakText = new SpeechSynthesisUtterance(textInput.value);

    //speak end
    speakText.onend = (e) => {
      console.log('Done speaking');
    };

    //Speak error
    speakText.onerror = (e) => {
      console.error('Something went wrong...');
    };

    //Selected voice
    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

    //Loop through voices
    voices.forEach((voice) => {
      if (voice.name === selectedVoice) {
        speakText.voice = voice;
      }
    });

    //Set pitch and rate
    speakText.rate = rate.value;
    speakText.pitch = pitch.value;

    //Speak
    synth.speak(speakText);
  }
};
