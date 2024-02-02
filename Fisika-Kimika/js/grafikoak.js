let myChart

let cfg = {
  type: 'line',
  data: {
    datasets: [{
      label: 'Higikaria',
      data: [],
      borderWidth: 1,
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0,
    }],
  },
  options: {
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        beginAtZero: true,
        title: { display: true, text: "x-ardatza" },
        ticks: {
          min: 0,
          max: 10, // Puedes ajustar este valor según tus necesidades
          stepSize: 2 // Puedes ajustar este valor según tus necesidades
        }
      },
      y: {
        beginAtZero: true,
        title: { display: true, text: "y-ardatza" }
      }
    }
  }
};


function addPoints(id){
  console.log("id"+id)
  dataArray = cfg.data.datasets[0].data
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
  if (id=="1" || id=="2" || id=="3" || id=="4" || id=="5"){
    x = document.getElementById('x'+id).value;
    y = document.getElementById('y'+id).value;
    dataArray.push({'x':x, 'y':y})

  }
  cfg.data.datasets[0].data = dataArray

  if (myChart) {
    myChart.destroy();
  }
  const ctx = document.getElementById('myChart');
  myChart = new Chart(ctx, cfg);
  console.log(cfg)

  
}





  