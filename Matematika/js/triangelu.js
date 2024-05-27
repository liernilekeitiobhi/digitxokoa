let canvas = document.getElementById("grafikoa");
let ctx = canvas.getContext("2d");
let t = {}

window.onload = function (){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const m = urlParams.get('mota')
    var div = document.getElementById('datuak-sartu')

    if (m == '1') {
        div.innerHTML = `
        
            <div class="btn-div">
                <ul id="alde-angelu">
                    <li>a: </li>
                    <li><input id='a' type="text" onchange="datuakGehitu('a',this.value)"></li>
                </ul>
                <ul id="alde-angelu">
                    <li>b: </li>
                    <li><input id='a' type="text" onchange="datuakGehitu('b',this.value)"></li>
                </ul>
                <ul id="alde-angelu">
                    <li>c: </li>
                    <li><input id='a' type="text" onchange="datuakGehitu('c',this.value)"></li>
                </ul>
                
                <ul id="alde-angelu">
                    <li>B: </li>
                    <li><input id='a' type="text" onchange="datuakGehitu('B',this.value)"></li>
                </ul>
                <ul id="alde-angelu">
                    <li>C: </li>
                    <li><input id='a' type="text" onchange="datuakGehitu('C',this.value)"></li>
                </ul>
            </div>
            <ul id="ekuazioak" class="form-style">
            </ul> 
        `
        marraztu1()
    }
    else if (m == '2') {
        div.innerHTML = `
        <form id="datuak-sartu">
            <div class="btn-div">
                <ul id="alde-angelu">
                    <li>a: </li>
                    <li><input type="text" onchange="datuakGehitu('a',this.value)"></li>
                </ul>
                <ul id="alde-angelu">
                    <li>b: </li>
                    <li><input type="text" onchange="datuakGehitu('b',this.value)"></li>
                </ul>
                <ul id="alde-angelu">
                    <li>c: </li>
                    <li><input type="text" onchange="datuakGehitu('c',this.value)"></li>
                </ul>
                <ul id="alde-angelu">
                    <li>d: </li>
                    <li><input type="text" onchange="datuakGehitu('d',this.value)"></li>
                </ul>
                <ul id="alde-angelu">
                    <li>h: </li>
                    <li><input type="text" onchange="datuakGehitu('h',this.value)"></li>
                </ul>
                <ul id="alde-angelu">
                    <li>A: </li>
                    <li><input type="text" onchange="datuakGehitu('A',this.value)"></li>
                </ul>                
                <ul id="alde-angelu">
                    <li>B: </li>
                    <li><input type="text" onchange="datuakGehitu('B',this.value)"></li>
                </ul>
                <ul id="alde-angelu">
                    <li>C: </li>
                    <li><input type="text" onchange="datuakGehitu('C',this.value)"></li>
                </ul>
                <ul id="alde-angelu">
                    <li>D: </li>
                    <li><input type="text" onchange="datuakGehitu('D',this.value)"></li>
                </ul>
            </div>
            <ul id="ekuazioak" class="form-style">
            </ul> 
        `
        marraztu2()
    }

    else if (m == '3') {
        div.innerHTML = `
            <div class="btn-div">
                <ul id="alde-angelu">
                    <li>x: </li>
                    <li><input type="text" onchange="datuakGehitu('x',this.value)"></li>
                </ul>
                <ul id="alde-angelu">
                    <li>y: </li>
                    <li><input type="text" onchange="datuakGehitu('y',this.value)"></li>
                </ul>
                <ul id="alde-angelu">
                    <li>z: </li>
                    <li><input type="text" onchange="datuakGehitu('z',this.value)"></li>
                </ul>
                <ul id="alde-angelu">
                    <li>A: </li>
                    <li><input type="text" onchange="datuakGehitu('A',this.value)"></li>
                </ul>
                <ul id="alde-angelu">
                    <li>B: </li>
                    <li><input type="text" onchange="datuakGehitu('B',this.value)"></li>
                </ul>
                
            </div>
            <ul id="ekuazioak" class="form-style">
            </ul> 
        `
        marraztu3()
    }
}

function datuakGehitu(et, datu) {
    t[et] = datu
    console.log(t)

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const m = urlParams.get('mota')

    if (m == '1') {
        marraztu1()
    }
    else if (m == '2') {
        marraztu2()
    }
    else if (m == '3') {
        marraztu3()
    }
}

