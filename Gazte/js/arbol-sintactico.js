
let fraseEntera = {}; 
let arbol = {1:{},2:{},3:{},4:{},5:{},6:{},7:{},8:{},9:{},10:{}};
let lastSelectedIndex = null;

function escribirFrase(){
    var frase = document.getElementById("frase").value;
    var arr = frase.split(/, | /);
    fraseEntera = {}; // Reset the object
    lastSelectedIndex = null;
    
    var t = document.getElementById("frase-tabla");
    t.innerHTML = '<th></th>'; // Clear existing content
    
    // Create buttons for each word
    arr.forEach((element, index) => {
        const wordIndex = index + 1;
        fraseEntera[wordIndex] = false;
        t.innerHTML += `<th><button id="c-${wordIndex}" class="word-btn" onclick="cambiarBolean(${wordIndex})">${element}</button></th>`;
    });

    // Initialize table structure
    for(let j = 1; j <= 10; j++) {
        let fila = document.getElementById(j);
        fila.innerHTML = `<td>${j}</td>`;
        for (let i = 0; i < arr.length; i++) {
            fila.innerHTML += `<td></td>`;
            arbol[j][i+1] = [false, [], ' '];
        }
    }
}

function cambiarBolean(k) {
    const btn = document.getElementById('c-'+k);
    
    // If we have a previous selection and it's different from current click
    if (lastSelectedIndex !== null && lastSelectedIndex !== k) {
        // Select range between last selection and current click
        const start = Math.min(lastSelectedIndex, k);
        const end = Math.max(lastSelectedIndex, k);
        
        for (let j = start; j <= end; j++) {
            fraseEntera[j] = true;
            const rangeBtn = document.getElementById('c-'+j);
            rangeBtn.className = 'word-btn selected';
        }
        lastSelectedIndex = null;
        return;
    }

    // Toggle single word selection
    fraseEntera[k] = !fraseEntera[k];
    btn.className = fraseEntera[k] ? 'word-btn selected' : 'word-btn';
    lastSelectedIndex = fraseEntera[k] ? k : null;
}

function deseleccion() {
    for (const key in fraseEntera) {
        fraseEntera[key] = false;
        const btn = document.getElementById('c-'+key);
        if (btn) btn.className = 'word-btn';
    }
    lastSelectedIndex = null;
    
    document.getElementById("forma-sintactica").value = "";
    document.getElementById("nivel-arbol").value = "";
}

function anadirInformacionArbol(){
    const fs = document.getElementById('forma-sintactica').value;
    const na = document.getElementById('nivel-arbol').value;
    let seleccion = [];
    
    // Get all selected words
    for (const key in fraseEntera) {
        if (fraseEntera[key] === true){
            seleccion.push(parseInt(key));
        }
    }
    
    // Store information in the tree structure
    for (let i = 0; i < seleccion.length; i++){
        arbol[na][seleccion[i]] = [true, seleccion, fs];
    }

    // Draw the tree
    dibujarArbol();
}

function dibujarArbol(){
    var frase = document.getElementById("frase").value;
    let arr = frase.split(/, | /);
    
    for (const key in arbol){
        let columnas = [];
        let k = 1;
        
        while (k <= arr.length){
            if (arbol[key][k][2] != ' '){
                columnas.push([arbol[key][k][1].length, arbol[key][k][2]]);
                k += arbol[key][k][1].length;
            } else {
                columnas.push([-1, ' ']);
                k = k + 1;
            }
        }
        
        const fila = document.getElementById(key);
        fila.innerHTML = `<td>${key}</td>`;
        
        for (let i = 0; i < columnas.length; i++){
            if (columnas[i][0] == -1){
                fila.innerHTML += `<td></td>`;
            } else if(columnas[i][0] == 1){
                fila.innerHTML += `<td style="border-top: 3px solid black;">${columnas[i][1]}</td>`;
            } else {
                fila.innerHTML += `<td style="border-top: 3px solid black;" colspan=${columnas[i][0]}>${columnas[i][1]}</td>`;
            }
        }
    }
    
    // Clear selections after drawing
    deseleccion();
}
