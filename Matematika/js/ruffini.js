function add(){
    row1 = document.getElementById("lerroa1")
    row2 = document.getElementById("lerroa2")
    row3 = document.getElementById("lerroa3")

    row1.innerHTML += `<td><input type="text"></td>`
    row2.innerHTML += `<td style="padding-bottom: 20px;"><input type="text"></td>`
    row3.innerHTML += `<td><input type="text"></td>`
}

function trash(){
    row1 = document.getElementById("lerroa1")
    row2 = document.getElementById("lerroa2")
    row3 = document.getElementById("lerroa3")

    row1.innerHTML = 
        `<td style="border-right: 2px solid; padding-right: 20px;"> </td> <!--marra bertikalaren ezkerreko zuloa-->
        <!--koefizienteak-->
        <td><input type="text"></td>
        <td><input type="text"></td>
        <td><input type="text"></td>`
    
    row2.innerHTML = 
        `<td style="border-right: 2px solid; padding-right: 20px; "><input type="text"></td> <!--zatitzailea-->
        <td style="padding-bottom: 20px;"> </td> <!--maila altueneko koefizientearen azpiko zuloa-->
        <!--erdiko zenbakiak-->
        <td style="padding-bottom: 20px;"><input type="text"></td>
        <td style="padding-bottom: 20px;"><input type="text"></td>`
    
    row3.innerHTML = 
        `<td style="border-right: 2px solid; padding-right: 20px;"> </td> <!--marra bertikalaren ezkerreko zuloa-->
        <!--azpiko zenbakiak-->
        <td><input type="text"></td>
        <td><input type="text"></td>
        <td><input type="text"></td>`
}

function refresh(){
    var bigarrenLerroa = parseInt(document.getElementById("taula").rows[1].cells.length);
    console.log(bigarrenLerroa)
    row2 = document.getElementById("lerroa2")
    row2.innerHTML = ``
    console.log(row2)
    for (let i=0; i<bigarrenLerroa; i++){
        console.log(i)
        console.log(row2)
        if (i==0){
            row2.innerHTML += `<td style="border-right: 2px solid; padding-right: 20px; "><input type="text"></td>`            
        }
        else if(i==1){
            row2.innerHTML += `<td style="padding-bottom: 20px;"> </td>`
        }
        else{
            row2.innerHTML += `<td style="padding-bottom: 20px;"><input type="text"></td>`
        }
        
    }

    var hirugarrenLerroa = document.getElementById("taula").rows[2].cells.length;
    console.log(hirugarrenLerroa)
    row3 = document.getElementById("lerroa3")
    row3.innerHTML = ``
    for (let i=0; i<hirugarrenLerroa; i++){
        if (i==0){
            row3.innerHTML += `<td style="border-right: 2px solid; padding-right: 20px;"> </td>`
        }        
        else{
            row3.innerHTML += `<td><input type="text"></td>`
        }
    }


}