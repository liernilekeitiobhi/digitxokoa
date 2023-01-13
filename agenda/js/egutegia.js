let today = new Date().toISOString().slice(0, 10) // YYYY-MM-DD

let months = {"01": "Urtarrila",
              "02": "Otsaila",
              "03": "Martxoa",
              "04": "Apirila",
              "05": "Maiatza",
              "06": "Ekaina",
              "07": "Uztaila",
              "08": "Abuztua",
              "09": "Iraila",
              "10": "Urria",
              "11": "Azaroa",
              "12": "Abendua"}   
            
function isLeapYear (year) {
    return new Date(year, 1, 29).getDate() === 29;
}

window.onload = function() {
    var month_number = today.split("-")[1] // gaurko eguna kargatuko dugu beti
    var year_number = today.split("-")[0]
    load_calendar(month_number, year_number)
     
}

async function getAllExamDays() {
    return await fetch('https://strapi-svi3.onrender.com/api/azterketak?pagination[pageSize]=500')
      .then(response => response.json())
      .then(data => {return data});    
}

async function load_calendar(month_number, year_number) {
    getAllExamDays().then(function(a){
        var icons = {"Matematika": "<i class='fa-solid fa-square-root-variable' style='font-size: 20px; color: blue;'></i>",
                     "Fisika-Kimika": "<i class='fa-solid fa-flask' style='font-size: 20px; color: rgb(255, 0, 217);'></i>",
                     "Biologia": "<i class='fa-solid fa-seedling' style='font-size: 20px; color: green;'></i>",
                     "Gaztelera": "<i class='fa-solid fa-circle'  style='font-size: 20px; color: orange;'></i>",
                     "Ingelera": "<i class='fa-solid fa-earth-americas' style='font-size: 20px; color: red;'></i>",
                     "Euskara": "<i class='fa-solid fa-bird'  style='font-size: 20px; color: green;'></i>",
                     "Geografia-Historia": "<i class='fa-solid fa-landmark'  style='font-size: 20px; color: purple;'></i>",
                     "Plastika": "<i class='fa-solid fa-paintbrush'  style='font-size: 20px; color: black;'></i>",
                     "Gorputz Hezkuntza": "<i class='fa-solid fa-tennis-ball  style='font-size: 20px; color: yellow;'></i>",
                     "Tutoretza": "<i class='fa-solid fa-person  style='font-size: 20px; color: black;'></i>"
                    }
        // Hiztegi bat sortuko dugu {"eguna1" : [irakasgaia1, irakasgaia2, ...], "eguna2": [irakasgaia], ...}
        var examDays = {}        
        azterketak = a.data
        for (i=0; i<azterketak.length; i++){
            d = azterketak[i].attributes.data
            if (d in examDays) {
                examDays[d].push(azterketak[i].attributes.irakasgaia)          
            }
            else{
                examDays[d] = [azterketak[i].attributes.irakasgaia]     
            }           
        }
        
        // Hilabetea eta urtea sartu dagokien posizioan
        var hilabetea = document.getElementById("hilabetea")
        var month = months[month_number]  
        hilabetea.innerHTML = `${month}`

        var urtea = document.getElementById("urtea")
        urtea.innerHTML = `${year_number}`
        
        // Egunak bete dagokien posizioan
        // Jakiteko hilabeteak zenbat egun dituen q hiztegia sortu da. Otsaila aldakorra denez, bisiesto den edo ez jakin behar da.
        var isLeap = isLeapYear(year_number)
        if (isLeap == true){
            ots = 29
        }
        else{
            ots = 28
        }
        q = {"01": 31, "02": ots, "03": 31, "04": 30, "05": 31, "06": 30, "07": 31, "08": 31, "09": 30, "10": 31, "11": 30, "12": 31}
        
        // Egunak betetzen hasiko gara, baina ez dugu nahi astelehenetik betetzen hasi. Tarte hutsak bete beharko ditugu 1 eguna den asteko egunerarte.
        var taulako_div = document.getElementById("egunak")
        var first_day_weekday = new Date(parseInt(year_number), parseInt(month_number)-1, 1).getDay()
        if (first_day_weekday==0){
            first_day_weekday=7 //igandea
        }
        taulako_div.innerHTML = ""
        for (i=1; i<first_day_weekday; i++){
            taulako_div.innerHTML += `<li><span class="hutsa"></span></li>`
        }
        
        // Behin egun hutsak beteta k=1 etik hasi eta hilabetea bukatzen den arte egunak gehituko ditugu. 
        var k = 1
        n = q[month_number]
        urt = year_number.toString()
        hil = month_number.toString()

        while (k <= n){
            if (k == today.split("-")[2] && month_number == today.split("-")[1]){ //Gaurko eguna azpimarratu egingo da
                k = k.toString()
                if(k.length == 1){
                    k = '0' + k
                }
                eg = urt + '-' + hil + '-' + k.toString()
                if (eg in examDays){
                    i = ""
                    for (j=0; j<examDays[eg].length; j++){
                        console.log(examDays[eg][j])
                        i += icons[examDays[eg][j]]
                        console.log(i)
                    }
                    taulako_div.innerHTML += `                    
                        <li><a onclick=egunaKargatu('${eg}')><span class="active">${k}${i}</span></a></li>`
                }
                else{
                    taulako_div.innerHTML += `<li><a onclick=egunaKargatu('${eg}')><span class="active">${k}</i></span></a></li>`
                }
            }
            else{ //Gainontzeko egunak
                k = k.toString()
                if(k.length == 1){
                    k = '0' + k
                }
                eg = urt + '-' + hil + '-' + k.toString()
                if (eg in examDays){
                    i = ""
                    for (j=0; j<examDays[eg].length; j++){
                        console.log(examDays[eg][j])
                        i += icons[examDays[eg][j]]
                        console.log(i)
                    }
                    taulako_div.innerHTML += `<li><a onclick=egunaKargatu('${eg}')>${k}<span>${i}</span></a></li>`
                }
                else{
                    taulako_div.innerHTML += `<li><a onclick=egunaKargatu('${eg}')>${k}</a></li>`
                }
                
            }
            k = parseInt(k)     
            k += 1
        }


    })

    

}

