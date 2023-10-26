let elektroiakBertikalak={
    "11":["g","b"], "12":["g","b"], "13":["g","b"], "17":["g","b"], "18":["g","b"], "19":["g","b"], 
    "21":["g","b"], "22":["g","b"], "23":["g","b"], "27":["g","b"], "28":["g","b"], "29":["g","b"], 
    "31":["g","b"], "32":["g","b"], "33":["g","b"], "37":["g","b"], "38":["g","b"], "39":["g","b"], 
    "41":["g","b"], "42":["g","b"], "43":["g","b"], "47":["g","b"], "48":["g","b"], "49":["g","b"], 
    "51":["g","b"], "52":["g","b"], "53":["g","b"], "57":["g","b"], "58":["g","b"], "59":["g","b"], 
    "61":["g","b"], "62":["g","b"], "63":["g","b"], "67":["g","b"], "68":["g","b"], "69":["g","b"]
}

let elektroiakHorizontalak={
    "14":["g","b"], "15":["g","b"], "16":["g","b"],"110":["g","b"], "111":["g","b"], "112":["g","b"],
    "24":["g","b"], "25":["g","b"], "26":["g","b"],"210":["g","b"], "211":["g","b"], "212":["g","b"],
    "34":["g","b"], "35":["g","b"], "36":["g","b"],"310":["g","b"], "311":["g","b"], "312":["g","b"],
    "44":["g","b"], "45":["g","b"], "46":["g","b"],"410":["g","b"], "411":["g","b"], "412":["g","b"],
    "54":["g","b"], "55":["g","b"], "56":["g","b"],"510":["g","b"], "511":["g","b"], "512":["g","b"],
    "64":["g","b"], "65":["g","b"], "66":["g","b"],"610":["g","b"], "611":["g","b"], "612":["g","b"]  
}

function ebaluatu(id){
    var e=elektroiakBertikalak[id]
    if (e==undefined){
        var e=elektroiakHorizontalak[id]
    }
    console.log(e[0])

    if (e[0]=="g" && e[1]=="b"){
        e[0]="b"
    }
    else if (e[0]=="b" && e[1]=="b") {
        e[1]="m"
    }
    else if (e[0]=="b" && e[1]=="m") {
        e[1]="b"
        e[0]="g"
    }
    marraztu()
}

function ezkutatuErakutsi(){
    for (const elektroi in elektroiakBertikalak) {
        e = elektroiakBertikalak[elektroi]
        if(e[0]=="t"){
            e[0]="g"
        }
        else if(e[0]=="g"){
            e[0]="t"
        }
    }
    for (const elektroi in elektroiakHorizontalak) {
        e = elektroiakHorizontalak[elektroi]
        if(e[0]=="t"){
            e[0]="g"
        }
        else if(e[0]=="g"){
            e[0]="t"
        }
    }
    
    marraztu()
}

