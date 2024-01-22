let myChart

let cfg = {
  type: 'line',
  data: {
    labels: [0],
    datasets: [{
      label: 'Higikaria',
      data: [0],
      borderWidth: 1,
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0,
    }]
    
  },
  options: {
    scales: {
      x: {axis: "x",
          beginAtZero: true,
          id: "",
          title:{display: true, text:"x-ardatza"}},
      y: {axis: "y",
          beginAtZero: true,
          id: "",
          title:{display: true, text:"y-ardatza"}
    }  
    
  }
}
}


function addPoints(id){
  console.log("id"+id)
  xArray = cfg.data.labels
  yArray = cfg.data.datasets[0].data
  if (id=="x-ardatza"){
    xArdatza = document.getElementById('x-ardatza').value
    cfg.options.scales.x.title.text = xArdatza
    console.log(xArdatza)
    
  }
  if (id=="y-ardatza"){
    yArdatza = document.getElementById('y-ardatza').value
    cfg.options.scales.y.title.text = yArdatza
    console.log(yArdatza)
  }
  if (id=="1"){
    x = document.getElementById('x'+id).value;
    y = document.getElementById('y'+id).value;
    console.log(x)
    if (x=="0" && y!="0"){
      yArray[0] = y
    }
    if (x!="0"){
      alert('0 aldiunean zer gertatzen den zehaztu behar da!')
    }

  }
  if (id=="2" || id=="3" || id=="4" || id=="5"){
    x = document.getElementById('x'+id).value;
    y = document.getElementById('y'+id).value;
    xArray.push(x)
    yArray.push(y)

  }
  cfg.data.labels = xArray
  cfg.data.datasets[0].data = yArray

  if (myChart) {
    myChart.destroy();
  }
  const ctx = document.getElementById('myChart');
  myChart = new Chart(ctx, cfg);

  
}





  