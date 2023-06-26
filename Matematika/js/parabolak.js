// Puntuak modu globalean gordeko ditugu objetu gisan
let points = {1:null, 2:null, 3:null, 4:null, 5:null, 6:null, 7:null, "erpina": null}

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
            return false
        }
        
    }
    //---------------
    // PUNTUA KENDU
    //---------------
    else{ 
        points[id]=null //points objetuan id hau hutsik utziko dugu berriro.

        //Berriro marraztuko ditugu puntu guztiak, kendu dugun hau marraztu gabe.
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
 * Ditugun puntuak hartuta, kalkulatuko du ea erpin hori eta puntu horiek dituen parabola existitzen den. 
 * Existitzen bada honen ekuazioa zein den kalkulatuko du. 
 * Horretarako ekuazio sistema hau sortuko da erpineko puntua (xerpina,yerpina) eta beste bat (x,y) erabiliz:
      |2*a*xerpina+b=0
      |a*xerpina^2+b*xerpina+c=yerpina
      |a*x^2+b*x+c=y
 * solve() funtzioarekin a, b eta c koordenatuak kalkulatuko dira.      
*/
function draw(){ 
    if (points['erpina'] != null){
        var xArray = [];
        var yArray = [];
        for (const property in points) {
            if (property == "erpina"){
                xerpina = parseFloat(points[property][0])
                yerpina = parseFloat(points[property][1])
            }
            else if (points[property] != null){
                xArray.push(parseFloat(points[property][0]))
                yArray.push(parseFloat(points[property][1]))
            }
        }
        //Edozein puntuk balio digunez, zerrendan lehenengo dagona hartuko dugu.
        x = xArray[0]
        y = yArray[0]

        /*erpina erabiliz deribatua puntu horretan 0-ra berdinduko dugu
        *erpina erabiliz funtzioa ebaluatuko dugu puntu horretan
        *puntu gehigarri bat erabiliz funtzioa ebaluatuko dugu puntu horretan

        *Honek 3 ezezagunetako 3 ekuazio sortuko dizkigu ->A matrizea
                                                         ->V ekuazio sistemako eskuin zutabea
        */
        A = [[2*xerpina, 1,0],[xerpina*xerpina,xerpina,1],[x*x,x,1]]
        V = [0,yerpina,y]
        emaitza = solve(A,V) //parabolaren koordenatuak izango dira

        //Gainontzeko puntuak parabola horretakoak diren konprobatu. Ez badira, ez da marraztuko.
        existentzia = true
        for (i=1; i<=7;i++){ // 1.puntua ez dugu konprobatuko ekuazioa berekin osatu baitugu.
            if (points[i]!=null){
                x = eval(points[i][0])
                y = eval(points[i][1])
                ev = eval(emaitza[0])*x*x+eval(emaitza[1])*x+eval(emaitza[2])
                if (ev != y){            
                    existentzia = false
                    break
                }
            }
        }
        //parabola existitzen bada marraztu
        if (existentzia == false){
            alert('Ez da existitzen puntu horiek dituen parabola!')
            return false
        }
        else if(parameters.data[0].points.length < 3){
            alert('Sartu gutxienez erpina eta beste bi puntu!')
            return false
        }
        else{
            //Funtzioa marrazteko plot funtzioak erabiltzen duen notaziora pasako ditugu koordenatuak
            f = emaitza[0]+'x^2 + (' + emaitza[1] + ')x + (' + emaitza[2] + ')'
            
            //funtzioa parameters aldagaian sartuko dugu eta marraztu
            parameters.data.push({fn: f, color: 'black'});
            
            plot()
            
        }

        
    }
    else{
        alert('Erpinik gabe ezin dut parabola bat marraztu!')
        return false
    }
    
}




function plot() {  
  // Lehendabizi div hau garbituko dugu, marraztean bestela datu zaharrak mantentzen ditu.
  div = document.getElementById("myFunction")
  div.innerHTML = ``
  // Marraztu
  functionPlot(parameters)
}




///-----------------------------------------------------------------------------------------------------------------------------///
///--------------------------------------------------SOLUCIÓN DE SISTEMAS DE ECUACIONES 3x3-------------------------------------///
///-----------------------------------------------------------------------------------------------------------------------------///


//Cálculo del determinante de una matriz A(3x3)
function det(A) {

	/*
		        |a b c|
		Sea A = |d e f|
		        |g h i|
		entonces det(A) = aei + bfg + cdh - ceg - afh - bdi
		Considerando:
			a = A[0][0], b = A[0][1], c = A[0][2]
			d = A[1][0], e = A[1][1], f = A[1][2]
			g = A[2][0], h = A[2][1], i = A[2][2]
	*/

	var result = 0; //valor total del determinante
	for(var i = 0; i < 3; i++) { 
	/*
		i  indica la diagonal actual que se está multiplicando.
		v1 indica el producto de los valores de la diagonal i que va de izquierda-arriba hacia derecha-abajo
		v2 indica el producto de los valores de la diagonal i que va de derecha-arriba hacia izquierda-abajo
		si i = 0:
			v1 = aei
			v2 = ceg
		si i = 1:
			v1 = bfg
			v2 = afh
	*/
		var v1 = 1; 
		var v2 = 1;
		for(var j = 0; j < 3; j++) {
			//Se realiza la multiplicación de los valores de las diagonales.
			v1 *= A[j][(i + j) % 3];
			v2 *= A[j][2 - (i + j) % 3];
		}
		//Se suman los productos de las diagonales
		result += v1 - v2;
	}
	return result;
};

//Devuelve una copia de la matriz A
function copy(A) {
	//crea un vector _ de 3x1
	var _ = new Array(3);
	//Recorrer cada fila de _
	for(var i = 0; i < 3; i++) {
		_[i] = new Array(3); //Cada fila de _ tiene tres elementos
		for(var j = 0; j < 3; j++) {
			_[i][j] = A[i][j]; //Cada elemento i,j de _ se iguala al valor del elemento i,j de A
		}
	}
	return _;
}
//Reemplaza los valores de la j-ésima columna de A(3x3) por el vector V(3x1).
//NOTA: NO se modifica la matriz original, sino que se devuelve una copia modificada.
function row(A, j, v) {
	var _ = copy(A); //crear copia de A
	for(var i = 0; i < 3; i++) {
		//Se reemplaza el elemento i de cada fila de A, por el elemento i del vector v.
		_[i][j] = v[i];
	}
	return _;
}

//Resuelve un sistema de ecuaciones dado por una matriz 3x3 con coeficientes 
//y un vector 3x1 con los valores independientes usando la regla de Cramer
function solve(mat, val) {
	var detA = det(mat); //determinante de la matriz de coeficientes
	var Aj, detAj;

	var res = new Array(3); //vector de resultados
	for(var i = 0; i < 3; i++) {
		//matriz A en donde la i-ésima columna se ha reemplazado por el vector de valores independientes
		Aj = row(copy(mat), i, val); 
		//determinante de Aj
		detAj  = det(  Aj  );
		//Solución i
		res[i] = detAj / detA;
	}

	return res;
}




