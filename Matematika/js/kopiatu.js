function kopiatu(){
	console.log("bai")
    //Grafikoa dagoen div identifikatu
    var domNode = document.getElementById('grafikoa');
	
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
}