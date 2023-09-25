// Puntuak modu globalean gordeko ditugu objetu gisan
let points = {1:null, 2:null, 3:null, 4:null, 5:null, 6:null, 7:null}

// Funtzioa marrazteko behar diren datuak beti eguneratuta edukiko ditugu. 
// Aldaketa bat dagoen bakoitzean marraztu egingo baitugu.
// parameters = {target, data:[{},{},...], width, height,grid,xAxis,yAxis}
let parameters = {
    target: '#myFunction',
    data: [{
        points: [],
        fnType: 'points',
        graphType: 'scatter',
        color: 'red',
        width: 20
      }],
    width: 800,
    height: 800,
    grid: true,
    yAxis: {},
    xAxis: {}
  };

/*
 * GEHITU edo KENDU botoia zapaltzerakoan ejekutatuko den funtzioa. 
 * Helburua: points objektua beti eguneratuta egotea. 
 * Puntua gehituko da [x,y] moduan edo bestela null idatziko da.
*/
function addPoints(id){
    //---------------
    // PUNTUA GEHITU
    //---------------
    if (points[id] == null){ 
        console.log("Marrazten")
        x = document.getElementById("x" + id).value
        y = document.getElementById("y" + id).value
        //BERMATU EZ ZAIOLA "gehitu" BOTOIARI EMAN KOORDENATUTAKO BAT SARTU GABE
        if (x.length != 0 && y.length != 0){ 
            points[id] = [x , y] //Objetuan puntua sartu tupla moduan
            //Objetutik dauzkagun puntu ez huts guztiak hartuko ditugu eta array bat sortu hauekin. [x1,y1,x2,y2,...]
            var pointsArray = []
            parameters.data = [{
                points: [],
                fnType: 'points',
                graphType: 'scatter',
                color: 'red',
                width: 20
              }]
            
            for (const property in points) {
                if (points[property]!=null){
                    x = eval(points[property][0])
                    y = eval(points[property][1])
                    pointsArray.push(parseFloat(points[property][0]))
                    pointsArray.push(parseFloat(points[property][1]))
                    parameters.data[0].points.push([x,y])
                    parameters.data.push({fn: '(x -' + x + ')^2 + (y - ' + y + ')^2 - 0.001', fnType:'implicit', color:'red'},
                                         {fn: '(x -' + x + ')^2 + (y - ' + y + ')^2 - 0.003', fnType:'implicit', color:'red'})
                }
                
            }           
                      
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
        parameters.data = [{
            points: [],
            fnType: 'points',
            graphType: 'scatter',
            color: 'red',
            width: 20
          }]
        for (const property in points) {
            if (points[property] != null){                
                x = eval(points[property][0])
                y = eval(points[property][1])
                console.log([x,y])
                pointsArray.push(parseFloat(points[property][0]))
                pointsArray.push(parseFloat(points[property][1]))
                //puntua potoloagoa ezin denez egin, puntua eta bi zirkulu marraztuko ditugu
                parameters.data[0].points.push([x,y])
                parameters.data.push({fn: '(x -' + x + ')^2 + (y - ' + y + ')^2 - 0.001', fnType:'implicit', color:'red'},
                                         {fn: '(x -' + x + ')^2 + (y - ' + y + ')^2 - 0.003', fnType:'implicit', color:'red'})
                
            }
        }               
        
        //Botoia berriro ere grisa bihurtuko dugu eta "gehitu" idatziko diogu. Tartea libre geldituko da beste puntu bat id horretan gehitzeko
        btn = document.getElementById(id)
        btn.textContent= "Gehitu"
        btn.style.backgroundColor = '#6a8494';
        document.getElementById("x" + id).value = "" //Idazteko tokia hustu
        document.getElementById("y" + id).value = "" //Idazteko tokia hustu
    }    
    plot()
    
}

/*
 * Ditugun puntuak hartuta, kalkulatuko du ea puntu horiek dituen errodun funtzioa existitzen den. 
 * Horretarako, lehen hiru puntuei dagokien ekuazioa zein den konprobatuko dugu
 * Ondoren ea gainontzeko puntuei ekuazio hori dagokien begiratuko dugu.     
*/
function draw(){ 
    if (parameters.data[0].points < 3) {
        alert ("Sartu gutxienez hiru puntu!")
    }
    else{   
        var xArray = [];
        var yArray = [];
        for (const property in points) {
            if (points[property] != null){
                xArray.push(parseFloat(points[property][0]))
                yArray.push(parseFloat(points[property][1]))
            }
        }
        //Edozein puntuk balio digunez, zerrendan lehenengo dauden hiruak hartuko ditugu.
        x1 = xArray[0]
        y1 = yArray[0]
        x2 = xArray[1]
        y2 = yArray[1]
        x3 = xArray[2]
        y3 = yArray[2]

        /* Berez hiru puntu nahikoa dira zein erro funtzio den zehazteko 
         * y = a^x motako ekuazioan a zein den ondorioztatzeko formula:
         * a = Math.pow(y, 1/x)
        */
        
        var a = Math.pow(y1, 1/x1)

        //Gainontzeko puntuak funtzio horretakoak diren konprobatu. Ez badira, ez da marraztuko.
        var existentzia = true
        for (i=0; i<xArray.length;i++){
            console.log(a  + '^x')
            if (a!=Math.pow(yArray[i], 1/xArray[i])){
                existentzia = false
                break
            }
        }
        if (!existentzia){
            alert('Puntu horiekin ezin dut errodun ekuazio bat marraztu!')
            return false
        }        
        else{
            //Funtzioa marrazteko plot funtzioak erabiltzen duen notaziora pasako ditugu koordenatuak
            f = a  + '^x';
            //funtzioa parameters aldagaian sartuko dugu eta marraztu
            parameters.data.push({fn: f, color: 'black', graphType: 'polyline'});            
            plot();
        
        }  
    }
}




function plot() {  
  // Lehendabizi div hau garbituko dugu, marraztean bestela datu zaharrak mantentzen ditu.
  div = document.getElementById("myFunction")
  div.innerHTML = ``
  // Marraztu
  functionPlot(parameters)
}

