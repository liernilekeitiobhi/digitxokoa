const gridContainer = document.getElementById('grafikoa');
    const numRows = 10; // Number of rows
    const numCols = 10; // Number of columns
    const circles = [];

    // Dynamically generate circles and add them to the grid
    for (let row = 1; row <= numRows; row++) {
        for (let col = 1; col <= numCols; col++) {
            const circle = document.createElement('div');
            circle.classList.add('circle');
            circle.id=row.toString()+col.toString()
            circle.dataset.row = row;
            circle.dataset.col = col;
            circle.addEventListener("mouseenter", (e) => {
                handlerIn()
            });
            circle.addEventListener("mouseleave", (e) => {
                klik(circle.id)
            });
            gridContainer.appendChild(circle);
            circles.push(circle);
        }
    }
    /*onmouseenter="handlerIn()" onmouseleave="klik(id)"*/
    // Event listener for circles
    let selectedCircle = null;
    let vectors = [];

    circles.forEach(circle => {
        circle.addEventListener('click', () => {
            if (!selectedCircle) {
                selectedCircle = circle;
            } else {
                if (document.getElementById("toggle1").checked){
                    drawLine(selectedCircle, circle);
                }
                if (document.getElementById("toggle2").checked){
                    drawVector(selectedCircle, circle);
                }
                
                selectedCircle = null;
            }
        });
    });

    // Function to draw vector
    function drawVector(startCircle, endCircle) {
        const startX = startCircle.offsetLeft + startCircle.offsetWidth / 2;
        const startY = startCircle.offsetTop + startCircle.offsetHeight / 2;
        const endX = endCircle.offsetLeft + endCircle.offsetWidth / 2;
        const endY = endCircle.offsetTop + endCircle.offsetHeight / 2;

        const deltaX = endX - startX;
        const deltaY = endY - startY;
        const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        const angle = Math.atan2(deltaY, deltaX);

        // Create vector element
        const vector = document.createElement('div');
        vector.classList.add('vector');
        vector.style.width = length + 'px';
        vector.style.height = '2px'; // Adjust thickness of the vector
        vector.style.left = startX + 'px';
        vector.style.top = startY + 'px';
        vector.style.transformOrigin = 'left center';
        vector.style.transform = `rotate(${angle}rad)`;
        gridContainer.appendChild(vector); // Append to grid container

        // Create arrowhead
        an = angle + Math.PI/2
        const arrowhead = document.createElement('div');
        arrowhead.classList.add('arrowhead');
        arrowhead.style.left = endX + 'px'; // Position arrowhead at the end of the line
        arrowhead.style.top = endY + 'px';
        arrowhead.style.transform = `translate(-50%, -50%) rotate(${an}rad)`; // Rotate arrowhead in the correct direction
        gridContainer.appendChild(arrowhead); // Append arrowhead to grid container

        vectors.push(vector);
    }
    function drawLine(startCircle, endCircle) {
        const startX = startCircle.offsetLeft + startCircle.offsetWidth / 2;
        const startY = startCircle.offsetTop + startCircle.offsetHeight / 2;
        const endX = endCircle.offsetLeft + endCircle.offsetWidth / 2;
        const endY = endCircle.offsetTop + endCircle.offsetHeight / 2;

        const deltaX = endX - startX;
        const deltaY = endY - startY;
        const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        const angle = Math.atan2(deltaY, deltaX);

        // Create vector element
        const vector = document.createElement('div');
        vector.classList.add('vector');
        vector.style.width = length + 'px';
        vector.style.height = '2px'; // Adjust thickness of the vector
        vector.style.left = startX + 'px';
        vector.style.top = startY + 'px';
        vector.style.transformOrigin = 'left center';
        vector.style.transform = `rotate(${angle}rad)`;
        gridContainer.appendChild(vector); // Append to grid container

        vectors.push(vector);
    }
