

let auth0 = null

window.onload = async () => {
  await configureClient()
  await processLoginState()
  updateUI()
}

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

const updateUI = async () => {
  const isAuthenticated = await auth0.isAuthenticated()
  document.getElementById("btn-logout").disabled = !isAuthenticated
  document.getElementById("btn-login").disabled = isAuthenticated
  // NEW - add logic to show/hide gated content after authentication
  if (isAuthenticated) {
    const u = await auth0.getUser()
    console.log("barruan")
    console.log(u.email)
    var edukia = document.getElementById("edukia")
    edukia.style.visibility = "visible"
    /*document.getElementById("gated-content").classList.remove("hidden")
    document.getElementById(
      "ipt-access-token"
    ).innerHTML = await auth0.getTokenSilently()
    document.getElementById("ipt-user-profile").innerHTML = JSON.stringify(
      await auth0.getUser()
    )*/
    
  } else {
    console.log("kanpoan")
    //document.getElementById("gated-content").classList.add("hidden")
  }
  
}

const login = async () => {
  await auth0.loginWithRedirect({
    redirect_uri: window.location.href,
  })
}

const logout = () => {
  auth0.logout({
    returnTo: window.location.href,
  })
}
