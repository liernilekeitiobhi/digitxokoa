function over() {
    this.timeout = window.setTimeout(click, 3000)
}
  
function left() {
    if (this.timeout) window.clearTimeout(this.timeout)
}

function click(){
    console.log("a")
}

var btn = document.getElementById("btn")
  
btn.addEventListener('mouseenter', over);
btn.addEventListener('mouseleave', left);