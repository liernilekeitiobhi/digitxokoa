a = document.getElementById('btn')

$(a).mouseenter(async function() {
    const delay = ms => new Promise(res => setTimeout(res, ms));
    await delay(800);
    $(this).click();
}); 


function funtzioa() {
    console.log('it clicks')
}