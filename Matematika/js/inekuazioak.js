let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");



let ekuazioak = {}
let tarteak = {1:[],2:[]}
let puntuak = {1:{1:null,2:null},2:{1:null,2:null}}
// Ekuazio kopuru osoa
let ekuazioKopurua = 0

// Ekuazioa gehituko du ezker menura eta eskuinean marra hutsa marraztu
function ekuazioaGehitu() { 
    console.log('a')   
    div = document.getElementById("ekuazioak")
    ekuazioKopurua += 1
    div.innerHTML  += `
        <table>
            <tr>
                <td rowspan="3" style="border-right: dashed; border-bottom: solid;"><p>${ekuazioKopurua}.EKUAZIOA</p></td>
                <td>
                    <ul>
                        <li><input id="${ekuazioKopurua}1" type="text"></li>
                        <li><button id="b${ekuazioKopurua}1" type="button" onmouseenter="handlerIn()" onmouseleave="klik(id)" onclick=txuriBeltz(${ekuazioKopurua},1,"b")></button></li>
                        <li><button id="t${ekuazioKopurua}1" type="button" onmouseenter="handlerIn()" onmouseleave="klik(id)" onclick=txuriBeltz(${ekuazioKopurua},1,"t")></button></li>
                        <li><button id="gehitu${ekuazioKopurua}1" type="button" onmouseenter="handlerIn()" onmouseleave="klik(id)" onclick=datuakGehitu(${ekuazioKopurua},1)>+</button></li>
                    </ul>
                </td>
            </tr>
            <tr>
                <td>
                    <ul>
                    <li><input id="${ekuazioKopurua}2" type="text"></li>
                    <li><button id="b${ekuazioKopurua}2" type="button" onmouseenter="handlerIn()" onmouseleave="klik(id)" onclick=txuriBeltz(${ekuazioKopurua},2,"b")></button></li>
                    <li><button id="t${ekuazioKopurua}2" type="button" onmouseenter="handlerIn()" onmouseleave="klik(id)" onclick=txuriBeltz(${ekuazioKopurua},2,"t")></button></li>
                    <li><button id="gehitu1${ekuazioKopurua}1" type="button" onmouseenter="handlerIn()" onmouseleave="klik(id)" onclick=datuakGehitu(${ekuazioKopurua},2)>+</button></li>
                </ul>
                </td>
            </tr>
            <tr>
                <td style="border-bottom: solid;">
                    <ul id=tarteak${ekuazioKopurua}>
                        <li><button id="${ekuazioKopurua}-1" type="button" onmouseenter="handlerIn()" onmouseleave="klik(id)" onclick=tarteEgoeraAldatu(${ekuazioKopurua},1)>1.tartea</button></li>
                    </ul>
                </td>
            </tr>
        </table> 
        
    `    
    ekuazioak[ekuazioKopurua] = {}
    for (ekuazio in ekuazioak){
        for (puntu in ekuazioak[ekuazio]){
            var textValue = document.getElementById(ekuazio + puntu)
            textValue.value = ekuazioak[ekuazio][puntu][0]
            console.log("ekuazioa: " + ekuazio)
            console.log("puntua: " + puntu)
        }
    }
    marraztu()
}

// Puntu bakoitza txuria ala beltza den adieraziko du. Hau puntuak hiztegian gordeta utziz
function txuriBeltz(ekuazio,puntu,mota) {
    var s = mota + ekuazio.toString() + puntu.toString()
    var btn = document.getElementById(s)
    if (mota == "b") {
        var t = "t" + ekuazio.toString() + puntu.toString() 
        t = document.getElementById(t)
        puntuak[ekuazio][puntu] = "b"
        btn.style.backgroundColor = "rgb(0, 0, 0)"
        t.style.borderColor = "rgb(217, 217, 217)"
    }
    else if (mota == "t") {
        var b = "b" + ekuazio.toString() + puntu.toString()
        b = document.getElementById(b)
        puntuak[ekuazio][puntu] = "t"
        b.style.backgroundColor = "rgb(217, 217, 217)"
        btn.style.borderColor = "black"
    }
}

// ekuazioak hiztegia eguneratzen du
function datuakGehitu(ekuazio, puntu) {
    

    s = ekuazio.toString() + puntu.toString()
    var x = document.getElementById(s).value
    mota = puntuak[ekuazio][puntu]
    ekuazioak[ekuazio][puntu] = [x,mota]
    tarteaEguneratu(ekuazio)     
    
    marraztu()
}

