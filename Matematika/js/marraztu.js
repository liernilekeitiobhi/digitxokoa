

window.onload = function(){
    plot()
}

// Grafikoa kokatuko dugun div
let grafikoa = document.getElementById("grafikoa")

// Ardatzak
let layout = {
    xaxis: {range: [-10, 10], dtick: 1,},
    yaxis: {range: [-10, 10], dtick: 1,},
    title: "Nire funtzioa"
};

// Hasieran ardatzak hutsik jarriko ditugu
function plot(){

    
    var data = []          
      
    Plotly.newPlot(grafikoa, data, layout);
};


// Puntuak modu globalean gordeko ditugu objetu gisan
let points = {1:null, 2:null, 3:null, 4:null, 5:null, 6:null, 7:null, "erpina": null}


//klikatu ordez gainean egonda gehituko ditu puntuak
/*function over() {
    this.timeout = window.setTimeout(addPoints, 5000)
}  
function left() {
    if (this.timeout) window.clearTimeout(this.timeout)
}
function click(){
    console.log("a")
}
var btn1 = document.getElementById("1") 
var btn2 = document.getElementById("2")
var btn3 = document.getElementById("3")
var btn4 = document.getElementById("4")
var btn5 = document.getElementById("5")
var btn6 = document.getElementById("6")
var btn7 = document.getElementById("7")
btn1.addEventListener('mouseenter', over);
btn1.addEventListener('mouseleave', left);
btn2.addEventListener('mouseenter', over);
btn2.addEventListener('mouseleave', left);
btn3.addEventListener('mouseenter', over);
btn3.addEventListener('mouseleave', left);
btn4.addEventListener('mouseenter', over);
btn4.addEventListener('mouseleave', left);
btn5.addEventListener('mouseenter', over);
btn5.addEventListener('mouseleave', left);
btn6.addEventListener('mouseenter', over);
btn6.addEventListener('mouseleave', left);
btn7.addEventListener('mouseenter', over);
btn7.addEventListener('mouseleave', left);*/


/*Puntuak gehitu eta kentzeko funtzioa.
/   * Datua etorri den id-a hartuko du.
/   * Objetuan id horretan null agertzen bada puntua grafikora gehituko du.
/   * Ez bada null agertzen esan nahi du puntua jarrita dagoela, beraz kendu egingo dugu.
*/
function addPoints(id){
    console.log("a")
    //---------------
    // PUNTUA GEHITU
    //---------------
    if (points[id] == null){ 
        x = document.getElementById("x" + id).value
        y = document.getElementById("y" + id).value
        //BERMATU EZ ZAIOLA "gehitu" BOTOIARI EMAN KOORDENATUTAKO BAT SARTU GABE
        if (x.length != 0 && y.length != 0){ 
            points[id] = [x , y] //Objetuan puntua sartu tupla moduan

            //Objetutik dauzkagun puntu ez huts guztiak hartuko ditugu eta array bat sortu hauekin. [x1,y1,x2,y2,...]
            var pointsArray = []
            for (const property in points) {
                if (points[property]!=null){
                    pointsArray.push(parseFloat(points[property][0]))
                    pointsArray.push(parseFloat(points[property][1]))
                }
            }
            
            //Array horretan bildutako puntu guztiak marraztu. Hau da, puntu berri bat gehitu nahi dugun bakoitzean
            //guztiak gehituko dira berriro
            var xy = new Float32Array(pointsArray);
            data = [{ xy: xy,  type: 'pointcloud' }];
            Plotly.newPlot(grafikoa, data, layout);
            
            //Behin puntua marraztuta botoia gorriz jarriko dugu eta "gehitu" ordez "kendu" idatziko da.
            btn = document.getElementById(id)
            btn.textContent= "Kendu"
            btn.style.backgroundColor = '#ab576c';
        }
        //BI KOORDENATUTAKO BAT IDAZTEN EZ BADA EZ DIGU PUNTUA GEHITZEN UTZIKO
        else{ 
            alert("Koordenatuak gehitu behar dira!")
        }
        
    }
    //---------------
    // PUNTUA KENDU
    //---------------
    else{ 
        points[id]=null //points objetuan id hau hutsik utziko dugu berriro.

        //Berriro marraztuko ditugu puntu guztiak, kendu dugun hau marraztu gabe.
        //Horretarako array berri bat sortuko dugu points objetu berria erabiliz
        var pointsArray = []
        for (const property in points) {
            if (points[property] != null){
                pointsArray.push(parseFloat(points[property][0]))
                pointsArray.push(parseFloat(points[property][1]))
            }
        }
        var xy = new Float32Array(pointsArray);
        data = [{ xy: xy,  type: 'pointcloud' }];
        Plotly.newPlot(grafikoa, data, layout);

        //Botoia berriro ere grisa bihurtuko dugu eta "gehitu" idatziko diogu. Tartea libre geldituko da beste puntu bat id horretan gehitzeko
        btn = document.getElementById(id)
        btn.textContent= "Gehitu"
        btn.style.backgroundColor = '#6a8494';
        document.getElementById("x" + id).value = "" //Idazteko tokia hustu
        document.getElementById("y" + id).value = "" //Idazteko tokia hustu

    }
    
}

