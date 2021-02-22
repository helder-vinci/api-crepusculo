const api = {
    key: "2a62aebe4996500317eec516e930ee2b",
    base: "https://api.openweathermap.org/data/2.5/",
    lang: "pt_br",
    units: "metric"
}
window.addEventListener('load', () => {
    //if ("geolocation" in navigator)
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setPosition, showError);
    }
    else {
        alert('navegador não suporta geolozalicação');
    }
    function setPosition(position) {

        let lat = position.coords.latitude;
        let long = position.coords.longitude;
   
        testeSunset(lat, long);
    }
    function showError(error) {
        alert(`erro: ${error.message}`);
    }
})
function testeSunset(lat, long) {
    fetch(`${api.base}weather?lat=${lat}&lon=${long}&APPID=${api.key}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`http error: status ${response.status}`)
            }
            return response.json();
        })
        .catch(error => {
            alert(error.message)
        })
        .then(response => {
     
            console.log("foi", response.sys.sunset);

            let unix_timestamp = response.sys.sunset;
            // Create a new JavaScript Date object based on the timestamp
            // multiplied by 1000 so that the argument is in milliseconds, not seconds.
            let date = new Date(unix_timestamp * 1000);
            // Hours part from the timestamp
            let hours = date.getHours();
            // Minutes part from the timestamp
            let minutes = "0" + date.getMinutes();
            // Seconds part from the timestamp
            let seconds = "0" + date.getSeconds();

            // Will display time in 10:30:23 format
            let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
            console.log(formattedTime)
            let now = new Date();
            date.innerText = diaDaSemana(now);
            let agora= now.getHours()+ ':' +now.getMinutes()+ ':' +now.getSeconds();
            console.log(diaDaSemana(now))
            if (diaDaSemana(now)=="Segunda" && formattedTime>agora) {
                alert("é por do sol")
            }else{
                alert("nao é por do sol")
            }
        });


}
function diaDaSemana(d) {
    let days = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

    let day = days[d.getDay()];
 
   
    return `${day}`;
   
}
