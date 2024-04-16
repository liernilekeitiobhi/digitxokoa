// Puntuak modu globalean gordeko ditugu objetu gisan
let points = {1:null, 2:null, 3:null, 4:null, 5:null, 6:null, 7:null, "xAsint": null,"yAsint": null}

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
    if (points[id]==null){
        if (id=='xAsint'){
            x = document.getElementById(id).value
            if (x.length != 0){
                points[id]=x
                btn = document.getElementById(id+'ota')
                btn.textContent= "Kendu"
                btn.style.backgroundColor = '#ab576c';
            }
            else{
                alert('Asintota bertikala non den esan behar da!')
                return false
            }            
        }
        /*else if (id=='yAsint'){
            y = document.getElementById(id).value
            if(y.length!=0){
                points[id]=y
                btn = document.getElementById(id+'ota')
                btn.textContent= "Kendu"
                btn.style.backgroundColor = '#ab576c';
            }
            else{
                alert('Asintota horizontala non den esan behar da!')
                return false
            }                
        }*/
        else{
            x = document.getElementById("x" + id).value
            y = document.getElementById("y" + id).value     
            //BERMATU EZ ZAIOLA "gehitu" BOTOIARI EMAN KOORDENATUTAKO BAT SARTU GABE
            if (x.length != 0 && y.length != 0){ 
                points[id] = [x , y] //Objetuan puntua sartu tupla moduan  
                //Behin puntua marraztuta botoia gorriz jarriko dugu eta "gehitu" ordez "kendu" idatziko da.
                btn = document.getElementById(id)
                btn.textContent= "Kendu"
                btn.style.backgroundColor = '#ab576c';
            }
            //BI KOORDENATUTAKO BAT IDAZTEN EZ BADA EZ DIGU PUNTUA GEHITZEN UTZIKO
            else{ 
                alert("Koordenatuak gehitu behar dira!")
                return false
            }

        }

        //Puntu berri bat edo asintota bat gehitzen dugun bakoitzean, parameters.data hustu eta berriro beteko dugu points
        //objektuko datuen gainean iteratuz. 
        parameters.data = [{
            points: [],
            fnType: 'points',
            graphType: 'scatter',
            color: 'red',
            width: 20
        }]
                              
        for (const property in points) {
            if (property=='xAsint' && points[property]!=null){
                x = eval(points['xAsint'])
                parameters.data.push({fn: x + '-x', fnType: 'implicit', color: 'green'});
            }
            else if (property=='yAsint' && points[property]!=null){
                y = eval(points['yAsint'])
                parameters.data.push({fn: 'y=' + y, color: 'green'});
            }
            else if(points[property]!=null){
                x = eval(points[property][0])
                y = eval(points[property][1])
                parameters.data[0].points.push([x,y])
                parameters.data.push({fn: '(x -' + x + ')^2 + (y - ' + y + ')^2 - 0.001', fnType:'implicit', color:'red'},
                                    {fn: '(x -' + x + ')^2 + (y - ' + y + ')^2 - 0.003', fnType:'implicit', color:'red'})
            }
        } 
    }
    //---------------
    // PUNTUA KENDU
    //---------------
    else{ 
        points[id]=null //points objetuan id hau hutsik utziko dugu berriro.

        //Berriro marraztuko ditugu puntu guztiak, kendu dugun hau marraztu gabe.
        //parameters.data hustu eta berriro beteko dugu points
        //objektuko datuen gainean iteratuz. 
        parameters.data = [{
            points: [],
            fnType: 'points',
            graphType: 'scatter',
            color: 'red',
            width: 20
        }]
                              
        for (const property in points) {
            if (property=='xAsint' && points[property]!=null){
                x = eval(points['xAsint'])
                parameters.data.push({fn: x + '-x', fnType: 'implicit', color: 'green'});
            }
            else if (property=='yAsint' && points[property]!=null){
                y = eval(points['yAsint'])
                parameters.data.push({fn: 'y=' + y, color: 'green'});
            }
            else if(points[property]!=null){
                x = eval(points[property][0])
                y = eval(points[property][1])
                parameters.data[0].points.push([x,y])
                parameters.data.push({fn: '(x -' + x + ')^2 + (y - ' + y + ')^2 - 0.001', fnType:'implicit', color:'red'},
                                    {fn: '(x -' + x + ')^2 + (y - ' + y + ')^2 - 0.003', fnType:'implicit', color:'red'})
            }
        }                
        
        //Botoia berriro ere grisa bihurtuko dugu eta "gehitu" idatziko diogu. Tartea libre geldituko da beste puntu bat id horretan gehitzeko
        //Idazteko tokia hustu
        if (id=='xAsint' || id=='yAsint'){
            btn = document.getElementById(id+'ota')
            btn.textContent= "Gehitu"
            btn.style.backgroundColor = '#6a8494'; 
            document.getElementById(id).value = ""
        }
        else{   
            btn = document.getElementById(id)
            btn.textContent= "Gehitu"
            btn.style.backgroundColor = '#6a8494';         
            document.getElementById("x" + id).value = "" 
            document.getElementById("y" + id).value = "" 
        }
    }
    plot()
    
}

/*
 * Ditugun puntuak hartuta, kalkulatuko du ea asintota horiekin eta puntu horiekin alderantzizko funtziorik badagoen
 * Hau y = c+ a/x+b formakoa dela suposatuko dugu.
 * Beraz, badakigu asintota horizontala y=c izango dela eta asintota horizontala x=-b
 * Hori jakinda a bilatuko dugu.    
*/
function draw(){ 
    if (points['xAsint'] != null /*&& points['yAsint'] != null*/){
        var xArray = [];
        var yArray = [];
        for (const property in points) {
            if (points[property] != null && property!='xAsint' && property!='yAsint'){
                xArray.push(parseFloat(points[property][0]))
                yArray.push(parseFloat(points[property][1]))
            }
        }
        if (xArray.length>1 && yArray.length>1){
            //Lehen puntuarekin kalkulatuko dugu a.
            y = eval(yArray[0])
            c = eval(points['yAsint'])
            x = eval(xArray[0])
            b = (-1) * eval(points['xAsint'])
            a = (y-c)*(x+b)
        }
        else{
            alert('Sartu gutxienez bi puntu!')
            return false
        }
        
    }
    else{
        alert('Asintotaren bat falta da!')
        return false
    }

    //Hemendik aurrera gure funtzioa  y = c+ a/x+b da.
    //Konprobatu dezagun ea gainontzeko puntuak ere funtzio horretakoak direla.
    //Hala bada, marraztu egingo dugu.
    existentzia = true
    for (i=0;i<xArray.length;i++){
        if (yArray[i]!=c+a/(xArray[i]+b)){
            existentzia=false
            break
        }
    }
    
    if (existentzia == false){
        alert('Ez da existitzen puntu horiek dituen alderantzizko funtziorik!')
        return false
    }
    else{
        //Funtzioa marrazteko plot funtzioak erabiltzen duen notaziora pasako ditugu koordenatuak
        f = c + '+' + a + '/(x+' + b + ')'        
        //funtzioa parameters aldagaian sartuko dugu eta marraztu
        parameters.data.push({fn: f, color: 'black'});        
        plot()        
    }
    
}




function plot() {  
  // Lehendabizi div hau garbituko dugu, marraztean bestela datu zaharrak mantentzen ditu.
  div = document.getElementById("myFunction")
  div.innerHTML = ``
  // Marraztu
  functionPlot(parameters)
}