let months_to_number = {"Urtarrila": "01",
                        "Otsaila": "02",
                        "Martxoa": "03",
                        "Apirila": "04",
                        "Maiatza": "05",
                        "Ekaina": "06",
                        "Uztaila": "07",
                        "Abuztua": "08",
                        "Iraila": "09",
                        "Urria": "10",
                        "Azaroa": "11",
                        "Abendua": "12"}  

function prevMonth(){
    var urtea = document.getElementById("urtea").innerHTML
    var hilabetea = document.getElementById("hilabetea").innerHTML
    hilabetea = months_to_number[hilabetea]  

    if (hilabetea != "01") {
        hilabetea = (parseInt(hilabetea) - 1).toString()
        if (hilabetea.length == 1){
            hilabetea = "0" + hilabetea
        }
        load_calendar(hilabetea, urtea)
    }
    else{
        urtea = parseInt(urtea) - 1
        urtea = urtea.toString()
        load_calendar("12", urtea)
    }

}

function nextMonth(){
    var urtea = document.getElementById("urtea").innerHTML
    var hilabetea = document.getElementById("hilabetea").innerHTML
    hilabetea = months_to_number[hilabetea]  

    if (hilabetea != "12") {
        hilabetea = (parseInt(hilabetea) + 1).toString()
        if (hilabetea.length == 1){
            hilabetea = "0" + hilabetea
        }
        load_calendar(hilabetea, urtea)
    }
    else{
        urtea = parseInt(urtea) + 1
        load_calendar("01", urtea)
    }
}

/*--------------------------------------------------------*/
/*EGUN KONKRETU BATEKO LANAK ETA AZTERKETAK KARGATUKO DITU*/
/*--------------------------------------------------------*/

