var startTime, endTime;


function handlerIn() {
  startTime = new Date();
}

function klik(id) {
  endTime = new Date();
  var timeDiff = endTime - startTime; 
  a = document.getElementById(id)
  if (timeDiff>800){$(a).click()}
}

function berbideratu(id){
    window.location='./funtzioak.html'
}