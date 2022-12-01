let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");

window.onload = function() {
    drawPoint(0,0,"black", 2, 40)
}

// Gehienez 5 geruza edukio dituen atomoa. Hasieran hutsik.
// Ondoren adieraziko dugu geruza bakoitzak zenbait atomo dituen.
// Zerbait aldatzen den bakoitzean atomoak momentuan duen egitura marraztuko da.
let atomoa = {}
// Geruza kopuru osoa
let geruzaKopurua = 0

// Geruza gehitu botoiari ematean, geruza berri bat gehitzeaz gain formularioko
// elementu berri bat gehituko dugu geruza horretan elektroiak gehitzeko aukera
// ematen duena.
function geruzaGehitu() {    
    div = document.getElementById("geruzak")
    geruzaKopurua += 1
    div.innerHTML  += `
        <ul>
            <li><label>${geruzaKopurua}.Geruza:</label><input id="${geruzaKopurua}" type="text" placeholder="Elektroi kopurua"></li>
            <li><button type="button" onclick=elektroiakGehitu(${geruzaKopurua})>+</button></li>
        </ul>
    `
    atomoa[geruzaKopurua] = 0
    marraztu()
}

// Formularioan erabiltzaileak elektroiak gehitzean atomoa objektua moldatu eta 
// elektroi berriak marraztuko dira.
// marraztu() funtzioak guztia marraztuko du

function elektroiakGehitu(geruza){
    kopurua = document.getElementById(geruza).value 
    atomoa[geruza] = kopurua
    marraztu()
}


// atomoa objetuan dagoena marraztuko du.

function marraztu(){    
    ctx.clearRect(0, 0, c.width, c.height); //dagoena garbitu gauzak ez gainjartzeko
    drawPoint(0,0,"black", 2, 40)
    console.log(atomoa)

    for (const geruza in atomoa){
        console.log(geruza)
        kopurua = atomoa[geruza]
        console.log(kopurua)
        drawCircle(geruza)
        if (kopurua != 0){
            distantzia = 1 + (geruza-1)*0.001
            color = "blue"
            point_size = 6
            ang = 360/kopurua
            var angle = 0
            var r = 40 + (geruza-1)*30
            
            for (i=0; i<kopurua; i++){
                drawPoint(angle, distantzia, color, point_size, r)
                angle += ang
            }
        }
        
    }

}




// geruzak marrazten ditu

function drawCircle(geruza){
    var center_x = 150;
    var center_y = 150;
    console.log(ctx)
    radius = 40 + (geruza-1)*30
    ctx.beginPath();
    ctx.arc(center_x, center_y, radius, 0, 2 * Math.PI);
    ctx.stroke();
}

//elektroiak marrazten ditu

function drawPoint(angle, distance, color, point_size, r){
    var center_x = 150;
    var center_y = 150;

    var x = center_x + r * Math.cos(-angle*Math.PI/180) * distance;
    var y = center_y + r * Math.sin(-angle*Math.PI/180) * distance;

    ctx.beginPath();
    ctx.arc(x, y, point_size, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}