window.onload = function(){
    getLanak()
}



function getLanak(eguna){
    var d = new Date(Date.now() - 12096e5).toISOString().slice(0, 10); //bi aste atzera
    // Filtroa: egin gabe dauden lan guztiak eta ginda daudenen artean azken 14 egunetakoak. Lehendabizi egin gabeak eta gero egindakoak dataren ordenean.
    fetch('https://strapi-svi3.onrender.com/api/etxerako-lanak?filters[$or][0][eginda][$eq]=false&filters[$or][1][data][$gte]=' + d + '&sort[1]=eginda&sort[2]=data')
      .then(response => response.json())
      .then(data =>
      data.data.forEach(writeLanak))
}

function writeLanak(element){
    var div = document.getElementById("etxerako-lanen-zerrenda")
    var etxerako_lana = element.attributes
    var irakasgaia = etxerako_lana.irakasgaia
    var lana = etxerako_lana.lana
    var data = etxerako_lana.data
    var eginda = etxerako_lana.eginda
    var id = element.id

    if (eginda==false){
        div.innerHTML += `<tr class="active-row">
            <td>${irakasgaia}</td>
            <td>${data}</td>
            <td>${lana}</td>
            <td style="text-align: center; font-size: 40px;"><a class="check" id=${id} onclick="egoeraAldatu(${id}, false)"><i class="fa-solid fa-clock" style="color: red;"></i></a></td>              
        </tr> `
    }
    else{
        div.innerHTML += `<tr>
            <td>${irakasgaia}</td>
            <td>${data}</td>
            <td>${lana}</td>
            <td style="text-align: center; font-size: 40px;"><a class="check" id=${id} onclick="egoeraAldatu(${id}, true)"><i class="fa-solid fa-check-double" style="color: green;"></i></a></td>                
        </tr> `
    }      
}


function aldatu(id, egoera){
   
    if (egoera == true){
        var div = document.getElementById(id)
        console.log("berdetik gorrira aldatu")
        div.innerHTML = `<i class="fa-solid fa-clock" style="color: red;"></i>`
        return fetch('https://strapi-svi3.onrender.com/api/etxerako-lanak/' + id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify({
            "data": {
                    "eginda": false
                }             
            })
        })
        
    }
    else{
        var div = document.getElementById(id)
        console.log("gorritik berdera aldatu")
        div.innerHTML = `<i class="fa-solid fa-check-double" style="color: green;"></i>`
        return fetch('https://strapi-svi3.onrender.com/api/etxerako-lanak/' + id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify({
            "data": {
                    "eginda": true
                }             
            })
        })

    }

}

function egoeraAldatu(id, egoera){
    aldatu(id, egoera).then(function(){
        location.reload()
    })
}




            