window.onload=function(){
    fetch('https://strapi-svi3.onrender.com/api/elementu-kimikoak')
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