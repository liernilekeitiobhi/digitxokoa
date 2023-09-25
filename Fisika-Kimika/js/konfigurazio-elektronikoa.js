let konf = {"1s":0,
        "2s":0,
        "2p":0,
        "3s":0,
        "3p":0,
        "3d":0,
        "4s":0,
        "4p":0,
        "4d":0,
        "4f":0,
        "5s":0,
        "5p":0,
        "5d":0,
        "5f":0}

function egoeraAldatu(id){
    konfOsoa=["1s","2s","2p","3s","3p","4s","3d","4p","5s","4d","5p","4f","5d","5f"]
    konfOsoaKop=[2,2,6,2,6,2,10,6,2,10,6,14,10,14]
    konf[id]+=1
    if (konf[id]==1){
        btn = document.getElementById(id)
        btn.style.backgroundColor="rgb(127, 205, 113)"
    }
    if (konf[id]==2){
        btn = document.getElementById(id)
        btn.style.backgroundColor="rgb(80, 137, 207)"
    }
    if (konf[id] == 3){
        btn = document.getElementById(id)
        btn.style.backgroundColor="rgb(207, 80, 80)"
        konf[id] = 0
    }
    d = document.getElementById("konf-elek")
    d.innerHTML =""
    console.log(konf)
    for (i=0;i<=konfOsoa.length;i++){
        e = konfOsoa[i]
        console.log(e)
        if(konf[e]==2){
            console.log(konf[e])
            d.innerHTML += konfOsoa[i] + "<sup>" +konfOsoaKop[i]+"</sup> "
        }
        if (konf[e]==1){
            console.log(konf[e])
            d.innerHTML += konfOsoa[i]
        }
    }    
}

function azkenGeruza(){
    d = document.getElementById("konf-elek")
    zenb = document.getElementById("azken-geruza").value
    d.innerHTML += "<sup>" + zenb + "</sup>"
}

/*
function kopiatu(){
    ke = document.getElementById("konf-elek").innerHTML
    console.log(ke)

    const ke1 = ke.replaceAll("<sup>","")
    const ke2 = ke1.replaceAll("</sup>"," ")
    console.log(ke2)

    	// copy the canvas to the clipboard with chrome's CliboardItem API
	// https://developers.google.com/web/updates/2019/07/image-support-for-async-clipboard#images
	html2canvas(domNode).then(function(canvas) {
		canvas.toBlob(function(blob) {
			navigator.clipboard
				.write([
				new ClipboardItem(
					Object.defineProperty({}, blob.type, {
						value: blob,
						enumerable: true
					})
				)
			])
				.then(function() {
				alert("Funtzioaren grafika kopiatu da!");
			});
		});
    })
}*/

