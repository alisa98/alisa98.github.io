var allLinks = document.getElementsByTagName('a');
var strongEl = document.getElementById('latest-word');

	var video = document.getElementById('v');
	var rec = null;
	try {
		rec = new webkitSpeechRecognition();
	} 
	catch(e) {
    	document.querySelector('.msg').setAttribute('data-state', 'show');
    	startRecBtn.setAttribute('disabled', 'true');
    	stopRecBtn.setAttribute('disabled', 'true');
    }
    if (rec) {
		rec.continuous = true;
		rec.interimResults = false;
		rec.lang = 'en';
	    var confidenceThreshold = 0.5;
		var userSaid = function(str, s) {
			return str.indexOf(s) > -1;
		}

		var highlightCommand = function(cmd) {
			var el = document.getElementById(cmd); 
			el.setAttribute('data-state', 'highlight');
			setTimeout(function() {
				el.setAttribute('data-state', '');
			}, 3000);
		}


		rec.onresult = function(e) {

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

			for (var i = e.resultIndex; i < e.results.length; ++i) {
	       		if (e.results[i].isFinal) {
	       			if (parseFloat(e.results[i][0].confidence) >= parseFloat(confidenceThreshold)) {
		       			var str = e.results[i][0].transcript;
		       			console.log('Recognised: ' + str);     			      		
		       				
		       				if (userSaid(str, 'replay')) {
		       					video.currentTime = 0;
		       					video.play();
		       					highlightCommand('vidReplay');
		       				}
		       				
		       				else if (userSaid(str, 'play')) {
		       					video.play();
		       					highlightCommand('vidPlay');
		       				}
		       				
		       				else if (userSaid(str, 'stop')) {
		       					video.pause();
		       					highlightCommand('vidStop');
		       				}
		       				
		       				else if (userSaid(str, 'volume')) {
		       				
		       					var vol = Math.floor(video.volume * 10) / 10;
		       					
		       					if (userSaid(str, 'increase')) {
		       						if (vol >= 0.9) video.volume = 1;
		       						else video.volume += 0.1;
		       						highlightCommand('vidVolInc');
		       					}
		       					
		       					else if (userSaid(str, 'decrease')) {
		       						if (vol <= 0.1) video.volume = 0;
		       						else video.volume -= 0.1;
		       						highlightCommand('vidVolDec');
		       					}
		       					
		       					else if (userSaid(str, 'of')) {
		       						video.muted = true;
		       						highlightCommand('vidVolOff');
		       					}
		       					
		       					else if (userSaid(str, 'on')) {
		       						video.muted = false;
		       						highlightCommand('vidVolOn');
		       					}
		       				}
		       			
	       			}
	        	}
	    	}
		};
		
		var startRec = function() {
			rec.start();
			recStatus.innerHTML = 'recognising';
		}
		
		var stopRec = function() {
			rec.stop();
			recStatus.innerHTML = 'not recognising';
		}
		// Setup listeners for the start and stop recognition buttons
		startRecBtn.addEventListener('click', startRec, false);
		stopRecBtn.addEventListener('click', stopRec, false);
	}