function marraztu(){
    for (const elektroi in elektroiakBertikalak) {
        e = elektroiakBertikalak[elektroi]
        b = document.getElementById(elektroi)
        if (elektroi.substring(0,1)=="2"||elektroi.substring(0,1)=="4"||elektroi.substring(0,1)=="6"){            
            if(e[0]!="t"){
                if (e[0]=="g" && e[1]=="b"){
                    b.style.borderRadius="50%"
                    b.style.width="80px"
                    b.style.height="80px"
                    b.style.backgroundColor="white"
                    b.style.marginLeft="0"
                    b.style.marginRight="0"
                    b.style.display="block"
                    b.style.color="rgb(241, 241, 241)"
                    b.innerHTML='<i class="fa fa-circle"></i>'
                }
                if (e[0]=="b" && e[1]=="b") {
                    b.style.borderRadius="50%"
                    b.style.width="80px"
                    b.style.height="80px"
                    b.style.backgroundColor="white"
                    b.style.color="black"
                    b.style.marginLeft="0"
                    b.style.marginRight="0"
                }
                else if (e[0]=="b" && e[1]=="m") {
                    b.style.borderRadius="0%"
                    b.style.width="80px"
                    b.style.height="80px"
                    b.style.backgroundColor="white"
                    b.style.marginLeft="0px"
                    b.style.marginRight="0px"
                    b.innerHTML='|'
                }    
            }
            else{
                b.style.backgroundColor="white"
                b.innerHTML=''
            }
        }
        else{
            if(e[0]!="t"){
                if (e[0]=="g" && e[1]=="b"){
                    b.style.borderRadius="50%"
                    b.style.width="80px"
                    b.style.height="80px"
                    b.style.backgroundColor="white"
                    b.style.marginLeft="0"
                    b.style.marginRight="0"
                    b.style.display="block"
                    b.style.color="rgb(241, 241, 241)"
                    b.innerHTML='<i class="fa fa-remove"></i>'
                }
                if (e[0]=="b" && e[1]=="b") {
                    b.style.borderRadius="50%"
                    b.style.width="80px"
                    b.style.height="80px"
                    b.style.backgroundColor="white"
                    b.style.color="black"
                    b.style.marginLeft="0"
                    b.style.marginRight="0"
                }
                else if (e[0]=="b" && e[1]=="m") {
                    b.style.borderRadius="0%"
                    b.style.width="80px"
                    b.style.height="80px"
                    b.style.backgroundColor="white"
                    b.style.marginLeft="0px"
                    b.style.marginRight="0px"
                    b.innerHTML='|'
                }    
            }
            else{
                b.style.backgroundColor="white"
                b.innerHTML=''
            }
            
        }
    }
    for (const elektroi in elektroiakHorizontalak) {
        e = elektroiakHorizontalak[elektroi]
        b = document.getElementById(elektroi)
        if (elektroi.substring(0,1)=="2"||elektroi.substring(0,1)=="4"||elektroi.substring(0,1)=="6"){            
            if(e[0]!="t"){
                if (e[0]=="g" && e[1]=="b"){
                    b.style.borderRadius="50%"
                    b.style.width="80px"
                    b.style.height="80px"
                    b.style.backgroundColor="white"
                    b.style.marginLeft="0"
                    b.style.marginRight="0"
                    b.style.display="block"
                    b.style.color="rgb(241, 241, 241)"
                    b.innerHTML='<i class="fa fa-circle"></i>'
                }
                if (e[0]=="b" && e[1]=="b") {
                    b.style.borderRadius="50%"
                    b.style.width="80px"
                    b.style.height="80px"
                    b.style.backgroundColor="white"
                    b.style.color="black"
                    b.style.marginLeft="0"
                    b.style.marginRight="0"
                }
                else if (e[0]=="b" && e[1]=="m") {
                    b.style.borderRadius="0%"
                    b.style.width="80px"
                    b.style.height="80px"
                    b.style.backgroundColor="white"
                    b.style.marginLeft="0px"
                    b.style.marginRight="0px"
                    b.innerHTML='—'
                }    
            }
            else{
                b.style.backgroundColor="white"
                b.innerHTML=''
            }
        }
        else{
            if(e[0]!="t"){
                if (e[0]=="g" && e[1]=="b"){
                    b.style.borderRadius="50%"
                    b.style.width="80px"
                    b.style.height="80px"
                    b.style.backgroundColor="white"
                    b.style.marginLeft="0"
                    b.style.marginRight="0"
                    b.style.display="block"
                    b.style.color="rgb(241, 241, 241)"
                    b.innerHTML='<i class="fa fa-remove"></i>'
                }
                if (e[0]=="b" && e[1]=="b") {
                    b.style.borderRadius="50%"
                    b.style.width="80px"
                    b.style.height="80px"
                    b.style.backgroundColor="white"
                    b.style.color="black"
                    b.style.marginLeft="0"
                    b.style.marginRight="0"
                }
                else if (e[0]=="b" && e[1]=="m") {
                    b.style.borderRadius="0%"
                    b.style.width="80px"
                    b.style.height="80px"
                    b.style.backgroundColor="white"
                    b.style.marginLeft="0px"
                    b.style.marginRight="0px"
                    b.innerHTML='—'
                }    
            }
            else{
                b.style.backgroundColor="white"
                b.innerHTML=''
            }
            
        }
    }
        
    
}
    

