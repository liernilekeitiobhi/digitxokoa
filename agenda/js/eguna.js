// Leiho honetan erabiltzaileak egun horretako lanak eta azterketak erregistratzeko aukera izango du.
// Horretaz gain, egun horretarako jada programatuak dauden lanak eta azterketak ere ikusiko dira. 

let auth0 = null



const configureClient = async () => {
  auth0 = await createAuth0Client({
    domain: "dev-kk1ohqzhycvksad7.us.auth0.com",
    client_id: "9t9yPn6lfqcQTym1C9IN2LX1eVo90PtY",
  })
}

const processLoginState = async () => {
  // Check code and state parameters
  const query = window.location.search
  if (query.includes("code=") && query.includes("state=")) {
    // Process the login state
    await auth0.handleRedirectCallback()
    // Use replaceState to redirect the user away and remove the querystring parameters
    window.history.replaceState({}, document.title, window.location.pathname)
  }
}

window.onload = async function() {
    await configureClient()
    await processLoginState()
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const eg = urlParams.get('eguna')
    // Dagokion eguna idatzi goiburuan
    var titulua = document.getElementById('eguna')
    titulua.innerHTML = eg

    //Datu basetik lanak eta azterketak kargatu bertan idazteko ondoren.
    getGaurLanak(eg)
    getGaurAzterketak(eg)
}


/* ---------------------------- */
/* -----EGUN HONETAKO LANAK---- */
/* ---------------------------- */

// ----KARGATU----//
// Datu basetik etxerako lanak ekarri
async function getGaurLanak(eguna){
    const isAuthenticated = await auth0.isAuthenticated()
    if (isAuthenticated) {
		user = await auth0.getUser()
        e = user.email
	}
    else{
        alert("Sartu zure erabiltzailea!")
    }
    fetch('https://strapi-svi3.onrender.com/api/etxerako-lanak?filters[email][$eq]=' + e + '&filters[data][$eq]=' + eguna)
      .then(response => response.json())
      .then(data =>
      data.data.forEach(writeGaurLanak))
}

// ----IDATZI----//
// Exerako lanak idatzi dagokion tokian. Etxerako lan bakoitzak zakarrontzi bat dauka hau ezabatzeko.
// Ezabatzeko zakarrontzia botoi bat da ezabatuLana(id) funtzioari deitzen diona. 
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

//----EZABATU----/
//Etxerako lana ezabatu
function ezabatuLana(id){
    ezabatuL(id).then(function(){
        var gridDiv = document.getElementById(id)
        gridDiv.remove() //Momentuan alerta baten ordez erabiltzaileak idatzitako desagertzen ikusiko du.
    })
}

function ezabatuL(id){
    return fetch('https://strapi-svi3.onrender.com/api/etxerako-lanak/' + id, {
            method: 'DELETE'
        }).then(res => res.text()) // or res.json()
          .then(res => console.log(res))
}


//----GORDE----//
// Etxerako lana datu basean gorde
async function etxerakoLanaErregistratu(){
    const isAuthenticated = await auth0.isAuthenticated()
    if (isAuthenticated) {
		user = await auth0.getUser()
        e = user.email
	}
    else{
        alert("Sartu zure erabiltzailea!")
    }
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
                "eginda": false,
                "email": e
            }             
        })
    })
    .then(response => response.json())
    .then(response => console.log(JSON.stringify(response)))

    // Momentuan zer gorde den ikusteko, alerta baten ordez idatzi egingo dugu erabiltzaileak idatzi duena.
    // Hurrengoan kargatzean hau datu basetik zuzenean idatziko da. 
    var div = document.getElementById("zerrenda")
    div.innerHTML += `
        <tr >
            <th class="lana-ezker"><b>${ir}</b>: ${lan}</th>
            <th class="basura"><a><i class="fa-solid fa-trash"></i></a></th>
        </tr>
     `
}


/* ---------------------------- */
/* --EGUN HONETAKO AZTERKETAK-- */
/* ---------------------------- */

// ----KARGATU----//
// Datu basetik azterketak ekarri
async function getGaurAzterketak(eguna){
    const isAuthenticated = await auth0.isAuthenticated()
    if (isAuthenticated) {
		user = await auth0.getUser()
        e = user.email
	}
    else{
        alert("Sartu zure erabiltzailea!")
    }
    fetch('https://strapi-svi3.onrender.com/api/azterketak?filters[email][$eq]=' + e + '&filters[data][$eq]=' + eguna)
      .then(response => response.json())
      .then(data =>
      data.data.forEach(writeGaurAzterketak))
}


// ----IDATZI----//
// Azterketak idatzi dagokion tokian. Azterketa bakoitzak zakarrontzi bat dauka hau ezabatzeko.
// Ezabatzeko zakarrontzia botoi bat da ezabatuLana(id) funtzioari deitzen diona.
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

// ----EZABATU----/
// Azterketa ezabatu
function azterketaEzabatu(id){
    ezabatu(id).then(function(){
        var gridDiv = document.getElementById(id)
        gridDiv.remove() //Momentuan alerta baten ordez erabiltzaileak idatzitako desagertzen ikusiko du.
    })
}

function ezabatu(id){
    return fetch('https://strapi-svi3.onrender.com/api/azterketak/' + id, {
            method: 'DELETE'
        }).then(res => res.text()) // or res.json()
          .then(res => console.log(res))
}

//----GORDE----//
// Azterketa datu basean gorde
async function azterketaErregistratu(){
    const isAuthenticated = await auth0.isAuthenticated()
    if (isAuthenticated) {
		user = await auth0.getUser()
        e = user.email
	}
    else{
        alert("Sartu zure erabiltzailea!")
    }
    var ir = document.getElementById("irakasgaia-azterketa").value
    var ed = document.getElementById("edukia").value
    var eguna = document.getElementById("eguna").innerHTML
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
                "data": eguna,
                "email": e}
             
        })
    })
    .then(response => response.json())
    .then(response => console.log(JSON.stringify(response)))
    // Momentuan zer gorde den ikusteko, alerta baten ordez idatzi egingo dugu erabiltzaileak idatzi duena.
    // Hurrengoan kargatzean hau datu basetik zuzenean idatziko da. 
    var div = document.getElementById("zerrenda-azterketak")
    div.innerHTML += `
        <div class="grid-item">
            <h4>${ir}</h4>
            <div class="grid-text"><p>${ed}</p></div>
            <div class="azterketa-ezabatu"><a onclick="azterketaEzabatu()"><i class="fa-solid fa-trash"></i></a></div>
        </div>`
    }






