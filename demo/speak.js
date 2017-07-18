export default (text) => {
  var uttr = new SpeechSynthesisUtterance();
  uttr.text = text;
  uttr.lang = 'en-US';
  speechSynthesis.speak(uttr);
};