// Zenbaki bat zenbaki bat dela egiaztatzen duen funtzioa
function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

// tartea eguneratuko dugu
function tarteaEguneratu(ekuazio) {
    // ekuazio bakoitzak duen puntu kopuruak tarte kopurua baldintzatuko du.
    if (ekuazio =="1"){
        //1.ekuazioa
        var pKop = 0
        try {
            p = []
            for (puntu in ekuazioak["1"]){
                puntua = ekuazioak["1"][puntu][0]
                if (puntua != " " && puntua != "" && isNumeric(eval(puntua))==true){
                    pKop += 1
                    p.push(eval(puntua))
                }
            }
            p.sort()
            

            var tarteDiv = document.getElementById("tarteak1")
            if (pKop == 0){
                tarteDiv.innerHTML = `
                <ul id=tarteak1>
                    <li><button style="width:540px;" id="1-1" type="button" onmouseenter="handlerIn()" onmouseleave="klik(id)" onclick=tarteEgoeraAldatu(1,1)>1.tartea</button></li>
                </ul>`
                tarteak["1"] = [-10,10,0]
                
            } 
            if (pKop == 1){
                tarteDiv.innerHTML = `
                <ul id=tarteak1>
                    <li><button style="width:270px;" id="1-1" type="button" onmouseenter="handlerIn()" onmouseleave="klik(id)" onclick=tarteEgoeraAldatu(1,1)>1.tartea</button></li>
                    <li><button style="width:270px;" id="1-2" type="button" onmouseenter="handlerIn()" onmouseleave="klik(id)"  onclick=tarteEgoeraAldatu(1,2)>2.tartea</button></li>
                </ul>`
                tarteak["1"] = [[-10,p[0],0],[p[0],10,0]]
                
            }    
            if (pKop == 2){
                tarteDiv.innerHTML = `
                <ul id=tarteak1>
                    <li><button style="width:180px;" id="1-1" type="button" onmouseenter="handlerIn()" onmouseleave="klik(id)" onclick=tarteEgoeraAldatu(1,1)>1.tartea</button></li>
                    <li><button style="width:180px;" id="1-2" type="button" onmouseenter="handlerIn()" onmouseleave="klik(id)" onclick=tarteEgoeraAldatu(1,2)>2.tartea</button></li>
                    <li><button style="width:180px;" id="1-3" type="button" onmouseenter="handlerIn()" onmouseleave="klik(id)" onclick=tarteEgoeraAldatu(1,3)>3.tartea</button></li>
                </ul>`
                tarteak["1"] = [[-10,p[0],0],[p[0],p[1],0],[p[1],10,0]]
            }
        } catch (error) {
            console.log("Ez dago punturik 1.ekuazioan")
        }
    }
    else if (ekuazio == "2"){
        // 2.ekuazioa
        var pKop = 0
        try {
            p = []
            var tarteDiv = document.getElementById("tarteak2")
            for (puntu in ekuazioak["2"]){
                puntua = ekuazioak["2"][puntu][0]
                if (puntua != " " && puntua != "" && isNumeric(eval(puntua))==true){
                    pKop += 1
                    p.push(eval(puntua))
                }
            }
            p.sort()
            if (pKop == 0){
                tarteDiv.innerHTML = `
                <ul id=tarteak2>
                    <li><button style="width:540px;" id="2-1" type="button" onmouseenter="handlerIn()" onmouseleave="klik(id)"  onclick=tarteEgoeraAldatu(2,1)>1.tartea</button></li>
                </ul>`
                tarteak["2"] = [-10,10,0]
            } 
            if (pKop == 1){
                tarteDiv.innerHTML = `
                <ul id=tarteak2>
                    <li><button style="width:270px;" id="2-1" type="button" onmouseenter="handlerIn()" onmouseleave="klik(id)" onclick=tarteEgoeraAldatu(2,1)>1.tartea</button></li>
                    <li><button style="width:270px;" id="2-2" type="button" onmouseenter="handlerIn()" onmouseleave="klik(id)" onclick=tarteEgoeraAldatu(2,2)>2.tartea</button></li>
                </ul>`
                tarteak["2"] = [[-10,p[0],0],[p[0],10,0]]
            }    
            if (pKop == 2){
                tarteDiv.innerHTML = `
                <ul id=tarteak2>
                    <li><button style="width:180px;" id="2-1" type="button" onmouseenter="handlerIn()" onmouseleave="klik(id)" onclick=tarteEgoeraAldatu(2,1)>1.tartea</button></li>
                    <li><button style="width:180px;" id="2-2" type="button" onmouseenter="handlerIn()" onmouseleave="klik(id)" onclick=tarteEgoeraAldatu(2,2)>2.tartea</button></li>
                    <li><button style="width:180px;" id="2-3" type="button" onmouseenter="handlerIn()" onmouseleave="klik(id)" onclick=tarteEgoeraAldatu(2,3)>3.tartea</button></li>
                </ul>`
                tarteak["2"] = [[-10,p[0],0],[p[0],p[1],0],[p[1],10,0]]
            }
        } catch (error) {
            console.log("Ez dago punturik 2.ekuazioan")
        }    
    }    
}

