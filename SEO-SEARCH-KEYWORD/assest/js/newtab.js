function ESTATISTIC() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let estati = JSON.parse(this.responseText);
            var d1     = document.getElementById('t01');
            for(var i=1;i < estati.length;i++){

                d1.insertAdjacentHTML('beforeend',
                `<tr>
                <td>${estati[i].id-1}</td>
                <td>${estati[i].palavra}</td>
                <td>${estati[i].Data}</td>
                <td>${estati[i].posicao}</td>
                </tr>`);

            }
        }
    };
    xhttp.open("GET", "https://search-g.glitch.me/estatistica", true);
    xhttp.send();
    console.log("run 5");
}
function site() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let obj = JSON.parse(this.responseText);
            var sit    = document.getElementById('site-url');
            sit.innerText = obj[0].url;
        }
    };
    xhttp.open("GET", "https://search-g.glitch.me/palavras", true);
    xhttp.send();
    console.log("run 6");
}

site();
ESTATISTIC();
