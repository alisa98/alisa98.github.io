
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent


var colors = [ 'aqua' , 'azure' , 'beige', 'bisque', 'black', 'blue', 'brown', 'chocolate', 'coral', 'crimson', 'cyan', 'fuchsia', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'green', 'indigo', 'ivory', 'khaki', 'lavender', 'lime', 'linen', 'magenta', 'maroon', 'moccasin', 'navy', 'olive', 'orange', 'orchid', 'peru', 'pink', 'plum', 'purple', 'red', 'salmon', 'sienna', 'silver', 'snow', 'tan', 'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'white', 'yellow'];
var grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;'

var allLinks = document.getElementsByTagName('a');
var strongEl = document.getElementById('latest-word');

var recognition = new SpeechRecognition();  
var speechRecognitionList = new SpeechGrammarList(); 
speechRecognitionList.addFromString(grammar, 1);  
recognition.grammars = speechRecognitionList;
recognition.continuous = true;
recognition.lang = 'en-US'; 
recognition.interimResults = false;
recognition.maxAlternatives = 1;


var diagnostic = document.querySelector('.output');
var bg = document.querySelector('html');
var hints = document.querySelector('.hints');

var colorHTML= '';
colors.forEach(function(v, i, a){  
  console.log(v, i);
  colorHTML += '<span style="background-color:' + v + ';"> ' + v + ' </span>';
});
hints.innerHTML = colorHTML + '.';

recognition.start(); 
recognition.onresult = function(event) {

  var resultsLength = event.results.length -1 ;
  var ArrayLength = event.results[resultsLength].length -1;
  var saidWord = event.results[resultsLength][ArrayLength].transcript;
  
  for (i=0; i<allLinks.length; i++) {
    var dataWord = allLinks[i].dataset.word;
    if (saidWord.indexOf(dataWord) != -1) {
      allLinks[i].click();
    }
  }
  strongEl.innerHTML = saidWord;

  var last = event.results.length - 1;  
  var color = event.results[last][0].transcript;  

  bg.style.backgroundColor = color;
  console.log('Confidence: ' + event.results[0][0].confidence);
}
