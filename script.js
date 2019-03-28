
/*Поддержка Chrome*/
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

/*Грамматика*/
var colors = [ 'aqua' , 'azure' , 'beige', 'bisque', 'black', 'blue', 'brown', 'chocolate', 'coral', 'crimson', 'cyan', 'fuchsia', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'green', 'indigo', 'ivory', 'khaki', 'lavender', 'lime', 'linen', 'magenta', 'maroon', 'moccasin', 'navy', 'olive', 'orange', 'orchid', 'peru', 'pink', 'plum', 'purple', 'red', 'salmon', 'sienna', 'silver', 'snow', 'tan', 'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'white', 'yellow'];
var grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;'


/*Подключение грамматики к распознаванию речи*/

var recognition = new SpeechRecognition();  /* определить экземпляр распознавания речи для управления распознаванием для нашего приложения*/
var speechRecognitionList = new SpeechGrammarList(); /* создаем новый речевой грамматический список, чтобы содержать нашу грамматику,*/
speechRecognitionList.addFromString(grammar, 1);  /*добавим наш grammar список*/
recognition.grammars = speechRecognitionList;
//recognition.continuous = false;
recognition.lang = 'en-US'; /*Устанавливает язык распознавания*/
recognition.interimResults = false; /*Определяет, должна ли система распознавания речи возвращать промежуточные результаты или только конечные результаты*/
recognition.maxAlternatives = 1;  /*Устанавливает количество альтернативных потенциальных совпадений, которые должны быть возвращены за каждый результат. */


/*Запуск распознавания речи*/
var diagnostic = document.querySelector('.output');
var bg = document.querySelector('html');
var hints = document.querySelector('.hints');

var colorHTML= '';
colors.forEach(function(v, i, a){  /*метод используется для вывода цветных индикаторов, показывающих, какие цвета следует использовать*/
  console.log(v, i);
  colorHTML += '<span style="background-color:' + v + ';"> ' + v + ' </span>';
});
hints.innerHTML = colorHTML + '.';

document.body.onclick = function() {
  recognition.start();  /*чтобы при нажатии или нажатии экрана запускалась услуга распознавания речи*/
  console.log('Готов принять команду.');
}


/*Получение и обработка результатов*/
recognition.onresult = function(event) {
 // Свойство результатов SpeechRecognitionEvent возвращает объект SpeechRecognitionResultList
   // Объект SpeechRecognitionResultList содержит объекты SpeechRecognitionResult.
   // У него есть геттер, поэтому он может быть доступен как массив
   // [last] возвращает значение SpeechRecognitionResult в последней позиции.
   // Каждый объект SpeechRecognitionResult содержит объекты SpeechRecognitionAlternative, которые содержат отдельные результаты.
   // Они также имеют геттеры, поэтому они могут быть доступны как массивы.
   // [0] возвращает значение SpeechRecognitionAlternative в позиции 0.
   // Затем мы возвращаем его свойство транскрипции, чтобы получить строку, содержащую индивидуальный признанный результат, в виде строки, 
  // установить цвет фона для этого цвета и сообщить цвет распознается как диагностическое сообщение в пользовательском интерфейсе.// 
  var last = event.results.length - 1;  
  var color = event.results[last][0].transcript;  

  diagnostic.textContent = 'The result: ' + color + '.'; 
  bg.style.backgroundColor = color;
  console.log('Confidence: ' + event.results[0][0].confidence);
}

recognition.onspeechend = function() {
  recognition.stop();
}


/*Обработка ошибок и непризнанной речи*/
recognition.onnomatch = function(event) {   /* обработать первый упомянутый случай, хотя обратите внимание*/
  diagnostic.textContent = "Цвет не узнан";
}

recognition.onerror = function(event) {
  diagnostic.textContent = 'Ошибка при распозновании: ' + event.error;  /*обрабатывает случаи, когда фактическая ошибка при успешном распознавании */
}