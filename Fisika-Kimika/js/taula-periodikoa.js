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
    const isAuthenticated = await auth0.isAuthenticated()
    if (isAuthenticated) {
		user = await auth0.getUser()
        e = user.email
	}
    else{
        alert("Sartu zure erabiltzailea!")
    }
    fetch('https://strapi-svi3.onrender.com/api/elementu-kimikoak?filters[email][$eq]=' + e + '&pagination[pageSize]=500')
        .then(response => response.json())
        .then(data =>
        data.data.forEach(writeElementuak))
    
}


function writeElementuak(element){
    var koloreak = {"metala": "#fb93a4","ez-metala": "#ffc78e", "erdimetala": "rgb(141, 255, 244)","gas-geldoa": "#8bffa2"}
    var elementua = element.attributes
    var masa_at = elementua.masa_atomikoa
    var zenb_at = elementua.zenbaki_atomikoa
    var izaera = elementua.mota
    var sinboloa = elementua.sinboloa
    var izena = elementua.izena
    
       
    if (masa_at==-1){
        masa_at=" "
    }

    var div = document.getElementById(zenb_at)
    div.innerHTML = `
        <div class="symbol">${sinboloa}</div>
        <div class="at_num">${zenb_at}</div>
        <div class="masa">${masa_at}</div>            
        <div class="at_details">${izena}</div>    
    `
    div.style = "background-color: " + koloreak[izaera] + ";"
    
}