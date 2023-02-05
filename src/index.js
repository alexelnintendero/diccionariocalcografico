var diccionario = [];
var anotation = [];
var anotationInput = document.getElementById("anotationInput");
var lenght = 0;
var correctLenght = -1;
var input = document.getElementById("textInput");
var gameInput = document.getElementById("gameInput");
var diccionaryListCheck = [];
var diccionaryInput = [];
var targetPosition;

window.onload=function() {

  if (navigator.cookieEnabled) {
    console.log("ei, que las cuquis van");
  } 
  getDiccionary();
}


function addPress(event) {
  if (event.keyCode == 13 && input.value != "") {
    diccionario.push(input.value);
    lenght++;
    correctLenght++;
    console.log("correct " + correctLenght);

    input.value = '';
    console.log(diccionario);

    anotation.push(anotationInput.value);
    anotationInput.value = "";
    console.log(anotation);
    saveDiccionary();
  }
  if(event == 'button'){
    diccionario.push(input.value);
    lenght++;
    correctLenght++;
    console.log("correct " + correctLenght);

    input.value = '';
    console.log(diccionario);

    anotation.push(anotationInput.value);
    anotationInput.value = "";
    console.log(anotation);
    saveDiccionary();
  }
}


function nextWord(){
  console.log("nextword called");
  targetPosition++;
  if(targetPosition >= lenght)
  {
    console.log("finalizando...");
    finishGame();
  }
  else {
    speechWord(targetPosition);
  }
}


function gameInitialize(){

  setWord();
  speechWord(targetPosition);
}

function setWord(){
  targetPosition = 0;
  console.log(diccionario.lenght -1);
  console.log(targetPosition);
}

function speechWord(position){
  if(diccionario[targetPosition] != undefined){
    var msg = new SpeechSynthesisUtterance();
    var msgAnot = new SpeechSynthesisUtterance();
    msg.lang = 'es-ES';
    //msg.text = diccionario[position];
    msg.text = diccionario[targetPosition];
    msg.rate = 0.6;
    msg.volume = 1.5;
    window.speechSynthesis.speak(msg);
  } else {
    var msg = new SpeechSynthesisUtterance();
    var msgAnot = new SpeechSynthesisUtterance();
    msg.lang = 'es-ES';
    //msg.text = diccionario[position];
    msg.text = "No hay palabras";
    msg.rate = 0.6;
    msg.volume = 1.5;
    window.speechSynthesis.speak(msg);
  }
  setTimeout(() => {
    if(anotation[targetPosition] != undefined){
      msgAnot.text = anotation[targetPosition];
      msg.rate = 0.6;
      msg.volume = 1.5;
      window.speechSynthesis.speak(msgAnot);
    }
  }, 100);
  
}

function gamePress(event){
  if (event.keyCode == 13 && gameInput.value != "") {
    diccionaryInput.push(gameInput.value);
      if(gameInput.value == diccionario[targetPosition]){
      diccionaryListCheck.push("Bien");
      gameInput.value = '';
      nextWord();
    } else {
    diccionaryListCheck.push("Mal");
    gameInput.value = '';
    nextWord();
  }
  console.log(diccionaryListCheck);
  } else if (event == 'click' && gameInput.value != "") {
    diccionaryInput.push(gameInput.value);
      if(gameInput.value == diccionario[targetPosition]){
      diccionaryListCheck.push("Bien");
      gameInput.value = '';
      nextWord();
    } else {
    diccionaryListCheck.push("Mal");
    gameInput.value = '';
    nextWord();
  }
  console.log(diccionaryListCheck);
  }
}

function saveDiccionary(){

  console.log("correct lenght " + correctLenght);
  console.log("lengt-1 " + (lenght-1));


  eliminateDiccionary();
  setCookie("lenght", parseInt(correctLenght), 365);

  /*let i = 0;
  diccionario.forEach(element => {
    setCookie("diccionario" + i, element, 365)
  });*/

  for(var i = 0; i <= parseInt(correctLenght); i++){
    setCookie("diccionario" + i, diccionario[i], 365);
  }
  console.log("erase lenght " + parseInt(lenght));

  saveAnotation();
}

function getDiccionary(){
  for(let i = 0; i <= parseInt(getCookie("lenght")); i++){
    diccionario.push(getCookie("diccionario" + i));
  }
  lenght = parseInt(getCookie("lenght"))+1;
  correctLenght = parseInt(getCookie("lenght"));

  getAnotation();
}

function eliminateDiccionary(call){
  for(let i = 0; i <= 100; i++){
    eraseCookie("diccionario" + i);
  }
  eraseCookie("lenght");

  if(call == 'button'){
    eliminateAnotation();
    diccionario = [];
    anotation = [];
    lenght = 0;
    correctLenght = -1;
    saveDiccionary();
  }
}

function saveAnotation(){



  /*let i = 0;
  diccionario.forEach(element => {
    setCookie("diccionario" + i, element, 365)
  });*/

  for(let i = 0; i <= correctLenght; i++){
    setCookie("anotacion" + i, anotation[i], 365);
  }
  console.log("erase lenght " + lenght);
}

function getAnotation(){
  for(let i = 0; i <= parseInt(getCookie("lenght")); i++){
    anotation.push(getCookie("anotacion" + i));
  }
  lenght = parseInt(getCookie("lenght"))+1;
}

function eliminateAnotation(){
  for(let i = 0; i <= 100; i++){
    eraseCookie("anotacion" + i);
  }
  eraseCookie("lenght");
}

function seeDiccionary(){
  diccionario = [];
  anotation = [];
  getDiccionary();
  document.write("");
  let results = "";
  let i = 0;
  if(lenght > 0){ 
    diccionario.forEach((element) => {
      results += "<label>" + element + " (" + anotation[i] + ")</label><br>";
      i++;
    })
  } else {
    results += "<label> Vacío </label><br>";
  }
  results += "<button onclick='location.reload()'>Volver</button>"
  document.write(results);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function finishGame(){
  document.write("");
  let results = "";
  results = results + "<label>Palabra Correcta | </label><label>Palabra escrita | </label><label>Resultado</label><br><br>";
  let i = 0;
  diccionario.forEach((element) => {
    results += "<label>" + element + " | </label><label>" + diccionaryInput[i] + " | </label><label>" + diccionaryListCheck[i] + " | </label><br>"
    i++;
  })
  results += "<button onclick='location.reload()'>Volver a intentar</button>"
  document.write(results);
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    console.log(document.cookie);
  }

function getCookie(cname) {
    console.log("consiguiendo cookie")
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    console.log(decodedCookie)
    console.log(ca);
    console.log(document.cookie);
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  function eraseCookie(cname) {
    document.cookie = cname + "=" + "0" + ";" + "expires=Thu, 01-Jan-1970 00:00:01 GMT" + ";path=/";
    console.log(document.cookie);
  }