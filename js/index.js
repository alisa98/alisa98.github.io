var allLinks = document.getElementsByTagName('a');
var strongEl = document.getElementById('latest-word');

var recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = 'en-US'; 
recognition.start();

recognition.onresult = function(event){
  

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
}

recognition.onerror = function(event){
  console.log('error?');
  console.log(event);
}