function egunaKargatu(eguna) {
    var egutegiaDiv = document.getElementById("egutegia-container")
    egutegiaDiv.innerHTML = `

        <div style="text-align: center; margin-top: 100px;">
            <h1 id="eguna" style="font-size: 70px;">${eguna}</h1>
        </div>
        <div class="idatzi">
            <form class="formularioa">
            <li>

            </li>
            
            <li>            
                <select name="Irakasgaia" id="irakasgaia">
                    <option disabled="disabled">───────────</option>
                    <option value="Matematika">Matematika</option>
                    <option disabled="disabled">───────────</option>
                    <option value="Fisika-Kimika">Fiki</option>
                    <option disabled="disabled">───────────</option>
                    <option value="Biologia">Bio-Geo</option>
                    <option disabled="disabled">───────────</option>
                    <option value="Gaztelera">Gaztelera</option>
                    <option disabled="disabled">───────────</option>
                    <option value="Ingelera">Ingelera</option>
                    <option disabled="disabled">───────────</option>
                    <option value="Euskara">Euskara</option> 
                    <option disabled="disabled">───────────</option>               
                    <option value="Geografia-Historia">Geo-Hist</option>
                    <option disabled="disabled">───────────</option>
                    <option value="Plastika">Plastika</option>
                    <option disabled="disabled">───────────</option>
                    <option value="Gorputz Hezkuntza">GH</option>
                    <option disabled="disabled">───────────</option>
                    <option value="Tutoretza">Tutoretza</option>
                    <option disabled="disabled">───────────</option>
                </select>
            </li>  
            <li class="text">
                <input id="lana" type="text" placeholder="Idatzi egun honetarako lana">
            </li>
            <li><button type="button" onclick=etxerakoLanaErregistratu()>+</button></li>
                
            </form>
        </div>
        <div class="idatzi">

            <form class="formularioa">
            <li>

            </li>
            
            <li>            
                <select name="Irakasgaia" id="irakasgaia-azterketa">
                    <option disabled="disabled">───────────</option>
                    <option value="Matematika">Matematika</option>
                    <option disabled="disabled">───────────</option>
                    <option value="Fisika-Kimika">Fiki</option>
                    <option disabled="disabled">───────────</option>
                    <option value="Biologia">Bio-Geo</option>
                    <option disabled="disabled">───────────</option>
                    <option value="Gaztelera">Gaztelera</option>
                    <option disabled="disabled">───────────</option>
                    <option value="Ingelera">Ingelera</option>
                    <option disabled="disabled">───────────</option>
                    <option value="Euskara">Euskara</option> 
                    <option disabled="disabled">───────────</option>               
                    <option value="Geografia-Historia">Geo-Hist</option>
                    <option disabled="disabled">───────────</option>
                    <option value="Plastika">Plastika</option>
                    <option disabled="disabled">───────────</option>
                    <option value="Gorputz Hezkuntza">GH</option>
                    <option disabled="disabled">───────────</option>
                    <option value="Tutoretza">Tutoretza</option>
                    <option disabled="disabled">───────────</option>
                </select>
            </li>  
            <li class="text">
                <input id="edukia" type="text" placeholder="Idatzi egun honetako azterketako edukia zein izango den">
            </li>
            <li><button type="button" onclick=azterketaErregistratu()>+</button></li>
                
            </form>
        </div>
        <div class="center">
            <div class="ikusi">
                <h3>EGUN HONETARAKO EGIN BEHARREKO LANAK</h3>
                <table id="zerrenda">
                    
                </table>
                
            </div>
        </div>

        <div class="center">
            <div class="ikusi" style="background-color: #d5dee0;">
                <h3>EGUN HONETAKO AZTERKETAK</h3>
                <div class="grid-container" id="zerrenda-azterketak"></div>
                
            </div>
        </div>
    `
    getGaurLanak(eguna)
    getGaurAzterketak(eguna)
}


/* ---------------------------- */
/* -----EGUN BATERAKO LANAK---- */
/* ---------------------------- */
function getGaurLanak(eguna){
    fetch('https://strapi-svi3.onrender.com/api/etxerako-lanak?filters[data][$eq]=' + eguna)
      .then(response => response.json())
      .then(data =>
      data.data.forEach(writeGaurLanak))
}