/*Behin puntuak marraztuta daudela funtzioa marraztuko dugu.
/   * Zein funtzio mota marraztu nahi den ikusiko da:
/       * selected=0 => zuzen bertikala
/       * selected=1 => zuzen horizontala
/       * selected=2 => zuzena
/       * selected=3 => parabola
*/
function draw(){
    checkbox = [document.getElementById("toggle1").checked,
        document.getElementById("toggle2").checked,
        document.getElementById("toggle3").checked,
        document.getElementById("toggle4").checked             
                ]

    var selected 
    cont = 0
    //true egoeran zein dagoen ikusiko dugu. Aldi berean, true egoeran zenbait dauden begiratu.
    for (i=0; i<=4; i++){
        if (checkbox[i] == true){
            selected = i
            cont += 1
        }
    }

    //true egoeran funtzio mota bakarra dagoela bermatu
    if (cont==1){
        if (selected == 1){ //zuzen bertikala
            var xArray = [];
            var yArray = [];
            for (const property in points) {
                if (points[property] != null){
                    xArray.push(parseFloat(points[property][0]))
                    yArray.push(parseFloat(points[property][1]))
                }
            }
            var marraztu_daiteke=true
            if (yArray.length > 1){//Konprobatu behar dugu benetan y koordenatu guztiak berdinak direla puntu bat baino gehiago sartu bada
                for (i=0; i<yArray.length-1; i++){ 
                    if (yArray[i] != yArray[i+1]){
                        alert("Punturen bat ez dago ondo!")
                        var pointsArray = []
                        for (const property in points) {
                            if (points[property] != null){
                                pointsArray.push(parseFloat(points[property][0]))
                                pointsArray.push(parseFloat(points[property][1]))
                            }
                        }
                        var xy = new Float32Array(pointsArray);
                        data = [{ xy: xy,  type: 'pointcloud' }];
                        Plotly.newPlot(grafikoa, data, layout);
                        marraztu_daiteke = false //If honetan sartu bada ez dugu nahi funtzioa marrazterik
                        break
                    }
    
                }
            }            
            
            if (marraztu_daiteke==true){
                var data = [{x: [-10,10], y: [yArray[0],yArray[0]], mode:"lines"}];
                Plotly.newPlot(grafikoa, data, layout);
            }
        }
        else if (selected == 2){ //zuzena
            //sartu diren x koordenatu guztiak array batera eta y koordenatuak beste batera
            var xArray = [];
            var yArray = [];
            for (const property in points) {
                if (points[property] != null){
                    xArray.push(parseFloat(points[property][0]))
                    yArray.push(parseFloat(points[property][1]))
                }
            }
            //malda beti berdina dela bermatuko dugu. Ez balitz ezin da zuzen hori marraztu.
            var zatiketa = parseFloat((yArray[0]-yArray[1]) / (xArray[0]-xArray[1]) )
            var marraztu_daiteke = true
    
            for (i=1; i<xArray.length-1; i++){ // banan banan joango gara konprobatzen malda mantentzen dela
                if (parseFloat((yArray[i]-yArray[i+1]) / (xArray[i]-xArray[i+1])) != zatiketa){
                    alert("Ezin da zuzen hori marraztu")
                    //Ezin bada zuzena marraztu berriro ere puntu originalak marraztuko ditugu.
                    var pointsArray = []
                    for (const property in points) {
                        if (points[property] != null){
                            pointsArray.push(parseFloat(points[property][0]))
                            pointsArray.push(parseFloat(points[property][1]))
                        }
                    }
                    var xy = new Float32Array(pointsArray);
                    data = [{ xy: xy,  type: 'pointcloud' }];
                    Plotly.newPlot(grafikoa, data, layout);
                    marraztu_daiteke = false //If honetan sartu bada ez dugu nahi funtzioa marrazterik
                    break
                }
            }
            if (marraztu_daiteke==true){
                
                if(zatiketa==0){
                    alert("Ez duzu funtzio-mota egokia aukeratu")
                }
                else{ //malda beti berdina bada, zatiketa beti berdina dela esan nahiko du
                    
                var malda = (yArray[0]-yArray[1]) / (xArray[0]-xArray[1])
                    
                    //-10 etik 10 era puntuak sortuko ditugu marra luzea marrazteko
                    xArrayPoints = []
                    yArrayPoints = []
                    for (var x = -10; x <= 10; x += 1) {
                        xArrayPoints.push(x);
                        yArrayPoints.push(malda*x-malda*xArray[0] + yArray[0]); //puntu malda ekuazioarekin 7 koordenatua aterako dugu
                    }
                    
                    //sortu ditugun puntu guzti horiek marraztuko ditugu
                    var data = [{x: xArrayPoints, y: yArrayPoints, mode:"lines"}];
                    Plotly.newPlot(grafikoa, data, layout);
                }
            }
                
        }
    
            
    
        
    }
    else{ //erabiltzaileak ez badu aukeratu ze funtzio mota marraztu nahi duen ezingo du marraztu
        alert("Funtzio mota bat aukeratu behar da!")
    }
    
}