//tarteak hiztegia eguneratuko du eta ikusten den kolorea aldatu
function tarteEgoeraAldatu(ekuazio, tarte) {
    var t = document.getElementById(ekuazio + "-" + tarte)
    if (tarteak[ekuazio][parseInt(tarte)-1][2] == 0){
        t.style.backgroundColor = "rgb(92, 207, 98)"
        tarteak[ekuazio][parseInt(tarte)-1][2] = 1
    }
    else if(tarteak[ekuazio][parseInt(tarte)-1][2] == 1) {
        t.style.backgroundColor = "rgb(177, 91, 85)"
        tarteak[ekuazio][parseInt(tarte)-1][2] = 0
    }
    marraztu()
}

// ekuazioak hiztegikoa hartu eta marraztu egiten du
function marraztu(){
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.lineWidth = 3;
    for (i=1; i<=ekuazioKopurua; i++){
        ctx.strokeStyle = '#000000';
        ctx.beginPath();
        ctx.moveTo(0, 150*i);
        ctx.lineTo(600, 150*i);
        ctx.stroke(); 
    }

    for (ekuazio in tarteak){
        tarteZerrenda = tarteak[ekuazio]
        
        for (i=0;i<tarteZerrenda.length;i++){
            tarte = tarteak[ekuazio][i]
            if (tarte[2] == "1"){
                p1 = tarte[0]
                p2 = tarte[1]

                ctx.beginPath();
                ctx.lineWidth = 9;
                ctx.strokeStyle = '#009933';
                ctx.moveTo(300 + p1*30, 150*parseInt(ekuazio));
                ctx.lineTo(300 + p2*30, 150*parseInt(ekuazio));
                ctx.stroke();
            }
        }
    }

    for (ekuazio in ekuazioak) {        
        ekuazioa = ekuazioak[ekuazio]
        for (puntu in ekuazioa) {
            etiketa = ekuazioa[puntu][0]
            try{
                var x = eval(etiketa)
            }catch (error){
                alert("Ez dakit " + etiketa + " zuzenean kokatzen.")
            }
            
            var mota = ekuazioa[puntu][1]
            ekuazio = parseInt(ekuazio)
            x_ = 300 + x*30
            y = 150*ekuazio
            if (mota == "b") {
                zirkuluBeltza (x_, y)
                etiketatu (x_,y, etiketa)
            }
            if (mota == "t") {
                zirkuluTxuria (x_, y)
                etiketatu (x_,y, etiketa)
            }
        }
    } 
    
    if (soluzioa.length > 0) {
        ctx.strokeStyle = '#000000';
        ctx.beginPath();
        ctx.moveTo(0, 450);
        ctx.lineTo(600, 450);
        ctx.stroke();
        
        for (i=0;i<tarteakSoluzioa.length;i++){
            tarte = tarteakSoluzioa[i]
            if (tarte[2] == "1"){
                p1 = tarte[0]
                p2 = tarte[1]

                ctx.beginPath();
                ctx.lineWidth = 11;
                ctx.strokeStyle = '#22d4a4';
                ctx.moveTo(300 + p1*30, 450);
                ctx.lineTo(300 + p2*30, 450);
                ctx.stroke();
            }
        }
        for (i=0; i<soluzioa.length; i++){
            x = soluzioa[i][0]
            mota = soluzioa[i][2]
            if (mota=="b"){
                zirkuluBeltza(300 + eval(x)*30,450)
                etiketatu(300 + eval(x)*30,450,soluzioa[i][1])
            }
            if (mota=="t"){
                zirkuluTxuria(300 + eval(x)*30,450)
                etiketatu(300 + eval(x)*30,450,soluzioa[i][1])
            }
        }
    
    }
}

