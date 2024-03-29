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

window.onload = async function(){
    await configureClient()
    await processLoginState()
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const zenb_at = urlParams.get('id')
    console.log(zenb_at)
    const isAuthenticated = await auth0.isAuthenticated()
    if (isAuthenticated) {
		user = await auth0.getUser()
        e = user.email
	}
    else{
        alert("Sartu zure erabiltzailea!")
    }
    fetch('https://strapi-svi3.onrender.com/api/elementu-kimikoak?filters[email][$eq]=' + e + '&filters[zenbaki_atomikoa][$eq]=' + zenb_at)
      .then(response => response.json())
      .then(data => {
            if(data.data.length != 0){
                var zenb_at_div = document.getElementById("at_num-datuak-sartu")
                var masa_at_div = document.getElementById("masa-datuak-sartu")
                var sinboloa_div = document.getElementById("symbol-datuak-sartu")
                var izena_div = document.getElementById("at_details-datuak-sartu")
                var kolorea = document.getElementById("cell")

                var zenb_at_input = document.getElementById("zenb_at")
                var masa_at_input = document.getElementById("masa_at")
                var sinboloa_input = document.getElementById("sinboloa")
                var izena_input = document.getElementById("izena")
                var izaera_input = document.getElementById("izaera")               

                var elementua = data.data[0].attributes
                var zenb_at = elementua.zenbaki_atomikoa
                var masa_at = elementua.masa_atomikoa
                var izena = elementua.izena
                var sinboloa = elementua.sinboloa
                var mota = elementua.mota
                if (zenb_at!=null & zenb_at!=-1){
                    zenb_at_div.innerHTML = zenb_at
                    zenb_at_input.value = zenb_at
                }
                if (masa_at!=null & masa_at!=-1){
                    masa_at_div.innerHTML = masa_at
                    masa_at_input.value = masa_at
                }
                if (izena!=null & izena!=" "){
                    izena_div.innerHTML = izena
                    izena_input.value = izena
                }
                if (sinboloa!=null & sinboloa!=" "){
                    sinboloa_div.innerHTML = sinboloa
                    sinboloa_input.value = sinboloa
                }
                if (mota!=null & mota!="hutsa"){
                    izaera_input.value = mota
                    if (mota=="ez-metala"){
                        kolorea.style="background-color: #ffc78e;"
                        izaera_input.value = "ez-metala"
                    }
                    else if (mota=="erdimetala"){
                        kolorea.style="background-color: rgb(141, 255, 244);"
                        izaera_input.value = "erdimetala"
                    }
                    else if (mota=="metala"){
                        kolorea.style="background-color: #fb93a4;"
                        izaera_input.value = "metala"
                    }
                    else if (mota=="gas-geldoa"){
                        kolorea.style="background-color: #8bffa2;"
                        izaera_input.value = "gas-geldoa"
                    } 
                }

            }
        }     
      
      )
}



function zenb_at_gehitu(value){
    var div = document.getElementById("at_num-datuak-sartu")
    console.log(value)
    div.innerHTML = value
}

function masa_at_gehitu(value){
    var div = document.getElementById("masa-datuak-sartu")
    div.innerHTML = value
}

function sinboloa_gehitu(value){
    var div = document.getElementById("symbol-datuak-sartu")
    div.innerHTML = value
}

function izena_gehitu(value){
    var div = document.getElementById("at_details-datuak-sartu")
    div.innerHTML = value
}

function izaera_gehitu(value){
    var div = document.getElementById("izaera-datuak-sartu")
    var cell = document.getElementById("cell")
    console.log(value)
    if (value=="ez-metala"){
        cell.style="background-color: #ffc78e;"
    }
    else if (value=="erdimetala"){
        cell.style="background-color: rgb(141, 255, 244);"
    }
    else if (value=="metala"){
        cell.style="background-color: #fb93a4;"
    }
    else if (value=="gas-geldoa"){
        cell.style="background-color: #8bffa2;"
    }
    else if (value=="hutsa"){
        cell.style="background-color: rgba(0, 128, 128, 0.9);"
    }   
}

async function elementua_gorde(){
    const isAuthenticated = await auth0.isAuthenticated()
    console.log(isAuthenticated)
	if (isAuthenticated) {
		user = await auth0.getUser()
        e = user.email
	}
    else{
        alert("Sartu zure erabiltzailea!")
    }
    var masa_at = document.getElementById("masa_at").value
    var zenb_at = document.getElementById("zenb_at").value
    var izena = document.getElementById("izena").value
    var sinboloa = document.getElementById("sinboloa").value
    var izaera = document.getElementById("izaera").value

    if (masa_at=="" | masa_at==" "){
        masa_at=-1
    }
    if (izena==""){
        izena=" "
    }
    if (sinboloa==""){
        sinboloa=" "
    }
    if (izaera==""){
        izaera="hutsa"
    }

    fetch('https://strapi-svi3.onrender.com/api/elementu-kimikoak?filters[email][$eq]=' + e + '&filters[zenbaki_atomikoa][$eq]=' + zenb_at)
    .then(response => response.json())
    .then(data => {
          if(data.data.length != 0){
            var id = data.data[0].id
                fetch('https://strapi-svi3.onrender.com/api/elementu-kimikoak/' + id, {
                method: 'PUT', 
                headers: {
                    'Accept': 'application/json',
                    "Content-type": "application/json; charset=UTF-8",
                },
                body: JSON.stringify({
                    "data": {
                        "masa_atomikoa": masa_at,
                        "zenbaki_atomikoa": zenb_at, 
                        "izena": izena,
                        "sinboloa": sinboloa,
                        "mota": izaera,
                        "email": e
                    }            
                    })
                })
                .then((res)=>{
                    if(res.status===400){
                        throw new Error('Atalen bat ez dator bat datu basearen formatuarekin');
                    }
                    return res.json();
                })
                .then(response => window.location="./taula-periodikoa.html")
                .catch(error => {alert("ATALEN BAT EZ DAGO ONDO BETETA!")})
          }

          else{
                fetch('https://strapi-svi3.onrender.com/api/elementu-kimikoak', {
                method: 'POST', /*UPDATE!!!! bi gauzak izan daizke*/
                headers: {
                    'Accept': 'application/json',
                    "Content-type": "application/json; charset=UTF-8",
                },
                body: JSON.stringify({
                    "data": {
                        "masa_atomikoa": masa_at,
                        "zenbaki_atomikoa": zenb_at, 
                        "izena": izena,
                        "sinboloa": sinboloa,
                        "mota": izaera,
                        "email": e
                        }            
                    })
                })
                .then((res)=>{
                    if(res.status===400){
                        throw new Error('Atalen bat ez dator bat datu basearen formatuarekin');
                    }
                    return res.json();
                })
                .then(response => window.location="./taula-periodikoa.html")
                .catch(error => {alert("ATALEN BAT EZ DAGO ONDO BETETA!")})

            }})
        
            
    
    
}