function writeGaurLanak(element){
    var div = document.getElementById("zerrenda")
    var etxerako_lana = element.attributes
    var ir = etxerako_lana.irakasgaia
    var lan = etxerako_lana.lana
    id = element.id
    div.innerHTML += `
        <tr id=${id}>
            <th class="lana-ezker"><p><b>${ir}:</b> ${lan}</p></th>
            <th class="basura"><a onclick="ezabatuLana(${id})"><i class="fa-solid fa-trash"></i></a></th>
        </tr>   `
}

function ezabatuL(id){
    return fetch('https://strapi-svi3.onrender.com/api/etxerako-lanak/' + id, {
            method: 'DELETE'
        }).then(res => res.text()) // or res.json()
          .then(res => console.log(res))
}


function ezabatuLana(id){
    ezabatuL(id).then(function(){
        var gridDiv = document.getElementById(id)
        gridDiv.remove()
    })
}

function etxerakoLanaErregistratu(){
    var ir = document.getElementById("irakasgaia").value
    var lan = document.getElementById("lana").value
    var eguna = document.getElementById("eguna").innerHTML
    fetch('https://strapi-svi3.onrender.com/api/etxerako-lanak', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
            "data": {
                "irakasgaia": ir,
                "lana": lan, 
                "data": eguna,
                "eginda": false
            }
             
        })
    })
    .then(response => response.json())
    .then(response => console.log(JSON.stringify(response)))

    var div = document.getElementById("zerrenda")
    div.innerHTML += `
        <tr >
            <th class="lana-ezker"><b>${ir}</b>: ${lan}</th>
            <th class="basura"><a><i class="fa-solid fa-trash"></i></a></th>
        </tr>
     `
}


/* ---------------------------- */
/* --EGUN BATERAKO AZTERKETAK-- */
/* ---------------------------- */
function getGaurAzterketak(eguna){
    fetch('https://strapi-svi3.onrender.com/api/azterketak?filters[data][$eq]=' + eguna)
      .then(response => response.json())
      .then(data =>
      data.data.forEach(writeGaurAzterketak))
}

function writeGaurAzterketak(element){
    var div = document.getElementById("zerrenda-azterketak")
    var azterketa = element.attributes
    var irakasgaia = azterketa.irakasgaia
    var edukia = azterketa.edukia
    id = element.id
    div.innerHTML += `    
    
        <div id=${id} class="grid-item">
            <h4>${irakasgaia}</h4>
            <div class="grid-text"><p>${edukia}</p></div>
            <div class="azterketa-ezabatu"><a onclick="azterketaEzabatu(${id})"><i class="fa-solid fa-trash"></i></a></div>
        </div>
    `
}

function azterketaErregistratu(){
    var ir = document.getElementById("irakasgaia-azterketa").value
    var ed = document.getElementById("edukia").value
    var eguna = document.getElementById("eguna").innerHTML
    var div = document.getElementById("zerrenda-azterketak")
    div.innerHTML += `
        <div class="grid-item">
            <h4>${ir}</h4>
            <div class="grid-text"><p>${ed}</p></div>
            <div class="azterketa-ezabatu"><a onclick="azterketaEzabatu()"><i class="fa-solid fa-trash"></i></a></div>
        </div>`
    fetch('https://strapi-svi3.onrender.com/api/azterketak', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
            "data": {
                "irakasgaia": ir,
                "edukia": ed, 
                "data": eguna}
             
        })
    })
    .then(response => response.json())
    .then(response => console.log(JSON.stringify(response)))

    
}

function ezabatu(id){
    return fetch('https://strapi-svi3.onrender.com/api/azterketak/' + id, {
            method: 'DELETE'
        }).then(res => res.text()) // or res.json()
          .then(res => console.log(res))
}


function azterketaEzabatu(id){
    ezabatu(id).then(function(){
        var gridDiv = document.getElementById(id)
        gridDiv.remove()
    })
}








  