// Zirkulu txuria marrazteko
function zirkuluTxuria (zentroa_x, zentroa_y) {
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 3; 
    ctx.beginPath();
    ctx.arc(zentroa_x, zentroa_y, 8, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = "white";
    ctx.fill(); 
}

//zirkulu beltza marrazteko
function zirkuluBeltza (zentroa_x, zentroa_y) {
    ctx.beginPath();
    ctx.strokeStyle = '#000000';
    ctx.arc(zentroa_x, zentroa_y, 8, 0, 2 * Math.PI);
    ctx.fillStyle = "black";
    ctx.fill();
}

//puntu bakoitzari dagokion zenbakia idatziko dio alboan
function etiketatu (zentroa_x, zentroa_y, balioa) {
    ctx.font = "18px serif";
    ctx.fillStyle = "black";
    ctx.fillText(balioa, zentroa_x, zentroa_y-10);
}


// ----------------- SOLUZIOA ------------------------ //

let soluzioa = []
let puntuakSoluzioa = []
let tarteakSoluzioa = []

function soluzioaGehitu(){  
    console.log(ekuazioak)
    soluzioa = []
    puntuakSoluzioa = [] 
    for (ekuazio in ekuazioak) {        
        ekuazioa = ekuazioak[ekuazio]
        for (puntu in ekuazioa) {
            etiketa = ekuazioa[puntu][0]
            try{
                var x = eval(etiketa)
                if  (puntuakSoluzioa.includes(x)){
                    for (i=0; i<soluzioa.length; i++){
                        if (soluzioa[i][0]==x){
                            if (soluzioa[i][2] == "t" | ekuazioa[puntu][1] == "t"){
                                soluzioa[i][2] = "t"
                            }
                        }
                    }
                }else{
                    if (etiketa != "" & etiketa != " "){
                        soluzioa.push([x,etiketa,ekuazioa[puntu][1]])
                        puntuakSoluzioa.push(x)
                        puntuakSoluzioa.sort()
                    }                    
                }
            }catch (error){
                alert("Ez dakit " + etiketa + " zuzenean kokatzen.")
            }
        }
    }
    console.log(soluzioa)
    tarteakSortu()
}

function tarteakSortu(){
    tarteakSoluzioa = []
    if (puntuakSoluzioa.length == 0) {
        alert("Ez dago punturik!")
    }
    tarteakSoluzioa.push([-10,puntuakSoluzioa[0],0])
    for (i=0; i<puntuakSoluzioa.length-1; i++){
        tarteakSoluzioa.push([puntuakSoluzioa[i],puntuakSoluzioa[i+1],0],)
    }
    tarteakSoluzioa.push([puntuakSoluzioa[puntuakSoluzioa.length-1],10,0])

    var div = document.getElementById("soluzioa")
    tKop = tarteakSoluzioa.length

    w = 500/tKop

    div.innerHTML = ``
    for (i=0; i<tarteakSoluzioa.length; i++){
        div.innerHTML += `<li><button style="width:${w}px;" id="${i+1}" type="button" onmouseenter="handlerIn()" onmouseleave="klik(id)" onclick=tarteakSoluzioaEguneratu(${i+1})>${i+1}.tartea</button></li>
        `
    }
    console.log(tarteakSoluzioa)
    marraztu()
}

function tarteakSoluzioaEguneratu(t){
    btn = document.getElementById(t)
    t = parseInt(t)
    if (tarteakSoluzioa[t-1][2]=="1") {
        btn.style.backgroundColor = "rgb(177, 91, 85)"
        tarteakSoluzioa[t-1][2]=0
    }
    else if (tarteakSoluzioa[t-1][2]=="0") {
        btn.style.backgroundColor = "rgb(92, 207, 98)"
        tarteakSoluzioa[t-1][2]=1
    }
    marraztu()

}

function kopiatu(){
    //Grafikoa dagoen div identifikatu
    //div = document.getElementById("grafikoa"
    console.log("bai")

    var domNode = document.getElementById('myCanvas');
	
	// copy the canvas to the clipboard with chrome's CliboardItem API
	// https://developers.google.com/web/updates/2019/07/image-support-for-async-clipboard#images
	html2canvas(domNode).then(function(canvas) {
		canvas.toBlob(function(blob) {
			navigator.clipboard
				.write([
				new ClipboardItem(
					Object.defineProperty({}, blob.type, {
						value: blob,
						enumerable: true
					})
				)
			])
				.then(function() {
				alert("Funtzioaren grafika kopiatu da!");
			});
		});
    })    
}



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







