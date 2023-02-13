let fraseEntera = {}
var frase = document.getElementById("frase").value
let arr = frase.split(/, | /); 
let arbol = {1:{},2:{},3:{},4:{},5:{},6:{}}


/*----------------------------------------------------------------------------------------------
 *escribirFrase()
 *Esaldia hartuko du inputetik eta azpian idatziko du hitz bakoitza botoi bihurtuz.
-----------------------------------------------------------------------------------------------*/

function escribirFrase(){
    var frase = document.getElementById("frase").value
    var arr = frase.split(/, | /); /*koma eta espazioak lista sortzeko*/
    console.log(arr)
    k=1
    // Hitz bakoitza botoi bihurtu id=c-<hitzaren posizioa> (1etik hasita) eta taula bateko lehen lerroan jarri
    // Horretaz gain fraseEntera hiztegia sortuko da, hitz bakoitza zapalduta dagoen edo ez jakiteko (true,false)
    arr.forEach(element => {
        console.log(element)
        fraseEntera[k] = false
        var t = document.getElementById("frase-tabla")
        t.innerHTML += `<th><button id=c-${k} type="button" onclick="cambiarBolean(${k})">${element}</button></th>`    
        k+=1
        
    });

    /*Taula bat sortuko da. Lehen lerroa esaldia bera izango da. Lehen zutabea zenbakiak izango dira (1,2,3,4,5,6)
    eta ondoren zutabe hutsak*/

    /*Horretaz gain, arbol izeneko hiztegi bat sortuko da. Bertan etengabe arbolaren egitura gordetzen joango gara.
    arbol[lerroa][zutabea] izango da matritzearen egitura. Koordenatu bakoitzean bertako egoera agertuko da
    [zerbait idatzita ote dagoen(boolean), zeinekin batera aukeratu den(array), zer dago idatzita(string)]*/
    for(j=1; j<=6; j++){     
        fila = document.getElementById(j)
        fila.innerHTML = `<td>${j}</td>`
        for (i=0; i<arr.length; i++){
            fila.innerHTML += `<td></td>`
            arbol[j][i+1]=[false,[],' ']
        }
        
    }
    console.log(arbol)
}


/*----------------------------------------------------------------------------------------------*/
/*funtzio sintaktiko berri bat sartzeko erabiltzaileak esaldiko botoiak zapaldu behar ditu. Zapalduta daudenak
true bezala agertu beharko dira fraseEntera hiztegian*/
/*----------------------------------------------------------------------------------------------*/

function cambiarBolean(k) {    
    btn = document.getElementById('c-'+k)
    if (fraseEntera[k] == true) { //Zapalduta badago eta erabiltzaileak deselekzionatu egin nahi badu
        fraseEntera[k] = false
        btn.style.backgroundColor = 'rgb(237, 237, 237)'
        btn.style.color = '#000'
    }

    else if(fraseEntera[k] == false) { //Zapaldu gabe badago eta erabiltzaileak selekzionatu egin nahi badu
        fraseEntera[k] = true
        btn.style.backgroundColor = 'rgb(63, 63, 63)'
        btn.style.color = '#fff'
    }
    console.log(fraseEntera)
}


/*----------------------------------------------------------------------------------------------*/
/*Funtzio sintaktiko berri bat sartzen den bakoitzean guztia berrezarriko da hasieran bezala. Guztia aukeratu gabe eta idazteko
input laukixoak hutsik*/
/*----------------------------------------------------------------------------------------------*/

function deseleccion(k) {    
    btn = document.getElementById('c-'+k)
    fraseEntera[k] = false
    btn.style.backgroundColor = 'rgb(237, 237, 237)'
    btn.style.color = '#000'

    input = document.getElementById("forma-sintactica")
    input.value=""

    input = document.getElementById("nivel-arbol")
    input.value=""
}


/*----------------------------------------------------------------------------------------------*/
/*arbol hiztegian informazioa sartuko da, ondoren hiztegi honetatik arbola marrazteko*/
/*----------------------------------------------------------------------------------------------*/

function anadirInformacionArbol(){
    fs = document.getElementById('forma-sintactica').value
    na = document.getElementById('nivel-arbol').value
    seleccion = []
    // fraseEnteran zapalduta zein dauden gorde dugunez, hauek seleccion izeneko array batean gordeko ditugu
    for (var key in fraseEntera) {
        if (fraseEntera[key]==true){
            seleccion.push(key)
        }
    }
    // arbol[lerro][zutabe] koordenatuan informazioa gordeko dugu
    for (i=0;i<seleccion.length;i++){
        arbol[na][seleccion[i]]=[true,seleccion,fs]
    }
    console.log(arbol)

    // arbol marraztu
    dibujarArbol()

}

function dibujarArbol(){
    for (key in arbol){
        columnas = []
        for (k in arbol[key]){
            console.log(arbol[key][k][2])
            if (arbol[key][k][2] != ' '){
                columnas.push(arbol[key][k][2])                
            }
            else {
                columnas.push(' ')
            }
        }
        console.log(key)
        console.log(columnas)
        colSinRep=[]
        for (i=0;i<columnas.length;i++){
            if(columnas[i]==" "){
                colSinRep.push([-1," "])
            }
            else if (colSinRep.length==0){
                colSinRep.push([1,columnas[i]])
            }
            else{
                if (colSinRep[colSinRep.length-1][1]!=columnas[i]){
                    colSinRep.push([1,columnas[i]])
                }
                else if(colSinRep[colSinRep.length-1][1]==columnas[i]){
                    colSinRep[colSinRep.length-1][0]+=1
                }
                
            }
        }
        console.log(colSinRep)
        fila = document.getElementById(key)
        fila.innerHTML=`<tr id=${key}><td>${key}</td></tr>`
        for (i=0; i<colSinRep.length;i++){
            if (colSinRep[i][0]==-1){
                fila.innerHTML += `<td></td>`
            }
            else if(colSinRep[i][0]==1){
                fila.innerHTML += `<td style="border-top: 3px solid black;" >${colSinRep[i][1]}</td>`
            }
            else{
                fila.innerHTML += `<td style="border-top: 3px solid black;" colspan=${colSinRep[i][0]}>${colSinRep[i][1]}</td>`
            }
                
        }
    }
    for (i=1; i<=columnas.length;i++){
        deseleccion(i)
    }
}


