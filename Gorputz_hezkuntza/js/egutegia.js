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

// Leihoa irekitzean kargatuko den funtzioa.
// * "today" aldagai globaletik urtea eta hilabetea hartuko ditu.
// * load_calendar funtzioari deituko diogu eta horrek egutegia kargatuko du.
//      * urtea eta hilabetea pasako dizkiogu funtzio honi horrek egutegiaren goiburua kargatuko baitu.
window.onload = function() {
    var month_number = today.split("-")[1] 
    var year_number = today.split("-")[0]
    load_calendar(month_number, year_number);
}

// Datu basetik azterketen egunak ekarriko ditugu egutegian sartzeko. 
// load_calendar funtzioan deituko diogu funtzio honi.
async function getDaysEmotions() {
    return await fetch('https://strapi-svi3.onrender.com/api/......?pagination[pageSize]=500')
      .then(response => response.json())
      .then(data => {return data});    
}

// EGUTEGIA KARGATU
// * Egunak dagokion aste egunetan kokatu
// * Azterketa egunetan dagokion sinboloa jarri
async function load_calendar(month_number, year_number) {
    // Lehen pausua azterketa egun guztiak kargatzea da. Horren ondoren hauek dagozkien egunetan jarriko dira.
    getDaysEmotions().then(function(a){
        // Irakasgai bakoitzari ikono bat dagokio. Irakasgai horretako azterketa dagoen egun bakoitzean dagokion ikonoa agertuko da. 
        var icons = {"Oso ondo": "<i class='fa-solid fa-face-grin-beam' style='font-size: 20px; color: green;'></i>",
                     "Ondo": "<i class='fa-solid fa-face-smile' style='font-size: 20px; color: green;'></i>",
                     "Ez ondo ez gaizki": "<i class='fa-solid fa-face-meh' style='font-size: 20px; color: green;'></i>",
                     "Gaizki": "<i class='fa-solid fa-face-sad-tear'  style='font-size: 20px; color: orange;'></i>",
                     "Oso gaizki": "<i class='fa-solid fa-face-sad-cry' style='font-size: 20px; color: blue;'></i>"
                    }
        // Hiztegi bat sortuko dugu azterketak adierazten dituena.
        // examDays = {"eguna1" : [irakasgaia1, irakasgaia2, ...], "eguna2": [irakasgaia], ...}
        var examDays = {}        
        var azterketak = a.data
        for (i=0; i<azterketak.length; i++){
            d = azterketak[i].attributes.data
            if (d in examDays) {
                examDays[d].push(azterketak[i].attributes.irakasgaia)          
            }
            else{
                examDays[d] = [azterketak[i].attributes.irakasgaia]     
            }           
        }
        
        // Hilabetea eta urtea sartu goiburuan
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
        
        // Egun bakoitza botoi bat da, eta botoi horrek dagokion egunaren leiho batera eramango gaitu. 
        // Leiho horretan egun horretan lanak eta azterketak sartu ahalko ditugu.
        while (k <= n){
            // Gaurko eguna azpimarratuta
            if (k == today.split("-")[2] && month_number == today.split("-")[1]){ 
                k = k.toString()
                if(k.length == 1){
                    k = '0' + k
                }
                eg = urt + '-' + hil + '-' + k.toString()
                taulako_div.innerHTML += `<li><a onclick="window.location='./eguna.html?eguna=${eg}'"><span class="active">${k}</i></span></a></li>`
                
            }
            // Gainontzeko egunak (gaurkoa ez dena)
            else{ 
                k = k.toString()
                if(k.length == 1){
                    k = '0' + k
                }
                eg = urt + '-' + hil + '-' + k.toString()

                taulako_div.innerHTML += `<li><a onclick="window.location='./eguna.html?eguna=${eg}'">${k}</a></li>`
                             
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

// Egutegiko gezitxodun botoia aurreko hilabetera pasatzeko. 
function prevMonth(){
    var urtea = document.getElementById("urtea").innerHTML
    var hilabetea = document.getElementById("hilabetea").innerHTML
    hilabetea = months_to_number[hilabetea]  

    if (hilabetea != "01") { //Urtarrilan bagaude urtez aldatu beharko da.
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

// Egutegiko gezitxodun botoia hurrengo hilabetera pasatzeko. 
function nextMonth(){
    var urtea = document.getElementById("urtea").innerHTML
    var hilabetea = document.getElementById("hilabetea").innerHTML
    hilabetea = months_to_number[hilabetea]  

    if (hilabetea != "12") {//Abenduan bagaude urtez aldatu beharko da.
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