function marraztu1 (){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#000000';
    //triangelua
    ctx.beginPath();
    ctx.moveTo(0, 500);
    ctx.lineTo(500, 500);
    ctx.lineTo(500, 100);    
    ctx.lineTo(0, 500);
    ctx.stroke(); 
    //arkuak
    ctx.beginPath();
    ctx.arc(0, 500, 50, 0,  -0.674740942, true);    
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(500, 100, 50, 0.5*Math.PI, 0.5*Math.PI + 0.896055385, false);
    ctx.stroke();
    //etiketak
    
    if (t.hasOwnProperty('a')){
        a = 'a=' + t['a']
    }
    else{
        a = 'a'
    }

    if (t.hasOwnProperty('b')){
        b = 'b=' + t['b']
    }
    else{
        b = 'b'
    }
    
    if (t.hasOwnProperty('c')){
        c = 'c=' + t['c']
    }
    else{
        c = 'c'
    }

    if (t.hasOwnProperty('B')){
        B = 'B=' + t['B']
    }
    else{
        B = 'B'
    }
    
    if (t.hasOwnProperty('C')){
        C = 'C=' + t['C']
    }
    else{
        C = 'C'
    }

    ctx.font = "25px serif";
    ctx.fillStyle = "black";
    ctx.fillText(a, 220, 280);
    ctx.fillText(b, 530, 300);
    ctx.fillText(c, 250, 530);
    ctx.fillText(B, 60, 480);
    ctx.fillText(C, 460, 180);
    
}

function marraztu2 (){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#000000';
    //triangelua
    ctx.beginPath();
    ctx.moveTo(500, 100);
    ctx.lineTo(0, 500);    
    ctx.lineTo(500, 500);
    ctx.lineTo(500, 100);
    ctx.lineTo(900, 500);
    ctx.lineTo(500, 500);
    ctx.stroke();
    //arkuak
    ctx.beginPath();
    ctx.arc(0, 500, 50, 0,  -0.674740942, true);    
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(500, 100, 50, 0.5*Math.PI, 0.5*Math.PI + 0.896055385, false);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(900, 500, 50, Math.PI, 1.25*Math.PI, false);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(500, 100, 70, Math.PI*0.5,  Math.PI*0.25, true);    
    ctx.stroke();

    //etiketak
    if (t.hasOwnProperty('a')){
        a = 'a=' + t['a']
    }
    else{
        a = 'a'
    }

    if (t.hasOwnProperty('b')){
        b = 'b=' + t['b']
    }
    else{
        b = 'b'
    }
    
    if (t.hasOwnProperty('c')){
        c = 'c=' + t['c']
    }
    else{
        c = 'c'
    }
    if (t.hasOwnProperty('d')){
        d = 'd=' + t['d']
    }
    else{
        d = 'd'
    }
    if (t.hasOwnProperty('h')){
        h = 'h=' + t['h']
    }
    else{
        h = 'h'
    }

    if (t.hasOwnProperty('A')){
        A = 'A=' + t['A']
    }
    else{
        A = 'A'
    }

    if (t.hasOwnProperty('B')){
        B = 'B=' + t['B']
    }
    else{
        B = 'B'
    }
    
    if (t.hasOwnProperty('C')){
        C = 'C=' + t['C']
    }
    else{
        C = 'C'
    }

    if (t.hasOwnProperty('D')){
        D = 'D=' + t['D']
    }
    else{
        D = 'D'
    }
    ctx.font = "25px serif";
    ctx.fillStyle = "black";
    ctx.fillText(a, 220, 280);
    ctx.fillText(b, 720, 280);
    ctx.fillText(h, 510, 340);
    ctx.fillText(c, 250, 530);
    ctx.fillText(d, 650, 530);
    ctx.fillText(A, 780, 480);
    ctx.fillText(B, 60, 480);
    ctx.fillText(C, 430, 180);
    ctx.fillText(D, 520, 200);
}

function marraztu3 (){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#000000';
    //triangelua
    ctx.beginPath();
    ctx.moveTo(0, 500);
    ctx.lineTo(900, 500);
    ctx.lineTo(900, 100);    
    ctx.lineTo(0, 500);
    ctx.stroke(); 
    ctx.beginPath();
    ctx.moveTo(900, 100);
    ctx.lineTo(500,500)
    ctx.stroke();
    //arkuak
    ctx.beginPath();
    ctx.arc(0, 500, 50, 0,  -0.41822433, true);    
    ctx.stroke();

    /*
    ctx.beginPath();
    ctx.arc(900, 100, 120, 0.5*Math.PI, 0.5*Math.PI + 1.152572, false);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(900, 100, 50, 0.75*Math.PI, 0.5*Math.PI, true);
    ctx.stroke();*/

    ctx.beginPath();
    ctx.arc(500, 500, 50, 0,  -0.25*Math.PI, true);    
    ctx.stroke();
    //etiketak
    if (t.hasOwnProperty('x')){
        x = 'x=' + t['x']
    }
    else{
        x = 'x'
    }

    if (t.hasOwnProperty('y')){
        y = 'y=' + t['y']
    }
    else{
        y = 'y'
    }
    
    if (t.hasOwnProperty('z')){
        z = 'z=' + t['z']
    }
    else{
        z = 'z'
    }
    if (t.hasOwnProperty('A')){
        A = 'A=' + t['A']
    }
    else{
        A = 'A'
    }
    if (t.hasOwnProperty('B')){
        B = 'B=' + t['B']
    }
    else{
        B = 'B'
    }

    ctx.font = "25px serif";
    ctx.fillStyle = "black";
    ctx.fillText(x, 300, 530);
    ctx.fillText(y, 700, 530);
    ctx.fillText(z, 910, 310);
    ctx.fillText(A, 80, 490);
    ctx.fillText(B, 570, 490);
}



