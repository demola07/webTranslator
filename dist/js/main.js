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
